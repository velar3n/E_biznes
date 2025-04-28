package database

import (
    "gorm.io/gorm"
	"backend/models"
)

func SeedProducts(db *gorm.DB) {
    products := []models.Product{
        {Name: "Laptop", Category: "Electronics", Price: 5000.00, Description: "A laptop to survive uni", Amount: 10},
        {Name: "Smartphone", Category: "Electronics", Price: 2999.00, Description: "A smartphone to be able to call your mom for help", Amount: 25},
        {Name: "Headphones", Category: "Electronics", Price: 590.00, Description: "Headphines that enable you to listen to music in public", Amount: 50},
		{Name: "Chair", Category: "Furniture", Price: 560.00, Description: "A chair so you don't have to sit on the floor", Amount: 10},
        {Name: "Mirror", Category: "Furniture", Price: 120.00, Description: "For mirror selfies slay girl", Amount: 20}
    }

    for _, product := range products {
        db.FirstOrCreate(&product, models.Product{Name: product.Name})
    }
}