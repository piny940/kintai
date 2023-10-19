package domain

import (
	"time"
)

type WorkerID uint
type WorkerEmail string
type WorkerStatus int

const (
	WorkerActive WorkerStatus = iota
	WorkerInactive
)

type Worker struct {
	ID        WorkerID       `json:"id"`
	Email     WorkerEmail    `json:"email"`
	Password  WorkerPassword `json:"-"`
	Status    WorkerStatus   `json:"status"`
	Name      WorkerName     `json:"name"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

func NewWorker(email WorkerEmail, password *WorkerPassword, name *WorkerName) (*Worker, error) {
	status := WorkerActive
	return &Worker{
		Email:    email,
		Password: *password,
		Status:   status,
		Name:     *name,
	}, nil
}

func (w *Worker) NewStamp(stampedAt time.Time) (*Stamp, error) {
	return &Stamp{
		StampedAt: stampedAt,
		WorkerID:  w.ID,
	}, nil
}
