package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"backend/models"
	"backend/requests"
)

type PaymentController struct{}

func (w *PaymentController) CreatePayment(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var cart models.Cart
	if err := db.First(&cart, 1).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to fetch cart")
	}

	payment := models.Payment{
		CartID: cart.ID,
		Amount: cart.Total,
		Status: 0,
	}
	
	if err := db.Create(&payment).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to create payment")
	}
	return c.JSON(http.StatusOK, map[string]any{"payment_id": payment.ID})
}

func (w *PaymentController) Pay(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	id := c.Param("id")

	var validate = validator.New()
	var req requests.PaymentRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request")
	}
	if err := validate.Struct(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Validation failed")
	}

	var payment models.Payment
	if err := db.First(&payment, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, "Payment not found")
	}

	payment.CardNumber = req.CardNumber
	payment.ExpirationDate = req.ExpirationDate
	payment.CVC = req.CVC
	payment.Status = 1

	if err := db.Save(&payment).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to update payment")
	}

	var cart models.Cart
	if err := db.Preload("CartItems").First(&cart, payment.CartID).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to load cart")
	}

	if err := db.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{}).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to delete cart items")
	}

	cart.Total = 0
	if err := db.Save(&cart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to reset cart total")
	}

	return c.JSON(http.StatusOK, "Payment processed and cart cleared")
}