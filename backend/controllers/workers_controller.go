package controllers

import (
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"

	"github.com/labstack/echo/v4"
)

type workersController struct{}

func NewWorkersController() *workersController {
	return &workersController{}
}

func (u *workersController) Show(c echo.Context) error {
	worker, err := auth.CurrentWorker(c)
	if err != nil {
		return Render400(c, "ログインしてください", err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"worker": worker,
	})
}

func (u *workersController) Create(c echo.Context) error {
	registry := registry.GetRegistry()
	email := c.FormValue("email")
	password := c.FormValue("password")
	firstName := c.FormValue("first_name")
	lastName := c.FormValue("last_name")
	worker, err := registry.WorkerUseCase().SignUp(
		domain.WorkerEmail(email),
		domain.WorkerRawPassword(password),
		domain.NewWorkerName(firstName, lastName),
	)
	if err != nil {
		return Render400(c, "登録に失敗しました", err)
	}
	auth.Login(c, worker)
	return c.JSON(http.StatusOK, echo.Map{
		"worker": worker,
	})
}
