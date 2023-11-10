package domain

import "time"

type CompanyID uint
type CompanyName string

type Company struct {
	ID        CompanyID
	Name      CompanyName
	CreatedAt time.Time
	UpdatedAt time.Time
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
