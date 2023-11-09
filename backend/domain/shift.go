package domain

import "time"

type ShiftId uint

type Shift struct {
	ID           ShiftId
	Since        time.Time
	Till         time.Time
	EmploymentID EmploymentID
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
type ShiftQuery struct {
	ID           *ShiftId
	EmploymentID *EmploymentID
	FromTime     *time.Time
	ToTime       *time.Time
}
type IShiftRepo interface {
	ListAll(companyId CompanyID, shiftQuery *ShiftQuery) ([]*Shift, error)
	Create(shift *Shift) (*Shift, error)
	Update(shift *Shift) (*Shift, error)
	Destroy(shiftId ShiftId) (*Shift, error)
}

func NewShift(since time.Time, till time.Time, employmentID EmploymentID) *Shift {
	return &Shift{
		Since:        since,
		Till:         till,
		EmploymentID: employmentID,
	}
}
