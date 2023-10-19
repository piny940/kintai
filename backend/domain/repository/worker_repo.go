package repository

import "kintai_backend/domain"

type IWorkerRepo interface {
	FindByEmail(email domain.WorkerEmail) (*domain.Worker, error)
	FindById(id domain.WorkerID) (*domain.Worker, error)
	List() ([]*domain.Worker, error)
	Create(worker *domain.Worker) (*domain.Worker, error)
	ListCompanies(workerId domain.WorkerID) ([]*domain.Company, error)
}
