package domain

import "time"

type WorkReport struct {
	employmentId EmploymentID
	since        time.Time
	until        time.Time
	stampRepo    IStampRepo
}

func NewWorkReport(employmentId EmploymentID, since time.Time, until time.Time, stampRepo IStampRepo) *WorkReport {
	return &WorkReport{
		employmentId: employmentId,
		since:        since,
		until:        until,
		stampRepo:    stampRepo,
	}
}
