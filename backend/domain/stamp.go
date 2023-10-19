package domain

import "time"

type StampId uint

type Stamp struct {
	ID        StampId   `json:"id"`
	StampedAt time.Time `json:"stamped_at"`
	WorkerID  WorkerID  `json:"worker_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func NewStamp(stampedAt time.Time, workerID WorkerID) (*Stamp, error) {
	return &Stamp{
		StampedAt: stampedAt,
		WorkerID:  workerID,
	}, nil
}
