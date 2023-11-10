package domain

import "time"

type TimeRange struct {
	Since time.Time
	Till  time.Time
}
type errInvalidRange struct{}

func (e *errInvalidRange) Error() string {
	return "invalid range"
}

func NewTimeRange(since time.Time, till time.Time) (*TimeRange, error) {
	if !isRangeValid(since, till) {
		return nil, &errInvalidRange{}
	}
	return &TimeRange{
		Since: since,
		Till:  till,
	}, nil
}
func isRangeValid(since time.Time, till time.Time) bool {
	return since.Before(till)
}
