package use_case

import (
	"fmt"
	"kintai_backend/domain"
	"time"
)

type IDesiredShiftUseCase interface {
	Create(employmentId domain.EmploymentID, since time.Time, till time.Time) (*domain.DesiredShift, error)
	ListCompanyDesiredShifts(workerId domain.WorkerID, companyId domain.CompanyID, query *domain.DesiredShiftQuery) ([]*domain.DesiredShift, error)
}

type desiredShiftUseCase struct {
	desiredShiftRepo domain.IDesiredShiftRepo
	employmentRepo   domain.IEmploymentRepo
}

func NewDesiredShiftUseCase(desiredShiftRepo domain.IDesiredShiftRepo, employmentRepo domain.IEmploymentRepo) IDesiredShiftUseCase {
	return &desiredShiftUseCase{desiredShiftRepo: desiredShiftRepo, employmentRepo: employmentRepo}
}

func (u *desiredShiftUseCase) Create(employmentId domain.EmploymentID, since, till time.Time) (*domain.DesiredShift, error) {
	desiredShift := domain.NewDesiredShift(since, till, employmentId)
	desiredShiftResult, err := u.desiredShiftRepo.Create(desiredShift)
	if err != nil {
		return nil, err
	}
	return desiredShiftResult, nil
}
func (u *desiredShiftUseCase) ListCompanyDesiredShifts(currentWorkerId domain.WorkerID, companyId domain.CompanyID, query *domain.DesiredShiftQuery) ([]*domain.DesiredShift, error) {
	employment, err := u.employmentRepo.Find(companyId, currentWorkerId)
	if err != nil {
		return nil, err
	}
	if employment.Kind != domain.EmploymentAdmin {
		return nil, fmt.Errorf("権限がありません")
	}
	desiredShifts, err := u.desiredShiftRepo.ListAll(companyId, query)
	if err != nil {
		return nil, err
	}
	return desiredShifts, nil
}
