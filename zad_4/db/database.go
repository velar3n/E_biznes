package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"zad_4/models"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("data.db"))

	if err != nil {
		panic("Failed to connect with database")
	}

	db.AutoMigrate(&models.Product{})
	db.AutoMigrate(&models.Cart{})
	db.AutoMigrate(&models.Category{})

	return db
}