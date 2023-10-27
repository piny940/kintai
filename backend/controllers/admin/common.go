package controllers_admin

import (
	"fmt"
	"kintai_backend/auth"
	"kintai_backend/controllers"
	"kintai_backend/domain"
	"kintai_backend/registry"

	"github.com/labstack/echo/v4"
)

func authenticate(ctx echo.Context) (*domain.Worker, *domain.Company, error) {
	registry := registry.GetRegistry()
	worker, err := auth.CurrentWorker(ctx)
	if err != nil {
		return nil, nil, err
	}
	company, err := controllers.GetCompany(ctx)
	if err != nil {
		return nil, nil, err
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return nil, nil, err
	}
	fmt.Println(employment)
	fmt.Println(employment.Kind)
	fmt.Println(domain.EmploymentAdmin)
	if employment.Kind != domain.EmploymentAdmin {
		return nil, nil, echo.NewHTTPError(403, "権限がありません")
	}
	return worker, company, nil
}
