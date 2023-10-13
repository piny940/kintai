package auth

import (
	"fmt"
	"kintai_backend/domain"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)

const SESSION_NAME = "kintai_backend"

var (
	key   = []byte(os.Getenv("SESSION_SECRET"))
	store = sessions.NewCookieStore(key)
)

var sessionsOptions = &sessions.Options{
	Path:     "/",
	HttpOnly: true,
}

func setSession(c echo.Context, key string, value interface{}) {
	session, _ := store.Get(c.Request(), SESSION_NAME)
	session.Options = sessionsOptions
	session.Values[key] = value
	session.Values["test"] = "test"
	session.Save(c.Request(), c.Response())
}

func getSession(c echo.Context, key string) (interface{}, error) {
	session, _ := store.Get(c.Request(), SESSION_NAME)
	fmt.Println(session.Values["test"], "get session test")
	fmt.Println(session.Values, "session values")
	return session.Values[key], nil
}

func Login(c echo.Context, worker *domain.Worker) {
	setSession(c, "worker", *worker)
}

func Logout(c echo.Context) {
	setSession(c, "worker", nil)
}

func CurrentWorker(c echo.Context) (*domain.Worker, error) {
	fmt.Println("before get session")
	worker, err := getSession(c, "worker")
	if err != nil || worker == nil {
		return nil, echo.ErrUnauthorized
	}
	u := worker.(domain.Worker)
	return &u, nil
}
