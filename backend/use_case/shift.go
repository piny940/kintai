package use_case

import "kintai_backend/domain"

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
