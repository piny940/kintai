package server

import (
	"kintai_backend/config"
	"kintai_backend/controllers"
	controllers_admin "kintai_backend/controllers/admin"

	"github.com/labstack/echo/v4"
)

func NewRouter() (*echo.Echo, error) {
	c := config.GetConfig()
	router := echo.New()

	version := router.Group("/" + c.GetString("server.version"))

	homesController := controllers.NewHomesController()
	version.GET("", homesController.Index)
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
		session := version.Group("/session")
		sessionsController := controllers.NewSessionsController()
		session.POST("", sessionsController.Create)
		session.DELETE("", sessionsController.Destroy)
	}
	{
		member := version.Group("/member")
		{
			companies := member.Group("/companies")
			companiesController := controllers.NewCompaniesController()
			companies.GET("", companiesController.Index)
			companies.GET("/:company_id", companiesController.Show)

			{
				stamps := companies.Group("/:company_id/stamps")
				stampsController := controllers.NewStampsController()
				stamps.GET("", stampsController.Index)
				stamps.POST("/now", stampsController.CreateNow)
			}
			{
				workReports := companies.Group("/:company_id/work_reports")
				workReportsController := controllers.NewWorkReportsController()
				workReports.GET("", workReportsController.List)
			}
			{
				workStatus := companies.Group("/:company_id/work_status")
				workStatusController := controllers.NewWorkStatusController()
				workStatus.GET("", workStatusController.Show)
			}
			{
				desiredShifts := companies.Group("/:company_id/desired_shifts")
				desiredShiftsController := controllers.NewDesiredShiftsController()
				desiredShifts.GET("", desiredShiftsController.Index)
				desiredShifts.POST("", desiredShiftsController.Create)
			}
		}
	}
	{
		admin := version.Group("/admin/companies/:company_id")
		{
			desiredShifts := admin.Group("/desired_shifts")
			desiredShiftsController := controllers_admin.NewDesiredShiftsController()
			desiredShifts.GET("", desiredShiftsController.Index)
		}
	}

	return router, nil
}
