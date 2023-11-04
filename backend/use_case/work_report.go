package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IWorkReportUseCase interface {
	GetYearReport(year time.Time, workerId domain.WorkerID, companyId domain.CompanyID) (*domain.YearReport, error)
}

type workReportUseCase struct {
	employmentRepo domain.IEmploymentRepo
	stampRepo      domain.IStampRepo
}

func NewWorkReportUseCase(employmentRepo domain.IEmploymentRepo, stampRepo domain.IStampRepo) IWorkReportUseCase {
	return &workReportUseCase{employmentRepo: employmentRepo, stampRepo: stampRepo}
}

func (wu workReportUseCase) GetYearReport(year time.Time, workerId domain.WorkerID, companyId domain.CompanyID) (*domain.YearReport, error) {
	employment, err := wu.employmentRepo.Find(companyId, workerId)
	if err != nil {
		return nil, err
	}
	service := domain.NewStampService(employment.ID, wu.stampRepo)
	return service.GetYearReport(year)
}
