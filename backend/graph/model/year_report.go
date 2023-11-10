package model

import (
	"kintai_backend/domain"
)

func NewYearReport(yearReport *domain.YearReport) (*YearReport, error) {
	reportsMap, err := newMonthWorkReportMap(yearReport.Report)
	if err != nil {
		return nil, err
	}
	return &YearReport{
		EmploymentID: uint(yearReport.EmploymentId),
		Year:         yearReport.Year,
		WorkReports:  reportsMap,
	}, nil
}

func newMonthWorkReportMap(report domain.MonthWorkReportMap) ([]*MonthWorkReportMap, error) {
	result := make([]*MonthWorkReportMap, len(report))
	for month, workReport := range report {
		report, err := NewWorkReport(workReport)
		if err != nil {
			return nil, err
		}
		result[month-1] = &MonthWorkReportMap{Key: int(month), Value: report}
	}
	return result, nil
}
