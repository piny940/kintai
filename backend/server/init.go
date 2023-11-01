package server

import (
	"kintai_backend/config"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() error {
	c := config.GetConfig()
	e := echo.New()
	// echo, err := NewRouter()
	// if err != nil {
	// 	return err
	// }
	
	e.Use(EchoContextToContextMiddleware)
	e.POST("/query", graphqlHandler())
	e.GET("/", playgroundHandler())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"http://localhost:3001",
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
		},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Logger.Fatal(e.Start(":" + c.GetString("server.port")))
	return nil
}
