package routes

import (
	"github.com/labstack/echo/v4"
	"backend/controllers"
)

func CartRoutes(e *echo.Echo) {
	cartController := controllers.CartController{}

	e.POST("/carts/:id", cartController.SendCart)
}