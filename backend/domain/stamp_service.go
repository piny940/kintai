package domain

import "time"

type StampService struct {
	employmentId EmploymentID
	fromTime     time.Time
	toTime       time.Time
	stampRepo    IStampRepo
	stamps       []*Stamp
}

func NewStampService(employmentId EmploymentID, since, until time.Time, stampRepo IStampRepo) (*StampService, error) {
	stamps, err := stampRepo.List(&StampQuery{
		EmploymentId: &employmentId,
		FromTime:     &since,
		ToTime:       &until,
	})
	if err != nil {
		return nil, err
	}
	return &StampService{
		employmentId: employmentId,
		fromTime:     since,
		toTime:       until,
		stampRepo:    stampRepo,
		stamps:       stamps,
	}, nil
}

func (ss *StampService) GetWorkTime(fromTime, toTime time.Time) (time.Duration, error) {
	if fromTime.After(toTime) {
		return 0, errInvalidTimeRange{}
	}
	duration := time.Duration(0)
	stamps := ss.filterStamps(fromTime, toTime)

	workStatusAtStart, err := GetWorkStatus(ss.fromTime, ss.employmentId, ss.stampRepo)
	if err != nil {
		return 0, err
	}
	startIdx := 0
	if *workStatusAtStart == WorkStatusWorking {
		startIdx = 1
		duration += stamps[0].StampedAt.Sub(ss.fromTime)
	}

	for i := startIdx; i+1 < len(stamps); i += 2 {
		duration += stamps[i+1].StampedAt.Sub(stamps[i].StampedAt)
	}

	workStatusAtEnd, err := GetWorkStatus(ss.toTime, ss.employmentId, ss.stampRepo)
	if err != nil {
		return 0, err
	}
	if *workStatusAtEnd == WorkStatusWorking {
		duration += ss.toTime.Sub(stamps[len(stamps)-1].StampedAt)
	}

	return duration, nil
}

func (ss *StampService) filterStamps(fromTime, toTime time.Time) []*Stamp {
	var stamps []*Stamp
	for _, stamp := range ss.stamps {
		if stamp.StampedAt.After(fromTime) && stamp.StampedAt.Before(toTime) {
			stamps = append(stamps, stamp)
		}
	}
	return stamps
}
