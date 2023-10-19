package use_case

import (
	"kintai_backend/domain"
	"kintai_backend/domain/repository"
	"time"
)

type IStampUseCase interface {
	Stamp(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Stamp, error)
	List(workerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Stamp, error)
}

type stampUseCase struct {
	stampRepo      repository.IStampRepo
	employmentRepo repository.IEmploymentRepo
}

func NewStampUseCase(stampRepo repository.IStampRepo, employmentRepo repository.IEmploymentRepo) IStampUseCase {
	return &stampUseCase{stampRepo: stampRepo, employmentRepo: employmentRepo}
}

func (u *stampUseCase) List(workerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Stamp, error) {
	return u.stampRepo.List(workerId, companyId)
}

func (u *stampUseCase) Stamp(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Stamp, error) {
	stampedAt := time.Now()

	employment, err := u.employmentRepo.Find(companyId, workerId)
	if err != nil {
		return nil, err
	}
	stamp, err := domain.NewStamp(stampedAt, employment.ID)
	if err != nil {
		return nil, err
	}
	stampResult, err := u.stampRepo.Create(stamp)
	if err != nil {
		return nil, err
	}
	return stampResult, nil
}
