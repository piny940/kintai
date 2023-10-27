package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IWorkReportUseCase interface {
	List(since time.Time, until time.Time, employmentId domain.EmploymentID) ([]*domain.WorkReport, error)
}

type workReportUseCase struct {
	workReportRepo domain.IWorkReportRepo
	employmentRepo domain.IEmploymentRepo
}

func NewWorkReportUseCase(workReportRepo domain.IWorkReportRepo, employmentRepo domain.IEmploymentRepo) *workReportUseCase {
	return &workReportUseCase{workReportRepo: workReportRepo, employmentRepo: employmentRepo}
}

func (u *workReportUseCase) List(since time.Time, until time.Time, employmentId domain.EmploymentID) ([]*domain.WorkReport, error) {
	workReports := make([]*domain.WorkReport, 0)

	for year := since.Year(); year <= until.Year(); year++ {
		for month := since.Month(); month <= until.Month(); month++ {
			since := time.Date(year, month, 1, 0, 0, 0, 0, time.Local)
			until := time.Date(year, month+1, 1, 0, 0, 0, 0, time.Local)
			workReport, err := u.workReportRepo.Show(employmentId, since, until)
			if err != nil {
				return nil, err
			}
			workReports = append(workReports, workReport)
		}
	}

	return workReports, nil
}
