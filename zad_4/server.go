package main

import (
	"github.com/labstack/echo/v4"
	"zad_4/routes"
	"zad_4/db"
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

	routes.ProductRoute(e)

	e.Logger.Fatal(e.Start(":1323"))
}