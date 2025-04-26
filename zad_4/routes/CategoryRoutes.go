package routes

import (
	"github.com/labstack/echo/v4"
	"zad_4/controllers"
)

func CategoryRoutes(e *echo.Echo) {
	categoryController := controllers.CategoryController{}

	e.GET("/categories", categoryController.GetAllCategories)
	e.POST("/categories", categoryController.CreateCategory)
	e.GET("/categories/:id", categoryController.GetCategory)
	e.PUT("/categories/:id", categoryController.UpdateCategory)
	e.DELETE("/categories/:id", categoryController.DeleteCategory)
}