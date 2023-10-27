package use_case

import (
	"kintai_backend/domain"
	"time"
)

type IWorkStatusUseCase interface {
	Show(employmentId domain.EmploymentID) (domain.WorkStatus, error)
}

type workStatusUseCase struct {
	workReportRepo domain.IWorkReportRepo
}

func NewWorkStatusUseCase(workReportRepo domain.IWorkReportRepo) IWorkStatusUseCase {
	return &workStatusUseCase{workReportRepo: workReportRepo}
}

func (u *workStatusUseCase) Show(employmentId domain.EmploymentID) (domain.WorkStatus, error) {
	now := time.Now()
	since := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	until := time.Date(now.Year(), now.Month()+1, 1, 0, 0, 0, 0, now.Location())
	workReport, err := u.workReportRepo.Show(employmentId, since, until)
	if err != nil {
		return domain.WorkStatusLeft, err
	}
	return workReport.GetWorkStatus(), nil
}
