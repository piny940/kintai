package domain

import "time"

type StampId uint

type Stamp struct {
	ID        StampId   `json:"id"`
	StampedAt time.Time `json:"stamped_at"`
	WorkerID  WorkerID  `json:"worker_id"`
}
