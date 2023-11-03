package domain

type WorkStatus int

const (
	WorkStatusWorking WorkStatus = iota
	WorkStatusLeft
)

func GetWorkStatus(employmentId EmploymentID, stampRepo IStampRepo) (*WorkStatus, error) {
	count, err := stampRepo.Count(&StampQuery{
		EmploymentId: &employmentId,
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
