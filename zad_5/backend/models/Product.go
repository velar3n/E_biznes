package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name           string  `json:"name" validate:"required"`
	Category       string  `json:"category" validate:"required"`
	Price          float32 `json:"price" validate:"required"`
	Description    string  `json:"description" validate:"required"`
	Amount         int     `json:"amount" validate:"required"`
	CartID         uint    `json:"cart_id"`
}