package controllers_admin

import "github.com/labstack/echo/v4"

type desiredShiftsController struct{}

func NewDesiredShiftsController() *desiredShiftsController {
	return &desiredShiftsController{}
}

func (u *desiredShiftsController) Index(c echo.Context) error {

}
