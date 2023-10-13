package controllers

import (
	"kintai_backend/controllers/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"

	"github.com/labstack/echo/v4"
)

type sessionsController struct{}

func NewSessionsController() *sessionsController {
	return &sessionsController{}
}

func (c *sessionsController) Create(ctx echo.Context) error {
	registry := registry.GetRegistry()
	email := ctx.FormValue("email")
	password := ctx.FormValue("password")

	worker, err := registry.WorkerRepo().FindByEmail(domain.WorkerEmail(email))
	if err != nil {
		return render400(ctx, "メールアドレスまたはパスワードが間違っています")
	}
	if !worker.Password.Check(domain.WorkerRawPassword(password)) {
		return render400(ctx, "メールアドレスまたはパスワードが間違っています")
	}
	auth.Login(ctx, worker)
	return ctx.JSON(200, echo.Map{
		"message": "ログインしました",
		"worker":  worker,
	})
}
