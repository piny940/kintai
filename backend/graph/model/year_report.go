package model

import (
	"kintai_backend/domain"
)

func NewYearReport(yearReport *domain.YearReport) *YearReport {
	return &YearReport{
		EmploymentID: uint(yearReport.EmploymentId),
		Year:         yearReport.Year,
		WorkReports:  newMonthWorkReportMap(yearReport.Report),
	}
}

func newMonthWorkReportMap(report domain.MonthWorkReportMap) []*MonthWorkReportMap {
	result := make([]*MonthWorkReportMap, len(report))
	for month, workReport := range report {
		result[month] = &MonthWorkReportMap{Key: int(month), Value: NewWorkReport(workReport)}
	}
	return result
}
