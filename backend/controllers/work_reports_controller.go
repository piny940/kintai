package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type workReportsController struct {
}

func NewWorkReportsController() *workReportsController {
	return &workReportsController{}
}

func (wc *workReportsController) List(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}
	company_id, err := strconv.Atoi(c.Param("company_id"))
	if err != nil {
		return render400(c, "company_idが適切ではありません", err)
	}
	company, err := registry.CompanyRepo().FindById(worker.ID, domain.CompanyID(company_id))
	if err != nil {
		return render400(c, "会社の取得に失敗しました", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return render400(c, "会社に属していません", err)
	}
	since, err := time.Parse("2006-01", c.QueryParam("since"))
	if err != nil {
		return render400(c, "sinceが適切ではありません", err)
	}
	until, err := time.Parse("2006-01", c.QueryParam("until"))
	if err != nil {
		return render400(c, "untilが適切ではありません", err)
	}
	workReports, err := registry.WorkReportUseCase().List(since, until, employment.ID)
	if err != nil {
		return render400(c, "勤怠の取得に失敗しました", err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"work_reports": workReports,
	})
}

func strMonthToTime(yearMonth string) (time.Time, error) {
	return time.Parse("2006-01", yearMonth)
}
