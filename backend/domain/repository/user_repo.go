package repository

import "kintai_backend/domain"

type IWorkerRepo interface {
	FindByEmail(email domain.WorkerEmail) (*domain.Worker, error)
	List() ([]*domain.Worker, error)
	Create(email domain.WorkerEmail, password domain.WorkerHashedPassword) (*domain.Worker, error)
}
