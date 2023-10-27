package controllers

import (
	"fmt"
	"kintai_backend/auth"
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
		return render400(ctx, "ログインしてください", err)
	}
	company, err := getCompany(ctx)
	if err != nil {
		return render400(ctx, "company_idが適切ではありません", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return render400(ctx, "会社に属していません", err)
	}
	desiredShifts, err := registry.DesiredShiftRepo().List(employment.ID)
	if err != nil {
		return render400(ctx, "希望シフトの取得に失敗しました", err)
	}

	fmt.Println(desiredShifts[0])
	return ctx.JSON(200, echo.Map{
		"desired_shifts": desiredShifts,
	})
}

func (c *desiredShiftsController) Create(ctx echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(ctx)
	if err != nil {
		return render400(ctx, "ログインしてください", err)
	}
	company, err := getCompany(ctx)
	if err != nil {
		return render400(ctx, "company_idが適切ではありません", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return render400(ctx, "会社に属していません", err)
	}
	since, err := toTime(ctx.FormValue("since"))
	if err != nil {
		return render400(ctx, "sinceが適切ではありません", err)
	}
	till, err := toTime(ctx.FormValue("till"))
	if err != nil {
		return render400(ctx, "itillが適切ではありません", err)
	}
	desiredShift, err := registry.DesiredShiftUseCase().Create(employment.ID, since, till)
	if err != nil {
		return render400(ctx, "希望シフトの作成に失敗しました", err)
	}

	return ctx.JSON(200, echo.Map{
		"desired_shift": desiredShift,
	})
}
