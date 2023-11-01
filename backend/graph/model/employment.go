package model

import (
	"kintai_backend/domain"
	"time"
)

type Employment struct {
	ID        uint             `json:"id"`
	Kind      EmploymentKind   `json:"kind"`
	Status    EmploymentStatus `json:"status"`
	CompanyID int              `json:"companyId"`
	WorkerID  int              `json:"workerId"`
	CreatedAt time.Time        `json:"createdAt"`
	UpdatedAt time.Time        `json:"updatedAt"`
}

func NewEmployment(employment *domain.Employment) *Employment {
	return &Employment{
		ID:        uint(employment.ID),
		Kind:      employmentKindMap[employment.Kind],
		Status:    employmentStatusMap[employment.Status],
		CompanyID: int(employment.CompanyID),
		WorkerID:  int(employment.WorkerID),
		CreatedAt: employment.CreatedAt,
		UpdatedAt: employment.UpdatedAt,
	}
}

var employmentKindMap = map[domain.EmploymentKind]EmploymentKind{
	domain.EmploymentAdmin:  EmploymentKindAdmin,
	domain.EmploymentMember: EmploymentKindMember,
}
var employmentStatusMap = map[domain.EmploymentStatus]EmploymentStatus{
	domain.EmploymentActive:   EmploymentStatusActive,
	domain.EmploymentInactive: EmploymentStatusInactive,
}
