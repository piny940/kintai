package model

import (
	"kintai_backend/domain"
	"time"
)

type Shift struct {
	ID           uint      `json:"id"`
	Since        time.Time `json:"since"`
	Till         time.Time `json:"till"`
	EmploymentID uint      `json:"employmentId"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

func NewShift(shift *domain.Shift) *Shift {
	return &Shift{
		ID:           uint(shift.ID),
		Since:        shift.TimeRange.Since(),
		Till:         shift.TimeRange.Till(),
		EmploymentID: uint(shift.EmploymentID),
		CreatedAt:    shift.CreatedAt,
		UpdatedAt:    shift.UpdatedAt,
	}
}
func NewShifts(shifts []*domain.Shift) []*Shift {
	result := make([]*Shift, len(shifts))
	for i, shift := range shifts {
		result[i] = NewShift(shift)
	}
	return result
}
