package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	CartItems   []CartItem   `json:"items" gorm:"foreignKey:CartID;constraint:OnDelete:CASCADE"`
	Total       float32      `json:"total"`
}