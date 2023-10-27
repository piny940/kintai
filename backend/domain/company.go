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
type ICompanyRepo interface {
	FindById(WorkerID, CompanyID) (*Company, error)
	List(WorkerID) ([]*Company, error)
}

func NewCompany(name CompanyName) (*Company, error) {
	return &Company{
		Name: name,
	}, nil
}
