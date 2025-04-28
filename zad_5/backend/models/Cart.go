package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	Products   []Product   `json:"products" gorm:"foreignKey:CartID"`
	Total      float32     `json:"total"`
}