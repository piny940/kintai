package model

import "kintai_backend/domain"

func NewWorkReport(workReport *domain.WorkReport) *WorkReport {
	return &WorkReport{
		Stamps: NewStamps(workReport.GetStamps()),
	}
}
