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
