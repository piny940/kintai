package model

import "kintai_backend/domain"

func NewWorkReport(workReport *domain.WorkReport) (*WorkReport, error) {
	workTime, err := workReport.GetWorkTime()
	if err != nil {
		return nil, err
	}
	return &WorkReport{
		Stamps:   NewStamps(workReport.GetStamps()),
		WorkTime: int(workTime),
	}, nil
}
