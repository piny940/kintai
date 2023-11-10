package model

import (
	"kintai_backend/domain"
	"time"
)

type DesiredShift struct {
	ID           uint      `json:"id"`
	Since        time.Time `json:"since"`
	Till         time.Time `json:"till"`
	EmploymentID uint      `json:"employmentId"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

func NewDesiredShift(desiredShift *domain.DesiredShift) *DesiredShift {
	return &DesiredShift{
		ID:           uint(desiredShift.ID),
		Since:        desiredShift.TimeRange.Since(),
		Till:         desiredShift.TimeRange.Till(),
		EmploymentID: uint(desiredShift.EmploymentID),
		CreatedAt:    desiredShift.CreatedAt,
		UpdatedAt:    desiredShift.UpdatedAt,
	}
}

func NewDesiredShifts(desiredShifts []*domain.DesiredShift) []*DesiredShift {
	result := make([]*DesiredShift, len(desiredShifts))
	for i, desiredShift := range desiredShifts {
		result[i] = NewDesiredShift(desiredShift)
	}
	return result
}
