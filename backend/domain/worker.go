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
	ID        WorkerID
	Email     WorkerEmail
	Password  WorkerPassword
	Status    WorkerStatus
	Name      WorkerName
	CreatedAt time.Time
	UpdatedAt time.Time
}
type IWorkerRepo interface {
	FindByEmail(email WorkerEmail) (*Worker, error)
	FindById(id WorkerID) (*Worker, error)
	FindAllByIds(ids []WorkerID) ([]*Worker, error)
	List(companyId CompanyID) ([]*Worker, error)
	Create(worker *Worker) (*Worker, error)
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
