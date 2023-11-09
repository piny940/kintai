package use_case

import (
	"fmt"
	"kintai_backend/domain"
	"time"
)

type IShiftUseCase interface {
	ListCompanyShifts(workerId domain.WorkerID, companyId domain.CompanyID, query *domain.ShiftQuery) ([]*domain.Shift, error)
	Create(
		currentWorkerId domain.WorkerID,
		targetWorkerId domain.WorkerID,
		companyId domain.CompanyID,
		since,
		till time.Time,
	) (*domain.Shift, error)
	Update(
		currentWorkerId domain.WorkerID,
		shiftId domain.ShiftId,
		since,
		till time.Time,
	) (*domain.Shift, error)
}

type shiftUseCase struct {
	shiftRepo      domain.IShiftRepo
	employmentRepo domain.IEmploymentRepo
}

func NewShiftUseCase(shiftRepo domain.IShiftRepo, employmentRepo domain.IEmploymentRepo) IShiftUseCase {
	return &shiftUseCase{shiftRepo: shiftRepo, employmentRepo: employmentRepo}
}

func (u *shiftUseCase) ListCompanyShifts(currentWorkerId domain.WorkerID, companyId domain.CompanyID, query *domain.ShiftQuery) ([]*domain.Shift, error) {
	_, err := u.employmentRepo.Find(companyId, currentWorkerId)
	if err != nil {
		return nil, err
	}
	shifts, err := u.shiftRepo.ListAll(companyId, query)
	if err != nil {
		return nil, err
	}
	return shifts, nil
}

func (u *shiftUseCase) Create(
	currentWorkerId domain.WorkerID,
	targetWorkerId domain.WorkerID,
	companyId domain.CompanyID,
	since,
	till time.Time,
) (*domain.Shift, error) {
	employment, err := u.employmentRepo.Find(companyId, targetWorkerId)
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

	shift := domain.NewShift(since, till, employment.ID)
	shiftResult, err := u.shiftRepo.Create(shift)
	if err != nil {
		return nil, err
	}
	return shiftResult, nil
}

func (u *shiftUseCase) Update(
	currentWorkerId domain.WorkerID,
	shiftId domain.ShiftId,
	since,
	till time.Time,
) (*domain.Shift, error) {
	shift, err := u.shiftRepo.FindById(shiftId)
	if err != nil {
		return nil, err
	}
	employment, err := u.employmentRepo.FindById(shift.EmploymentID)
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

	shift.Since = since
	shift.Till = till
	shiftResult, err := u.shiftRepo.Update(shift)
	if err != nil {
		return nil, err
	}
	return shiftResult, nil
}

func (u *shiftUseCase) Destroy(
	currentWorkerId domain.WorkerID,
	shiftId domain.ShiftId,
) (*domain.Shift, error) {
	shift, err := u.shiftRepo.FindById(shiftId)
	if err != nil {
		return nil, err
	}
	employment, err := u.employmentRepo.FindById(shift.EmploymentID)
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

	shiftResult, err := u.shiftRepo.Destroy(shiftId)
	if err != nil {
		return nil, err
	}
	return shiftResult, nil
}
