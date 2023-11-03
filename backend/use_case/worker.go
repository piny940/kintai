package use_case

import (
	"fmt"
	"kintai_backend/domain"
)

type IWorkerUseCase interface {
	SignUp(email domain.WorkerEmail, password domain.WorkerRawPassword, name *domain.WorkerName) (*domain.Worker, error)
	ListCompanyWorkers(currentWorkerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Worker, error)
}

type workerUseCase struct {
	workerRepo     domain.IWorkerRepo
	employmentRepo domain.IEmploymentRepo
}

func NewWorkerUseCase(workerRepo domain.IWorkerRepo, employmentRepo domain.IEmploymentRepo) IWorkerUseCase {
	return &workerUseCase{workerRepo: workerRepo, employmentRepo: employmentRepo}
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

func (u *workerUseCase) ListCompanyWorkers(currentWorkerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Worker, error) {
	employment, err := u.employmentRepo.Find(companyId, currentWorkerId)
	if err != nil {
		return nil, err
	}
	if employment.Kind != domain.EmploymentAdmin {
		return nil, fmt.Errorf("権限がありません")
	}
	workers, err := u.workerRepo.List(companyId)
	if err != nil {
		return nil, err
	}
	return workers, nil
}
