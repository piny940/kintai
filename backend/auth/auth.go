package auth

import (
	"fmt"
	"kintai_backend/domain"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
)

const SESSION_NAME = "kintai_backend"

var (
	key = []byte(os.Getenv("SESSION_SECRET"))
	// store = sessions.NewCookieStore(key)
	store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
)

var sessionsOptions = &sessions.Options{
	Domain:   "localhost",
	Path:     "/",
	HttpOnly: true,
	Secure:   false,
	MaxAge:   86400 * 7,
}

func setSession(c echo.Context, key string, value interface{}) {
	// session, _ := store.Get(c.Request(), SESSION_NAME)
	// session.Options = sessionsOptions
	// fmt.Println("set session")
	// session.Values[key] = value
	// session.Values["test"] = "test"
	// cookie := &http.Cookie{
	// 	Name: "token",
	// 	// 認証用のトークン。jwt入れることも多いと思います
	// 	Value: "example_token_value",
	// }
	// // サーバからブラウザにCookieを渡す処理
	// http.SetCookie(c.Response().Writer, cookie)
	// session.Save(c.Request(), c.Response())
	// store.Save(c.Request(), c.Response(), session)
	// Get a session. We're ignoring the error resulted from decoding an
	// existing session: Get() always returns a session, even if empty.
	session, _ := store.Get(c.Request(), "session-name")
	// Set some session values.
	session.Values["foo"] = "bar"
	session.Values[42] = 43
	// Save it before we write to the response/return from the handler.
	err := session.Save(c.Request(), c.Response().Writer)
	if err != nil {
		http.Error(c.Response().Writer, err.Error(), http.StatusInternalServerError)
		return
	}
}

func getSession(c echo.Context, key string) (interface{}, error) {
	session, _ := store.Get(c.Request(), "session-name")
	fmt.Println(session.Values["test"], "get session test")
	fmt.Println(session.Values, "session values")
	fmt.Println(session.Values["foo"], "foo")
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
