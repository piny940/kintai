package model

import (
	"kintai_backend/domain"
	"time"
)

type Company struct {
	ID           uint      `json:"id"`
	Name         string    `json:"name"`
	EmploymentID *uint     `json:"employmentId,omitempty"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

func NewCompany(company *domain.Company) *Company {
	return &Company{
		ID:        uint(company.ID),
		Name:      string(company.Name),
		CreatedAt: company.CreatedAt,
		UpdatedAt: company.UpdatedAt,
	}
}
func NewCompanies(companies []*domain.Company) []*Company {
	result := make([]*Company, len(companies))
	for i, company := range companies {
		result[i] = NewCompany(company)
	}
	return result
}
