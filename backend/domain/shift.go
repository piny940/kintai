package domain

import "time"

type ShiftId uint

type Shift struct {
	ID           ShiftId      `json:"id"`
	Since        time.Time    `json:"since"`
	Till         time.Time    `json:"till"`
	EmploymentID EmploymentID `json:"employment_id"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
}
type ShiftQuery struct {
	ID           *DesiredShiftID `json:"id"`
	EmploymentID *EmploymentID   `json:"employment_id"`
	FromTime     *time.Time      `json:"from_time"`
	ToTime       *time.Time      `json:"to_time"`
}
type IShiftRepo interface {
	ListAll(companyId CompanyID, shiftQuery *ShiftQuery) ([]*Shift, error)
}
