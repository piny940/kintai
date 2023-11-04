package domain

import "time"

type StampService struct {
	employmentId EmploymentID
	fromTime     time.Time
	toTime       time.Time
	stampRepo    IStampRepo
}

func NewStampService(employmentId EmploymentID, stampRepo IStampRepo) (*StampService, error) {
	return &StampService{
		employmentId: employmentId,
		stampRepo:    stampRepo,
	}, nil
}

func (ss *StampService) GetYearReport(year time.Time) (*YearReport, error) {
	nextYear := year.AddDate(1, 0, 0)
	stamps, err := ss.stampRepo.List(&StampQuery{
		EmploymentId: &ss.employmentId,
		FromTime:     &year,
		ToTime:       &nextYear,
	})
	if err != nil {
		return nil, err
	}
	report := make(map[time.Month]*WorkReport)
	for month := time.Month(1); month <= 12; month++ {
		fromTime := time.Date(year.Year(), month, 1, 0, 0, 0, 0, time.UTC)
		toTime := fromTime.AddDate(0, 1, 0)
		stamps := ss.filterStamps(stamps, fromTime, toTime)
		report[month] = NewWorkReport(ss.employmentId, fromTime, toTime, stamps, ss.stampRepo)
	}

	return &YearReport{
		employmentId: ss.employmentId,
		year:         year,
		report:       report,
	}, nil
}

func (ss *StampService) filterStamps(stamps []*Stamp, fromTime, toTime time.Time) []*Stamp {
	var result []*Stamp
	for _, stamp := range stamps {
		if stamp.StampedAt.After(fromTime) && stamp.StampedAt.Before(toTime) {
			result = append(stamps, stamp)
		}
	}
	return result
}

type errInvalidTimeRange struct{}

func (e errInvalidTimeRange) Error() string {
	return "invalid time range"
}
