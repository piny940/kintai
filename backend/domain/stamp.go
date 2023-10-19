package domain

import "time"

type StampId uint

type Stamp struct {
	ID           StampId      `json:"id"`
	StampedAt    time.Time    `json:"stamped_at"`
	EmploymentID EmploymentID `json:"employment_id"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}

func NewStamp(stampedAt time.Time, employmentID EmploymentID) (*Stamp, error) {
	return &Stamp{
		StampedAt:    stampedAt,
		EmploymentID: employmentID,
	}, nil
}
