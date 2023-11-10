package domain

import "time"

type TimeRange struct {
	since time.Time
	till  time.Time
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
		since: since,
		till:  till,
	}, nil
}
func isRangeValid(since time.Time, till time.Time) bool {
	return since.Before(till)
}

func (t *TimeRange) Since() time.Time {
	return t.since
}
func (t *TimeRange) Till() time.Time {
	return t.till
}
