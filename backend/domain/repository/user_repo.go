package repository

import "kintai_backend/domain"

type IUserRepo interface {
	FindByEmail(email domain.UserEmail) (*domain.User, error)
	List() ([]*domain.User, error)
	Create(email domain.UserEmail, password domain.UserHashedPassword) (*domain.User, error)
}
