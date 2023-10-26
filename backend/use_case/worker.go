package use_case

import (
	"kintai_backend/domain"
)

type IWorkerUseCase interface {
	SignUp(email domain.WorkerEmail, password domain.WorkerRawPassword, name *domain.WorkerName) (*domain.Worker, error)
}

type workerUseCase struct {
	workerRepo domain.IWorkerRepo
}

func NewWorkerUseCase(workerRepo domain.IWorkerRepo) IWorkerUseCase {
	return &workerUseCase{workerRepo: workerRepo}
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
