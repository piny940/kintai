package model

import "kintai_backend/domain"

func NewMonthReport(monthReport *domain.MonthReport) (*MonthReport, error) {
	reportMap, err := NewDateWorkReportMap(monthReport.Report)
	if err != nil {
		return nil, err
	}
	return &MonthReport{
		EmploymentID: uint(monthReport.EmploymentId),
		Month:        monthReport.Month,
		WorkReports:  reportMap,
	}, nil
}

func NewDateWorkReportMap(report domain.DateWorkReportMap) ([]*DateWorkReportMap, error) {
	result := make([]*DateWorkReportMap, len(report))
	for date, workReport := range report {
		report, err := NewWorkReport(workReport)
		if err != nil {
			return nil, err
		}
		result[date-1] = &DateWorkReportMap{Key: date, Value: report}
	}
	return result, nil
}
