package model

import (
	"kintai_backend/domain"
)

func NewDesiredShift(desiredShift *domain.DesiredShift) *DesiredShift {
	return &DesiredShift{
		ID:           uint(desiredShift.ID),
		Since:        desiredShift.Since,
		Till:         desiredShift.Till,
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
