package domain

import "time"

type DesiredShiftID int

type DesiredShift struct {
	ID           DesiredShiftID `json:"id"`
	Since        time.Time      `json:"since"`
	Until        time.Time      `json:"until"`
	EmploymentID EmploymentID   `json:"employment_id"`
}

func NewDesiredShift(id DesiredShiftID, since time.Time, until time.Time, employmentID EmploymentID) *DesiredShift {
	return &DesiredShift{
		ID:           id,
		Since:        since,
		Until:        until,
		EmploymentID: employmentID,
	}
}
