package server

import (
	"kintai_backend/config"

	"github.com/labstack/echo/v4/middleware"
)

func Init() error {
	c := config.GetConfig()
	router, err := NewRouter()
	if err != nil {
		return err
	}
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())

	router.Logger.Fatal(router.Start(":" + c.GetString("server.port")))
	return nil
}
