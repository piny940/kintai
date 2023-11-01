package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"

	"github.com/labstack/echo/v4"
)

type desiredShiftsController struct{}

func NewDesiredShiftsController() *desiredShiftsController {
	return &desiredShiftsController{}
}

func (c *desiredShiftsController) Index(ctx echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(ctx)
	if err != nil {
		return Render400(ctx, "ログインしてください", err)
	}
	company, err := GetCompany(ctx)
	if err != nil {
		return Render400(ctx, "company_idが適切ではありません", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return Render400(ctx, "会社に属していません", err)
	}
	query := domain.DesiredShiftQuery{
		EmploymentID: &employment.ID,
	}
	fromTime, err := ToTime(ctx.QueryParam("from_time"))
	if err == nil {
		query.FromTime = &fromTime
	}
	toTime, err := ToTime(ctx.QueryParam("to_time"))
	if err == nil {
		query.ToTime = &toTime
	}
	desiredShifts, err := registry.DesiredShiftRepo().List(query)
	if err != nil {
		return Render400(ctx, "希望シフトの取得に失敗しました", err)
	}

	return ctx.JSON(200, echo.Map{
		"desired_shifts": desiredShifts,
	})
}

func (c *desiredShiftsController) Create(ctx echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(ctx)
	if err != nil {
		return Render400(ctx, "ログインしてください", err)
	}
	company, err := GetCompany(ctx)
	if err != nil {
		return Render400(ctx, "company_idが適切ではありません", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return Render400(ctx, "会社に属していません", err)
	}
	since, err := ToTime(ctx.FormValue("since"))
	if err != nil {
		return Render400(ctx, "sinceが適切ではありません", err)
	}
	till, err := ToTime(ctx.FormValue("till"))
	if err != nil {
		return Render400(ctx, "itillが適切ではありません", err)
	}
	desiredShift, err := registry.DesiredShiftUseCase().Create(employment.ID, since, till)
	if err != nil {
		return Render400(ctx, "希望シフトの作成に失敗しました", err)
	}

	return ctx.JSON(200, echo.Map{
		"desired_shift": desiredShift,
	})
}
