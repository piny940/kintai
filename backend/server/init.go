package server

import (
	"kintai_backend/config"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4/middleware"
)

func Init() error {
	c := config.GetConfig()
	echo, err := NewRouter()
	if err != nil {
		return err
	}
	echo.Use(middleware.Logger())
	echo.Use(middleware.Recover())
	echo.Use(session.Middleware(
		sessions.NewCookieStore(
			[]byte(os.Getenv("SESSION_SECRET")),
		),
	))

	echo.Logger.Fatal(echo.Start(":" + c.GetString("server.port")))
	return nil
}
