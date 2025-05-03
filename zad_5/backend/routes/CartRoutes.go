package routes

import (
	"github.com/labstack/echo/v4"
	"backend/controllers"
)

func CartRoutes(e *echo.Echo) {
	cartController := controllers.CartController{}

	e.POST("/cart/update", cartController.UpdateCart)
	e.POST("/cart", cartController.Purchase)
	e.GET("/cart/:id", cartController.GetCart)
	e.DELETE("/cart", cartController.DeleteCart)
}