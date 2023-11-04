package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IWorkReportUseCase interface {
}

type workReportUseCase struct {
	employmentRepo domain.IEmploymentRepo
	stampRepo      domain.IStampRepo
}

func NewWorkReportUseCase(employmentRepo domain.IEmploymentRepo, stampRepo domain.IStampRepo) IWorkReportUseCase {
	return &workReportUseCase{employmentRepo: employmentRepo, stampRepo: stampRepo}
}

func GetYearReport(employmentId domain.EmploymentID, year time.Time) (domain.YearReport, error) {
	return domain.YearReport{}, nil
}
