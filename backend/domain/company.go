package domain

import "time"

type CompanyID uint
type CompanyName string

type Company struct {
	ID        CompanyID   `json:"id"`
	Name      CompanyName `json:"name"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}

func NewCompany(name CompanyName) (*Company, error) {
	return &Company{
		Name: name,
	}, nil
}
