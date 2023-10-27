package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type stampsController struct {
}

func NewStampsController() *stampsController {
	return &stampsController{}
}

func (sc *stampsController) Index(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}
	company_id, err := strconv.Atoi(c.Param("company_id"))
	if err != nil {
		return Render400(c, "company_idが適切ではありません", err)
	}
	company, err := registry.CompanyRepo().FindById(worker.ID, domain.CompanyID(company_id))
	if err != nil {
		return Render400(c, "会社の取得に失敗しました", err)
	}
	stamps, err := registry.StampRepo().List(worker.ID, company.ID)
	if err != nil {
		return Render400(c, "打刻の取得に失敗しました", err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"stamps": stamps,
	})
}

func (sc *stampsController) CreateNow(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}
	company_id, err := strconv.Atoi(c.Param("company_id"))
	if err != nil {
		return Render400(c, "company_idが適切ではありません", err)
	}
	company, err := registry.CompanyRepo().FindById(worker.ID, domain.CompanyID(company_id))
	if err != nil {
		return Render400(c, "会社の取得に失敗しました", err)
	}
	stamp, err := registry.StampUseCase().PushStamp(company.ID, worker.ID)
	if err != nil {
		return Render400(c, "打刻に失敗しました", err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"stamp": stamp,
	})
}
