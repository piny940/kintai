package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func render400(ctx echo.Context, message string) error {
	return ctx.JSON(http.StatusBadRequest, echo.Map{
		"message": message,
	})
}
