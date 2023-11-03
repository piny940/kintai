package domain

import "time"

type WorkReport struct {
	employmentId EmploymentID
	fromTime     time.Time
	toTime       time.Time
	stampRepo    IStampRepo
}

func NewWorkReport(employmentId EmploymentID, since time.Time, until time.Time, stampRepo IStampRepo) *WorkReport {
	return &WorkReport{
		employmentId: employmentId,
		fromTime:     since,
		toTime:       until,
		stampRepo:    stampRepo,
	}
}

func (wr *WorkReport) GetWorkTime() (time.Duration, error) {
	duration := time.Duration(0)

	stamps, err := wr.stampRepo.List(&StampQuery{
		EmploymentId: &wr.employmentId,
		FromTime:     &wr.fromTime,
		ToTime:       &wr.toTime,
	})
	if err != nil {
		return 0, err
	}

	workStatusAtStart, err := GetWorkStatus(wr.fromTime, wr.employmentId, wr.stampRepo)
	if err != nil {
		return 0, err
	}
	startIdx := 0
	if *workStatusAtStart == WorkStatusWorking {
		startIdx = 1
		duration += stamps[0].StampedAt.Sub(wr.fromTime)
	}

	for i := startIdx; i+1 < len(stamps); i += 2 {
		duration += stamps[i+1].StampedAt.Sub(stamps[i].StampedAt)
	}

	workStatusAtEnd, err := GetWorkStatus(wr.toTime, wr.employmentId, wr.stampRepo)
	if err != nil {
		return 0, err
	}
	if *workStatusAtEnd == WorkStatusWorking {
		duration += wr.toTime.Sub(stamps[len(stamps)-1].StampedAt)
	}

	return duration, nil
}
