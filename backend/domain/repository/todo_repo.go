package repository

import "kintai_backend/domain"

type ITodoRepo interface {
	List() ([]*domain.Todo, error)
	Create(title domain.TodoTitle, status domain.TodoStatus) (*domain.Todo, error)
	Update(id domain.TodoID, title domain.TodoTitle, status domain.TodoStatus) (*domain.Todo, error)
	FindById(id domain.TodoID) (*domain.Todo, error)
}
