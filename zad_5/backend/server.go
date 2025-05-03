package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"backend/routes"
	"backend/db"
)
func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

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