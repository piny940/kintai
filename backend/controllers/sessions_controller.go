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

	user, err := registry.UserRepo().FindByEmail(domain.UserEmail(email))
	if err != nil {
		return render400(ctx, "メールアドレスまたはパスワードが間違っています")
	}
	if !user.Password.Check(domain.UserRawPassword(password)) {
		return render400(ctx, "メールアドレスまたはパスワードが間違っています")
	}
	auth.Login(ctx, user)
	return ctx.JSON(200, echo.Map{
		"message": "ログインしました",
		"user":    user,
	})
}
