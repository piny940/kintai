package domain

import (
	"time"
)

type UserID uint
type UserEmail string

type User struct {
	ID        UserID       `json:"id"`
	Email     UserEmail    `json:"email"`
	Password  UserPassword `json:"-"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}

func NewUser(email UserEmail, password *UserPassword) (*User, error) {
	return &User{
		Email:    email,
		Password: *password,
	}, nil
}
