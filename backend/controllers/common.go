package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func render400(ctx echo.Context, message string, err error) error {
	if err != nil {
		fmt.Println(err)
	}
	return ctx.JSON(http.StatusBadRequest, echo.Map{
		"message": message,
	})
}
