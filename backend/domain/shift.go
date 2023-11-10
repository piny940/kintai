package domain

import "time"

type ShiftId uint

type Shift struct {
	ID           ShiftId
	TimeRange    *TimeRange
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
	FindById(shiftId ShiftId) (*Shift, error)
	Create(shift *Shift) (*Shift, error)
	Update(shift *Shift) (*Shift, error)
	Delete(shiftId ShiftId) (*Shift, error)
}

func NewShift(timeRange *TimeRange, employmentID EmploymentID) (*Shift, error) {
	return &Shift{
		TimeRange:    timeRange,
		EmploymentID: employmentID,
	}, nil
}
