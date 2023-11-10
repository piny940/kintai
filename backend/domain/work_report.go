package domain

import (
	"time"
)

type WorkReport struct {
	employmentId EmploymentID
	fromTime     time.Time
	toTime       time.Time
	stamps       []*Stamp
	stampRepo    IStampRepo
}
type MonthWorkReportMap map[time.Month]*WorkReport
type YearReport struct {
	EmploymentId EmploymentID
	Year         time.Time
	Report       MonthWorkReportMap
}

func NewWorkReport(employmentId EmploymentID, fromTime, toTime time.Time, stamps []*Stamp, stampRepo IStampRepo) *WorkReport {
	return &WorkReport{
		employmentId: employmentId,
		fromTime:     fromTime,
		toTime:       toTime,
		stamps:       stamps,
		stampRepo:    stampRepo,
	}
}
func (wr *WorkReport) GetWorkTime() (time.Duration, error) {
	duration := time.Duration(0)

	workStatusAtStart, err := GetWorkStatus(wr.fromTime, wr.employmentId, wr.stampRepo)
	if err != nil {
		return 0, err
	}
	startIdx := 0
	if *workStatusAtStart == WorkStatusWorking {
		startIdx = 1
		duration += wr.stamps[0].StampedAt.Sub(wr.fromTime)
	}

	for i := startIdx; i+1 < len(wr.stamps); i += 2 {
		duration += wr.stamps[i+1].StampedAt.Sub(wr.stamps[i].StampedAt)
	}

	workStatusAtEnd, err := GetWorkStatus(wr.toTime, wr.employmentId, wr.stampRepo)
	if err != nil {
		return 0, err
	}
	if *workStatusAtEnd == WorkStatusWorking {
		duration += wr.toTime.Sub(wr.stamps[len(wr.stamps)-1].StampedAt)
	}

	return duration, nil
}
func (wr *WorkReport) GetStamps() []*Stamp {
	return wr.stamps
}
