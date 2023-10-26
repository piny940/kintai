package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IDesiredShiftUseCase interface {
	Create(employmentId domain.EmploymentID, since time.Time, till time.Time) (*domain.DesiredShift, error)
}

type desiredShiftUseCase struct {
	desiredShiftRepo domain.IDesiredShiftRepo
}

func NewDesiredShiftUseCase(desiredShiftRepo domain.IDesiredShiftRepo) IDesiredShiftUseCase {
	return &desiredShiftUseCase{desiredShiftRepo: desiredShiftRepo}
}

func (u *desiredShiftUseCase) Create(employmentId domain.EmploymentID, since time.Time, till time.Time) (*domain.DesiredShift, error) {
	desiredShift := domain.NewDesiredShift(since, till, employmentId)
	desiredShiftResult, err := u.desiredShiftRepo.Create(desiredShift)
	if err != nil {
		return nil, err
	}
	return desiredShiftResult, nil
}
