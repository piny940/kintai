package use_case

import (
	"fmt"
	"kintai_backend/domain"
	"time"
)

type IDesiredShiftUseCase interface {
	Create(
		employmentId domain.EmploymentID,
		since, till time.Time,
	) (*domain.DesiredShift, error)
	ListCompanyDesiredShifts(
		workerId domain.WorkerID,
		companyId domain.CompanyID,
		query *domain.DesiredShiftQuery,
	) ([]*domain.DesiredShift, error)
	Update(
		currentWorkerId domain.WorkerID,
		desiredShiftId domain.DesiredShiftID,
		since, till time.Time,
	) (*domain.DesiredShift, error)
	Delete(
		currentWorkerId domain.WorkerID,
		desiredShiftId domain.DesiredShiftID,
	) (*domain.DesiredShift, error)
}

type desiredShiftUseCase struct {
	desiredShiftRepo domain.IDesiredShiftRepo
	employmentRepo   domain.IEmploymentRepo
}

func NewDesiredShiftUseCase(
	desiredShiftRepo domain.IDesiredShiftRepo,
	employmentRepo domain.IEmploymentRepo,
) IDesiredShiftUseCase {
	return &desiredShiftUseCase{desiredShiftRepo: desiredShiftRepo, employmentRepo: employmentRepo}
}

func (u *desiredShiftUseCase) Create(employmentId domain.EmploymentID, since, till time.Time) (*domain.DesiredShift, error) {
	timeRange, err := domain.NewTimeRange(since, till)
	if err != nil {
		return nil, err
	}
	desiredShift := domain.NewDesiredShift(timeRange, employmentId)
	desiredShiftResult, err := u.desiredShiftRepo.Create(desiredShift)
	if err != nil {
		return nil, err
	}
	return desiredShiftResult, nil
}
func (u *desiredShiftUseCase) ListCompanyDesiredShifts(
	currentWorkerId domain.WorkerID,
	companyId domain.CompanyID,
	query *domain.DesiredShiftQuery,
) ([]*domain.DesiredShift, error) {
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

func (u *desiredShiftUseCase) Update(
	currentWorkerId domain.WorkerID,
	desiredShiftId domain.DesiredShiftID,
	since, till time.Time,
) (*domain.DesiredShift, error) {
	desiredShift, err := u.desiredShiftRepo.FindById(desiredShiftId)
	if err != nil {
		return nil, err
	}
	employment, err := u.employmentRepo.FindById(desiredShift.EmploymentID)
	if err != nil {
		return nil, err
	}
	if employment.WorkerID != currentWorkerId {
		return nil, fmt.Errorf("権限がありません")
	}
	timeRange, err := domain.NewTimeRange(since, till)
	if err != nil {
		return nil, err
	}
	desiredShift.TimeRange = timeRange
	desiredShift, err = u.desiredShiftRepo.Update(desiredShift)
	if err != nil {
		return nil, err
	}
	return desiredShift, nil
}

func (u *desiredShiftUseCase) Delete(
	currentWorkerId domain.WorkerID,
	desiredShiftId domain.DesiredShiftID,
) (*domain.DesiredShift, error) {
	desiredShift, err := u.desiredShiftRepo.FindById(desiredShiftId)
	if err != nil {
		return nil, err
	}
	employment, err := u.employmentRepo.FindById(desiredShift.EmploymentID)
	if err != nil {
		return nil, err
	}
	if employment.WorkerID != currentWorkerId {
		return nil, fmt.Errorf("権限がありません")
	}
	desiredShift, err = u.desiredShiftRepo.Delete(desiredShiftId)
	if err != nil {
		return nil, err
	}
	return desiredShift, nil
}
