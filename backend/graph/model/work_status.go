package model

import "kintai_backend/domain"

func NewWorkStatus(workStatus domain.WorkStatus) WorkStatus {
	return mapWorkStatus[workStatus]
}

var mapWorkStatus = map[domain.WorkStatus]WorkStatus{
	domain.WorkStatusWorking: WorkStatusWorking,
	domain.WorkStatusLeft:    WorkStatusLeft,
}
