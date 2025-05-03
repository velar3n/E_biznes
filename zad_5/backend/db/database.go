package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"fmt"
	"backend/models"
	"backend/controllers"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("/app/backend/data/data.db"))

	if err != nil {
		panic("Failed to connect with database")
	}

	db.AutoMigrate(&models.Product{})
	db.AutoMigrate(&models.Cart{})
	db.AutoMigrate(&models.CartItem{})
	db.AutoMigrate(&models.Payment{})

	SeedProducts(db)

	cartController := &controllers.CartController{}
    cart, err := cartController.InitializeCart(db)
    if err != nil {
        panic("Failed to initialize cart")
    }
	fmt.Println("Cart initialized with ID:", cart.ID)

	return db
}