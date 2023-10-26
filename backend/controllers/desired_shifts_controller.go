package controllers

import (
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
	desiredShifts, err := registry.DesiredShiftRepo().List(employment.ID)
	if err != nil {
		return render400(ctx, "会社に属していません", err)
	}
	return ctx.JSON(200, echo.Map{
		"desired_shifts": desiredShifts,
	})
}
