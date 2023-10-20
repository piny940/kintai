package repository

import (
	"kintai_backend/domain"
	"time"
)

type IWorkReportRepo interface {
	Show(employmentId domain.EmploymentID, since time.Time, until time.Time) (*domain.WorkReport, error)
}
