package controllers

import (
	"fmt"
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func render400(ctx echo.Context, message string, err error) error {
	if err != nil {
		fmt.Println(err)
	}
	return ctx.JSON(http.StatusBadRequest, echo.Map{
		"message": message,
	})
}

func getCompany(ctx echo.Context) (*domain.Company, error) {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(ctx)
	if err != nil {
		return nil, err
	}
	company_id, err := strconv.Atoi(ctx.Param("company_id"))
	if err != nil {
		return nil, err
	}
	company, err := registry.CompanyRepo().FindById(worker.ID, domain.CompanyID(company_id))
	if err != nil {
		return nil, err
	}
	return company, nil
}
