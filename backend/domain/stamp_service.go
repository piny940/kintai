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

func (ss *StampService) GetYearReport(year time.Time) (*YearReport, error) {
	report := make(map[time.Month]*WorkReport)
	for month := time.Month(1); month <= 12; month++ {
		fromTime := time.Date(year.Year(), month, 1, 0, 0, 0, 0, time.UTC)
		toTime := fromTime.AddDate(0, 1, 0)
		stamps := ss.filterStamps(fromTime, toTime)
		report[month] = NewWorkReport(ss.employmentId, fromTime, toTime, stamps, ss.stampRepo)
	}

	return &YearReport{
		employmentId: ss.employmentId,
		year:         year,
		report:       report,
	}, nil
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

type errInvalidTimeRange struct{}

func (e errInvalidTimeRange) Error() string {
	return "invalid time range"
}
