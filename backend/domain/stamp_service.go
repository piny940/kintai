package domain

import (
	"sort"
	"time"
)

type StampService struct {
	employmentId EmploymentID
	fromTime     time.Time
	toTime       time.Time
	stampRepo    IStampRepo
}

func NewStampService(employmentId EmploymentID, stampRepo IStampRepo) *StampService {
	return &StampService{
		employmentId: employmentId,
		stampRepo:    stampRepo,
	}
}

func (ss *StampService) GetYearReport(year time.Time) (*YearReport, error) {
	year = time.Date(year.Year(), 1, 1, 0, 0, 0, 0, time.Local)
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
		fromTime := time.Date(year.Year(), month, 1, 0, 0, 0, 0, time.Local)
		toTime := fromTime.AddDate(0, 1, 0)
		filteredStamps := ss.sortStamps(ss.filterStamps(stamps, fromTime, toTime))
		report[month] = NewWorkReport(ss.employmentId, fromTime, toTime, filteredStamps, ss.stampRepo)
	}

	return &YearReport{
		EmploymentId: ss.employmentId,
		Year:         year,
		Report:       report,
	}, nil
}

func (ss *StampService) filterStamps(stamps []*Stamp, fromTime, toTime time.Time) []*Stamp {
	var result []*Stamp
	for _, stamp := range stamps {
		if stamp.StampedAt.After(fromTime) && stamp.StampedAt.Before(toTime) {
			result = append(result, stamp)
		}
	}
	return result
}
func (ss *StampService) sortStamps(stamps []*Stamp) []*Stamp {
	result := make([]*Stamp, len(stamps))
	copy(result, stamps)
	sort.SliceStable(result, func(i, j int) bool {
		return stamps[i].StampedAt.Before(stamps[j].StampedAt)
	})
	return result
}

type errInvalidTimeRange struct{}

func (e errInvalidTimeRange) Error() string {
	return "invalid time range"
}
