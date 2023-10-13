package controllers

import (
	"kintai_backend/domain"
	"kintai_backend/registry"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type todosController struct{}

func NewTodosController() *todosController {
	return &todosController{}
}

func (t *todosController) Index(c echo.Context) error {
	registry := registry.GetRegistry()
	todos, err := registry.TodoUseCase().List()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, echo.Map{
		"todos": todos,
	})
}

func (t *todosController) Complete(c echo.Context) error {
	registry := registry.GetRegistry()
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}
	todo, err := registry.TodoUseCase().Complete(domain.TodoID(id))
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, echo.Map{
		"todo": todo,
	})
}
