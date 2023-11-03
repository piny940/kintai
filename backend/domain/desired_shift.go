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
type DesiredShiftQuery struct {
	ID           *DesiredShiftID `json:"id"`
	EmploymentID *EmploymentID   `json:"employment_id"`
	FromTime     *time.Time      `json:"from_time"`
	ToTime       *time.Time      `json:"to_time"`
}
type IDesiredShiftRepo interface {
	List(query *DesiredShiftQuery) ([]*DesiredShift, error)
	ListAll(companyId CompanyID, query *DesiredShiftQuery) ([]*DesiredShift, error)
	Create(desiredShift *DesiredShift) (*DesiredShift, error)
}

func NewDesiredShift(since time.Time, till time.Time, employmentID EmploymentID) *DesiredShift {
	return &DesiredShift{
		Since:        since,
		Till:         till,
		EmploymentID: employmentID,
	}
}
