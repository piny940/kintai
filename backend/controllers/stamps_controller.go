package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/registry"
	"net/http"

	"github.com/labstack/echo/v4"
)

type stampsController struct {
}

func NewStampsController() *stampsController {
	return &stampsController{}
}

func (sc *stampsController) Create(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}
	stamp, err := registry.StampUseCase().Stamp(worker.ID)
	if err != nil {
		return render400(c, "打刻に失敗しました", nil)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"stamp": stamp,
	})
}
