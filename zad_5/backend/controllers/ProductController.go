package controllers

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"backend/models"
)

type ProductController struct{}

func (w *ProductController) GetAllProducts(c echo.Context) error {
	db := c.Get("db").(*gorm.DB)

	var products []models.Product
	db.Find(&products)

	return c.JSON(http.StatusOK, &products)
}