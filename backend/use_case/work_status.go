package use_case

import (
	"kintai_backend/domain"
)

type IWorkStatusUseCase interface {
	GetWorkStatus(workerId domain.WorkerID, companyId domain.CompanyID) (*domain.WorkStatus, error)
}

type workStatusUseCase struct {
	employmentRepo domain.IEmploymentRepo
	stampRepo      domain.IStampRepo
}

func NewWorkStatusUseCase(employmentRepo domain.IEmploymentRepo, stampRepo domain.IStampRepo) IWorkStatusUseCase {
	return &workStatusUseCase{employmentRepo: employmentRepo, stampRepo: stampRepo}
}

func (uc *workStatusUseCase) GetWorkStatus(workerId domain.WorkerID, companyId domain.CompanyID) (*domain.WorkStatus, error) {
	employment, err := uc.employmentRepo.Find(companyId, workerId)
	if err != nil {
		return nil, err
	}
	return domain.GetWorkStatus(employment.ID, uc.stampRepo)
}
