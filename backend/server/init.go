package server

import (
	"kintai_backend/config"

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

	echo.Logger.Fatal(echo.Start(":" + c.GetString("server.port")))
	return nil
}
