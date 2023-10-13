package domain

import "time"

type TodoID uint
type TodoTitle string
type TodoStatus int

const (
	Active TodoStatus = iota
	Completed
)

type Todo struct {
	ID        TodoID     `json:"id"`
	Title     TodoTitle  `json:"title"`
	Status    TodoStatus `json:"status"`
	UserID    UserID     `json:"user_id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

func NewTodo(title TodoTitle) *Todo {
	return &Todo{
		Title:  title,
		Status: Active,
	}
}

func (t *Todo) Complete() {
	t.Status = Completed
}
