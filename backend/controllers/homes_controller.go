package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type homesController struct{}

func NewHomesController() *homesController {
	return &homesController{}
}

func (h *homesController) Index(c echo.Context) error {
	return c.JSON(http.StatusOK, "Hello World")
}
