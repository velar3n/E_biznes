package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"backend/models"
)

type PaymentController struct{}

func (w *CartController) Pay(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)
	var validate = validator.New()

	var payment models.Payment

	if err := c.Bind(&payment); err != nil {
		return c.JSON(http.StatusBadRequest, "Error")
	}

	if validationErr := validate.Struct(&payment); validationErr != nil {
		return c.JSON(http.StatusBadRequest, "Error")
	}

	db.Create(&payment)

	return c.JSON(http.StatusCreated, &payment)
}