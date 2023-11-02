package resolver

import (
	"context"
	"fmt"
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"

	"github.com/labstack/echo/v4"
)

func echoContextFromContext(ctx context.Context) (echo.Context, error) {
	echoContext := ctx.Value("echoContext")
	if echoContext == nil {
		err := fmt.Errorf("could not retrieve echo.Context")
		return nil, err
	}

	ec, ok := echoContext.(echo.Context)
	if !ok {
		err := fmt.Errorf("echo.Context has wrong type")
		return nil, err
	}
	return ec, nil
}

func newError(err error, message string) error {
	fmt.Println(err)
	return fmt.Errorf(message)
}

func currentWorker(ctx context.Context) (*domain.Worker, error) {
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	worker, err := auth.CurrentWorker(echoCtx)
	if err != nil {
		return nil, newError(err, "ログインしてください")
	}
	return worker, nil
}
func GetCompany(ctx context.Context, id uint) (*domain.Company, error) {
	registry := registry.GetRegistry()
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	worker, err := auth.CurrentWorker(echoCtx)
	if err != nil {
		return nil, err
	}
	company, err := registry.CompanyRepo().FindById(worker.ID, domain.CompanyID(id))
	if err != nil {
		return nil, err
	}
	return company, nil
}
