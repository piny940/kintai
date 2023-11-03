package controllers_admin

import (
	c "kintai_backend/controllers"

	"github.com/labstack/echo/v4"
)

type desiredShiftsController struct{}

func NewDesiredShiftsController() *desiredShiftsController {
	return &desiredShiftsController{}
}

func (u *desiredShiftsController) Index(ctx echo.Context) error {
	_, _, err := authenticate(ctx)
	if err != nil {
		return c.Render400(ctx, "権限がありません。", err)
	}
	// desiredShifts, err := registry.DesiredShiftRepo().ListAll(company.ID)
	if err != nil {
		return c.Render400(ctx, "希望シフトの取得に失敗しました", err)
	}

	return ctx.JSON(200, echo.Map{
		// "desired_shifts": desiredShifts,
	})
}
