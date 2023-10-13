package use_case

import (
	"kintai_backend/domain"
	"kintai_backend/domain/repository"
)

type IUserUseCase interface {
	List() ([]*domain.User, error)
	SignUp(email domain.UserEmail, password domain.UserRawPassword) (*domain.User, error)
}

type userUseCase struct {
	userRepo repository.IUserRepo
}

func NewUserUseCase(userRepo repository.IUserRepo) IUserUseCase {
	return &userUseCase{userRepo: userRepo}
}

func (u *userUseCase) List() ([]*domain.User, error) {
	return u.userRepo.List()
}

func (u *userUseCase) SignUp(email domain.UserEmail, rawPassword domain.UserRawPassword) (*domain.User, error) {
	password, err := domain.NewUserPassword(rawPassword)
	if err != nil {
		return nil, err
	}
	user, err := domain.NewUser(email, password)
	if err != nil {
		return nil, err
	}
	return u.userRepo.Create(user.Email, user.Password.HashedPassword)
}
