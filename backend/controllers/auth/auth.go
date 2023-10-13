package auth

import (
	"fmt"
	"kintai_backend/domain"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

var sessionsOptions = &sessions.Options{
	Path:     "/",
	HttpOnly: true,
}

func setSession(c echo.Context, key string, value interface{}) {
	session, _ := session.Get("session", c)
	session.Options = sessionsOptions
	session.Values[key] = value
	session.Save(c.Request(), c.Response())
}

func getSession(c echo.Context, key string) (interface{}, error) {
	session, err := session.Get("session", c)
	if err != nil {
		return nil, err
	}
	return session.Values[key], nil
}

func Login(c echo.Context, worker *domain.Worker) {
	setSession(c, "worker", *worker)
}

func Logout(c echo.Context) {
	setSession(c, "worker", nil)
}

func CurrentWorker(c echo.Context) (*domain.Worker, error) {
	fmt.Println("before get session")
	worker, err := getSession(c, "worker")
	if err != nil || worker == nil {
		return nil, echo.ErrUnauthorized
	}
	u := worker.(domain.Worker)
	return &u, nil
}
