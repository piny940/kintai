package use_case

import (
	"kintai_backend/domain"
	"kintai_backend/domain/repository"
	"time"
)

type IStampUseCase interface {
	Stamp(workerId domain.WorkerID) (*domain.Stamp, error)
}

type stampUseCase struct {
	stampRepo repository.IStampRepo
}

func NewStampUseCase() IStampUseCase {
	return &stampUseCase{}
}

func (u *stampUseCase) Stamp(workerId domain.WorkerID) (*domain.Stamp, error) {
	stampedAt := time.Now()
	stamp, err := domain.NewStamp(stampedAt, workerId)
	if err != nil {
		return nil, err
	}
	stampResult, err := u.stampRepo.Create(stamp)
	if err != nil {
		return nil, err
	}
	return stampResult, nil
}
