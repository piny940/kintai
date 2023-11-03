package use_case

import (
	"fmt"
	"kintai_backend/domain"
	"time"
)

type IShiftUseCase interface {
	ListCompanyShifts(workerId domain.WorkerID, companyId domain.CompanyID, query *domain.ShiftQuery) ([]*domain.Shift, error)
}

type shiftUseCase struct {
	shiftRepo      domain.IShiftRepo
	employmentRepo domain.IEmploymentRepo
}

func NewShiftUseCase(shiftRepo domain.IShiftRepo, employmentRepo domain.IEmploymentRepo) IShiftUseCase {
	return &shiftUseCase{shiftRepo: shiftRepo, employmentRepo: employmentRepo}
}

func (u *shiftUseCase) ListCompanyShifts(workerId domain.WorkerID, companyId domain.CompanyID, query *domain.ShiftQuery) ([]*domain.Shift, error) {
	_, err := u.employmentRepo.Find(companyId, workerId)
	if err != nil {
		return nil, err
	}
	shifts, err := u.shiftRepo.ListAll(companyId, query)
	if err != nil {
		return nil, err
	}
	return shifts, nil
}

func (u *shiftUseCase) Create(currentWorkerId domain.WorkerID, employmentId domain.EmploymentID, since, till time.Time) (*domain.Shift, error) {
	employment, err := u.employmentRepo.FindById(employmentId)
	if err != nil {
		return nil, err
	}
	currentWorkerEmployment, err := u.employmentRepo.Find(employment.CompanyID, currentWorkerId)
	if err != nil {
		return nil, err
	}
	if currentWorkerEmployment.Kind != domain.EmploymentAdmin {
		return nil, fmt.Errorf("権限がありません")
	}

	shift := domain.NewShift(since, till, employmentId)
	shiftResult, err := u.shiftRepo.Create(shift)
	if err != nil {
		return nil, err
	}
	return shiftResult, nil
}
