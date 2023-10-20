package use_case

import (
	"kintai_backend/domain"
	"kintai_backend/domain/repository"
	"time"
)

type IWorkStatusUseCase interface {
	Show(employmentId domain.EmploymentID) (domain.WorkStatus, error)
}

type workStatusUseCase struct {
	workReportRepo repository.IWorkReportRepo
}

func NewWorkStatusUseCase() IWorkStatusUseCase {
	return &workStatusUseCase{}
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
