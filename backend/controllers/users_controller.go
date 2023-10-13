package controllers

import (
	"kintai_backend/controllers/auth"
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"

	"github.com/labstack/echo/v4"
)

type usersController struct{}

func NewUsersController() *usersController {
	return &usersController{}
}

func (u *usersController) Show(c echo.Context) error {
	user, err := auth.CurrentUser(c)
	if err != nil {
		render400(c, "ログインしてください")
	}
	return c.JSON(http.StatusOK, echo.Map{
		"user": user,
	})
}

func (u *usersController) Create(c echo.Context) error {
	registry := registry.GetRegistry()
	email := c.FormValue("email")
	password := c.FormValue("password")
	user, err := registry.UserUseCase().SignUp(
		domain.UserEmail(email), domain.UserRawPassword(password),
	)
	if err != nil {
		return err
	}
	auth.Login(c, user)
	return c.JSON(http.StatusOK, echo.Map{
		"user": user,
	})
}
