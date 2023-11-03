package domain

import "time"

type WorkStatus int

const (
	WorkStatusWorking WorkStatus = iota
	WorkStatusLeft
)

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

func (wr *WorkReport) Total() time.Duration {
	total := time.Duration(0)
	for idx := 0; idx < len(wr.Stamps)-1; idx += 2 {
		total += wr.Stamps[idx+1].StampedAt.Sub(wr.Stamps[idx].StampedAt)
	}
	return total
}

func (wr *WorkReport) GetWorkStatus() WorkStatus {
	if len(wr.Stamps)%2 == 0 {
		return WorkStatusLeft
	}
	return WorkStatusWorking
}
