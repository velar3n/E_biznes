package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name       string  `json:"name" validate:"required"`
	Price      float32 `json:"price" validate:"required"`
	CategoryID uint
}