package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/registry"

	"github.com/labstack/echo/v4"
)

type workStatusController struct{}

func NewWorkStatusController() *workStatusController {
	return &workStatusController{}
}

func (wc *workStatusController) Show(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return Render400(c, "ログインしてください", err)
	}
	company, err := GetCompany(c)
	if err != nil {
		return Render400(c, "会社IDが正しくありません", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return Render400(c, "この会社に属していません", err)
	}
	workStatus, err := registry.WorkStatusUseCase().Show(employment.ID)
	if err != nil {
		return Render400(c, "勤怠情報の取得に失敗しました", err)
	}
	return c.JSON(200, echo.Map{
		"work_status": workStatus,
	})
}
