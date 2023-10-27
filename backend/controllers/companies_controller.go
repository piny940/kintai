package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/registry"
	"net/http"

	"github.com/labstack/echo/v4"
)

type companiesController struct{}

func NewCompaniesController() *companiesController {
	return &companiesController{}
}

func (u *companiesController) Index(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}

	companies, err := registry.CompanyRepo().List(worker.ID)
	if err != nil {
		return render400(c, "会社の取得に失敗しました", err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"companies": companies,
	})
}

func (u *companiesController) Show(c echo.Context) error {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "ログインしてください")
	}

	company, err := getCompany(c)
	if err != nil {
		return render400(c, "会社の取得に失敗しました", err)
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	return c.JSON(http.StatusOK, echo.Map{
		"company":    company,
		"employment": employment,
	})
}
