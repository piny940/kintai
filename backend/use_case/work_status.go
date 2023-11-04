package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IWorkStatusUseCase interface {
	GetCurrentWorkStatus(workerId domain.WorkerID, companyId domain.CompanyID) (*domain.WorkStatus, error)
}

type workStatusUseCase struct {
	employmentRepo domain.IEmploymentRepo
	stampRepo      domain.IStampRepo
}

func NewWorkStatusUseCase(employmentRepo domain.IEmploymentRepo, stampRepo domain.IStampRepo) IWorkStatusUseCase {
	return &workStatusUseCase{employmentRepo: employmentRepo, stampRepo: stampRepo}
}

func (uc *workStatusUseCase) GetCurrentWorkStatus(workerId domain.WorkerID, companyId domain.CompanyID) (*domain.WorkStatus, error) {
	employment, err := uc.employmentRepo.Find(companyId, workerId)
	if err != nil {
		return nil, err
	}
	return domain.GetWorkStatus(time.Now(), employment.ID, uc.stampRepo)
}
