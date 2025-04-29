package main

import (
	"github.com/labstack/echo/v4"
	"backend/routes"
	"backend/db"
)
func main() {
	e := echo.New()

	db := database.Connect()

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	routes.ProductRoutes(e)
	routes.CartRoutes(e)
	routes.PaymentRoutes(e)

	e.Logger.Fatal(e.Start(":1323"))
}