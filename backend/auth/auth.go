package auth

import (
	"kintai_backend/domain"
	"kintai_backend/registry"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)

const SESSION_NAME = "kintai_backend"

var (
	key   = []byte(os.Getenv("SESSION_SECRET"))
	store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))
)

var sessionsOptions = &sessions.Options{
	HttpOnly: true,
	Secure:   true,
	MaxAge:   86400 * 7,
}

type authorizationError struct{}

func (e authorizationError) Error() string {
	return "ログインしてください"
}

func setSession(c echo.Context, key string, value interface{}) error {
	session, _ := store.Get(c.Request(), SESSION_NAME)
	session.Options = sessionsOptions
	session.Values[key] = value
	return session.Save(c.Request(), c.Response().Writer)
}

func getSession(c echo.Context, key string) (interface{}, error) {
	session, err := store.Get(c.Request(), SESSION_NAME)
	return session.Values[key], err
}

func Login(c echo.Context, worker *domain.Worker) {
	setSession(c, "worker_id", uint(worker.ID))
}

func Logout(c echo.Context) {
	setSession(c, "worker_id", nil)
}
func CurrentWorkerId(c echo.Context) (*domain.WorkerID, error) {
	workerId, err := getSession(c, "worker_id")
	if err != nil || workerId == nil {
		return nil, authorizationError{}
	}
	domainWorkerId := domain.WorkerID(workerId.(uint))
	return &domainWorkerId, nil
}
func CurrentWorker(c echo.Context) (*domain.Worker, error) {
	registry := registry.GetRegistry()
	workerId, err := CurrentWorkerId(c)
	if err != nil {
		return nil, authorizationError{}
	}
	worker, err := registry.WorkerRepo().FindById(*workerId)
	if err != nil {
		return nil, authorizationError{}
	}
	if worker == nil {
		return nil, authorizationError{}
	}
	return worker, nil
}
