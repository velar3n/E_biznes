package requests

type CartUpdateRequest struct {
	ProductID        uint   `json:"product_id" validate:"required"`
	QuantityChange   int    `json:"quantity_change" validate:"required"`
}