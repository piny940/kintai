package domain

import (
	"time"
)

type DesiredShiftID int

type DesiredShift struct {
	ID           DesiredShiftID
	Since        time.Time
	Till         time.Time
	EmploymentID EmploymentID
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
type DesiredShiftQuery struct {
	ID           *DesiredShiftID
	EmploymentID *EmploymentID
	FromTime     *time.Time
	ToTime       *time.Time
}
type IDesiredShiftRepo interface {
	List(query *DesiredShiftQuery) ([]*DesiredShift, error)
	ListAll(companyId CompanyID, query *DesiredShiftQuery) ([]*DesiredShift, error)
	Show(desiredShiftId DesiredShiftID) (*DesiredShift, error)
	Create(desiredShift *DesiredShift) (*DesiredShift, error)
	Destroy(desiredShiftId *DesiredShiftID) error
}

func NewDesiredShift(since time.Time, till time.Time, employmentID EmploymentID) *DesiredShift {
	return &DesiredShift{
		Since:        since,
		Till:         till,
		EmploymentID: employmentID,
	}
}
