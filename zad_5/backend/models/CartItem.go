package models

import "gorm.io/gorm"

type CartItem struct {
	gorm.Model
	CartID      uint      `json:"cart_id"`
	ProductID   uint      `json:"product_id"`
	Product     Product   `json:"product" gorm:"constraint:OnDelete:CASCADE"`
	Quantity    int       `json:"quantity"`
}