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
	WorkerID  WorkerID   `json:"worker_id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}
type ITodoRepo interface {
	List() ([]*Todo, error)
	Create(title TodoTitle, status TodoStatus) (*Todo, error)
	Update(id TodoID, title TodoTitle, status TodoStatus) (*Todo, error)
	FindById(id TodoID) (*Todo, error)
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
