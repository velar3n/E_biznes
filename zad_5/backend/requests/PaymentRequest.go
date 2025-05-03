package requests

type PaymentRequest struct {
	CardNumber       string   `json:"card_number" validate:"required"`
	ExpirationDate   string   `json:"expiration_date" validate:"required"`
	CVC              int      `json:"cvc" validate:"required"`
}