package server

import (
	"context"
	"kintai_backend/graph"
	"kintai_backend/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
)

func graphqlHandler() echo.HandlerFunc {
	graphql := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{
				Resolvers: &graph.Resolver{},
			},
		),
	)
	
	return func(c echo.Context) error {
		graphql.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
func playgroundHandler() echo.HandlerFunc {
	handler := playground.Handler("GraphQL playground", "/query")

	return func(c echo.Context) error {
		handler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
func EchoContextToContextMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.WithValue(c.Request().Context(), "echoContext", c)
		c.SetRequest(c.Request().WithContext(ctx))
		return next(c)
	}
}
