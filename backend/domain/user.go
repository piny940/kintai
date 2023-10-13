package domain

import (
	"time"
)

type WorkerID uint
type WorkerEmail string

type Worker struct {
	ID        WorkerID       `json:"id"`
	Email     WorkerEmail    `json:"email"`
	Password  WorkerPassword `json:"-"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

func NewWorker(email WorkerEmail, password *WorkerPassword) (*Worker, error) {
	return &Worker{
		Email:    email,
		Password: *password,
	}, nil
}
