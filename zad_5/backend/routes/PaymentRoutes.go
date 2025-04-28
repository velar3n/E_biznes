package routes

import (
	"github.com/labstack/echo/v4"
	"backend/controllers"
)

func PaymentRoutes(e *echo.Echo) {
	paymentController := controllers.CartController{}

	e.POST("/payments/:id", paymentController.Pay)
}