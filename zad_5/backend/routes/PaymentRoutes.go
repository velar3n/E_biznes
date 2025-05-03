package routes

import (
	"github.com/labstack/echo/v4"
	"backend/controllers"
)

func PaymentRoutes(e *echo.Echo) {
	paymentController := controllers.PaymentController{}

	e.POST("/payment", paymentController.CreatePayment)
	e.POST("/payment/:id", paymentController.Pay)
}