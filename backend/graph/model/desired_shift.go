package model

import "kintai_backend/domain"

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
	for _, desiredShift := range desiredShifts {
		result = append(result, NewDesiredShift(desiredShift))
	}
	return result
}
