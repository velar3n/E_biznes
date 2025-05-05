package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"errors"
	"fmt"
	"backend/models"
	"backend/requests"
)

type CartController struct{}

func (w *CartController) InitializeCart(db *gorm.DB) (*models.Cart, error) {
	var cart models.Cart

	err := db.First(&cart).Error
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		newCart := models.Cart{}
		if err := db.Create(&newCart).Error; err != nil {
			return nil, err
		}
		return &newCart, nil
	}
	return &cart, err
}

func (w *CartController) Purchase(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	var validate = validator.New()

	var cart models.Cart

	if err := c.Bind(&cart); err != nil {
		return c.JSON(http.StatusBadRequest, "Error")
	}

	if validationErr := validate.Struct(&cart); validationErr != nil {
		return c.JSON(http.StatusBadRequest, "Error")
	}

	db.Create(&cart)

	return c.JSON(http.StatusCreated, &cart)
}

func (w *CartController) UpdateCart(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	var validate = validator.New()

	var req requests.CartUpdateRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request")
	}
	if err := validate.Struct(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Validation failed")
	}

	var product models.Product
	err := db.First(&product, req.ProductID).Error
	if err != nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	var existingCartItem models.CartItem
	err = db.Where("cart_id = ? AND product_id = ?", 1, req.ProductID).First(&existingCartItem).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to check existing cart item")
	}

	newQuantity := existingCartItem.Quantity + req.QuantityChange
	if newQuantity > product.Amount {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("Not enough stock. Only %d items available.", product.Amount))
	}
	if newQuantity <= 0 {
		db.Delete(&existingCartItem)
	}

	if existingCartItem.ID != 0 {
		existingCartItem.Quantity += req.QuantityChange
		db.Save(&existingCartItem)
	} else {
		cartItem := models.CartItem{
			CartID:    1,
			ProductID: req.ProductID,
			Quantity:  1,
		}
		db.Create(&cartItem)
	}

	var cart models.Cart
    err = db.Preload("CartItems.Product").First(&cart, 1).Error
    if err != nil {
        return c.JSON(http.StatusInternalServerError, "Failed to load cart for total update")
    }

    var newTotal float32 = 0
    for _, item := range cart.CartItems {
        newTotal += float32(item.Quantity) * item.Product.Price
    }

    cart.Total = newTotal
    err = db.Save(&cart).Error
    if err != nil {
        return c.JSON(http.StatusInternalServerError, "Failed to update cart total")
    }

	return c.JSON(http.StatusOK, "Cart item added successfully")
}

func (w *CartController) GetCart(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	id := c.Param("id")

	var cart models.Cart
	err := db.Preload("CartItems.Product").First(&cart, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusOK, models.Cart{
				CartItems: []models.CartItem{},
				Total:     0,
			})
		}
		return c.JSON(http.StatusInternalServerError, "Failed to fetch cart")
	}

	return c.JSON(http.StatusOK, &cart)
}

func (w *CartController) DeleteCart(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var cart models.Cart
	err := db.Preload("CartItems").First(&cart, 1).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, "Cart not found")
		}
		return c.JSON(http.StatusInternalServerError, "Failed to find cart")
	}

	err = db.Where("cart_id = ?", 1).Delete(&models.CartItem{}).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to delete cart items")
	}

	cart.Total = 0
	err = db.Save(&cart).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to update cart")
	}

	return c.JSON(http.StatusOK, "Cart cleared successfully")
}
