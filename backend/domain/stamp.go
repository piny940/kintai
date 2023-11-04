package domain

import "time"

type StampId uint

type Stamp struct {
	ID           StampId
	StampedAt    time.Time
	EmploymentID EmploymentID
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
type StampQuery struct {
	EmploymentId *EmploymentID
	FromTime     *time.Time
	ToTime       *time.Time
}
type IStampRepo interface {
	List(query *StampQuery) ([]*Stamp, error)
	Create(stamp *Stamp) (*Stamp, error)
	Count(query *StampQuery) (int, error)
}

func NewStamp(stampedAt time.Time, employmentID EmploymentID) (*Stamp, error) {
	return &Stamp{
		StampedAt:    stampedAt,
		EmploymentID: employmentID,
	}, nil
}
