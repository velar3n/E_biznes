package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"backend/models"
)

type CartController struct{}

func (w *CartController) SendCart(c echo.Context) error {
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