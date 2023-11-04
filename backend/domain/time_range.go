package domain

import "time"

type TimeRange struct {
	FromTime time.Time
	ToTime   time.Time
}

func NewTimeRange(fromTime, toTime time.Time) (*TimeRange, error) {
	if fromTime.After(toTime) {
		return nil, errInvalidTimeRange{}
	}
	return &TimeRange{
		FromTime: fromTime,
		ToTime:   toTime,
	}, nil
}

type errInvalidTimeRange struct{}

func (e errInvalidTimeRange) Error() string {
	return "invalid time range"
}
