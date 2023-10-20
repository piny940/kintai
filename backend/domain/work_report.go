package domain

import "time"

type WorkReport struct {
	EmploymentId EmploymentID `json:"employment_id"`
	Stamps       []*Stamp     `json:"stamps"`
	Since        time.Time    `json:"since"`
	Until        time.Time    `json:"until"`
}
