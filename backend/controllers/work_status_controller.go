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
		return err
	}

}
