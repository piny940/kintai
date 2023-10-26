package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IStampUseCase interface {
	PushStamp(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Stamp, error)
}

type stampUseCase struct {
	stampRepo      domain.IStampRepo
	employmentRepo domain.IEmploymentRepo
}

func NewStampUseCase(stampRepo domain.IStampRepo, employmentRepo domain.IEmploymentRepo) IStampUseCase {
	return &stampUseCase{stampRepo: stampRepo, employmentRepo: employmentRepo}
}

func (u *stampUseCase) PushStamp(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Stamp, error) {
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
