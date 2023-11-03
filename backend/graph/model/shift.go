package model

import "time"

type Shift struct {
	ID           uint      `json:"id"`
	Since        time.Time `json:"since"`
	Till         time.Time `json:"till"`
	EmploymentID uint      `json:"employmentId"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}
