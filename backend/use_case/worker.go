package use_case

import (
	"kintai_backend/domain"
	"kintai_backend/domain/repository"
)

type IWorkerUseCase interface {
	List() ([]*domain.Worker, error)
	SignUp(email domain.WorkerEmail, password domain.WorkerRawPassword, name *domain.WorkerName) (*domain.Worker, error)
}

type workerUseCase struct {
	workerRepo repository.IWorkerRepo
}

func NewWorkerUseCase(workerRepo repository.IWorkerRepo) IWorkerUseCase {
	return &workerUseCase{workerRepo: workerRepo}
}

func (u *workerUseCase) List() ([]*domain.Worker, error) {
	return u.workerRepo.List()
}

func (u *workerUseCase) SignUp(email domain.WorkerEmail, rawPassword domain.WorkerRawPassword, name *domain.WorkerName) (*domain.Worker, error) {
	password, err := domain.NewWorkerPassword(rawPassword)
	if err != nil {
		return nil, err
	}
	worker, err := domain.NewWorker(email, password, name)
	if err != nil {
		return nil, err
	}
	return u.workerRepo.Create(worker)
}
