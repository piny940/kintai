package domain

import "time"

type WorkStatus int

const (
	WorkStatusWorking WorkStatus = iota
	WorkStatusLeft
)

func GetWorkStatus(at time.Time, employmentId EmploymentID, stampRepo IStampRepo) (*WorkStatus, error) {
	count, err := stampRepo.Count(&StampQuery{
		EmploymentId: &employmentId,
		ToTime:       &at,
	})
	if err != nil {
		return nil, err
	}
	if count%2 == 0 {
		workStatus := WorkStatusLeft
		return &workStatus, nil
	} else {
		workStatus := WorkStatusWorking
		return &workStatus, nil
	}
}
