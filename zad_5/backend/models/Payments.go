package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	CartID           uint      `json:"cart_id" validate:"required"`
	Amount           float32   `json:"payment_amount" validate:"required"`
	CardNumber       string    `json:"card_number" validate:"required"`
	ExpirationDate   string    `json:"expiration_date" validate:"required"`
	CVC              int       `json:"cvc" validate:"required"`
	Status           int       `json:"payment_status" validate:"required"`
}