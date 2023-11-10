package domain

import (
	"time"
)

type DesiredShiftID int

type DesiredShift struct {
	ID           DesiredShiftID
	TimeRange    *TimeRange
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
	FindById(desiredShiftId DesiredShiftID) (*DesiredShift, error)
	Create(desiredShift *DesiredShift) (*DesiredShift, error)
	Update(desiredShift *DesiredShift) (*DesiredShift, error)
	Delete(desiredShiftId DesiredShiftID) (*DesiredShift, error)
}

func NewDesiredShift(timeRange *TimeRange, employmentID EmploymentID) *DesiredShift {
	return &DesiredShift{
		TimeRange:    timeRange,
		EmploymentID: employmentID,
	}
}
