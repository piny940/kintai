package server

import (
	"kintai_backend/config"
	"kintai_backend/controllers"

	"github.com/labstack/echo/v4"
)

func NewRouter() (*echo.Echo, error) {
	c := config.GetConfig()
	router := echo.New()

	version := router.Group("/" + c.GetString("server.version"))

	homesController := controllers.NewHomesController()
	version.GET("/", homesController.Index)
	{
		todos := version.Group("/todos")
		todosController := controllers.NewTodosController()
		todos.GET("", todosController.Index)
		todos.POST(":id/complete", todosController.Complete)
	}
	{
		workers := version.Group("/workers")
		workersController := controllers.NewWorkersController()
		workers.GET("/me", workersController.Show)
		workers.POST("/me", workersController.Create)
	}
	{
		sessions := version.Group("/sessions")
		sessionsController := controllers.NewSessionsController()
		sessions.POST("", sessionsController.Create)
	}
	{
		member := version.Group("/member")

		{
			stamps := member.Group("/stamps")
			stampsController := controllers.NewStampsController()
			stamps.POST("", stampsController.Create)
		}
	}

	return router, nil
}
