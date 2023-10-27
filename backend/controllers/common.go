package controllers

import (
	"fmt"
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func Render400(ctx echo.Context, message string, err error) error {
	if err != nil {
		fmt.Println(err)
	}
	return ctx.JSON(http.StatusBadRequest, echo.Map{
		"message": message,
	})
}

func GetCompany(ctx echo.Context) (*domain.Company, error) {
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
func ToTime(s string) (time.Time, error) {
	t, err := time.Parse("2006-01-02T15:04:05Z", s)
	if err != nil {
		return time.Time{}, err
	}
	return t.In(time.Local), nil
}
