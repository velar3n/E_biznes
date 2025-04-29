package routes
 
import (
	"github.com/labstack/echo/v4"
	"backend/controllers"
)

func ProductRoutes(e *echo.Echo) {
	productController := controllers.ProductController{}

	e.GET("/products", productController.GetAllProducts)
	// e.GET("/products/:id", productController.GetProduct)
}