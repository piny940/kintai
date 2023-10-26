package domain

import "time"

type DesiredShiftID int

type DesiredShift struct {
	ID           DesiredShiftID `json:"id"`
	Since        time.Time      `json:"since"`
	Till         time.Time      `json:"till"`
	EmploymentID EmploymentID   `json:"employment_id"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
}
type IDesiredShiftRepo interface {
	List(employmentId EmploymentID) ([]*DesiredShift, error)
	Create(desiredShift *DesiredShift) (*DesiredShift, error)
}

func NewDesiredShift(since time.Time, till time.Time, employmentID EmploymentID) *DesiredShift {
	return &DesiredShift{
		Since:        since,
		Till:         till,
		EmploymentID: employmentID,
	}
}
