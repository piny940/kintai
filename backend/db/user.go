package db

import (
	"kintai_backend/domain"
	"time"
)

type userRepo struct {
	db *DB
}

func NewUserRepo(db *DB) *userRepo {
	return &userRepo{db: db}
}

type UserTable struct {
	ID                uint      `json:"id"`
	Email             string    `json:"email"`
	EncryptedPassword string    `json:"-"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

func (u *userRepo) FindByEmail(email domain.UserEmail) (*domain.User, error) {
	var userTable UserTable
	if err := u.db.Client.QueryRow(
		"select * from users where email = $1",
		email,
	).Scan(
		&userTable.ID,
		&userTable.Email,
		&userTable.EncryptedPassword,
		&userTable.CreatedAt,
		&userTable.UpdatedAt,
	); err != nil {
		return nil, err
	}

	return userTable.toDomain(), nil
}

func (u *userRepo) List() ([]*domain.User, error) {
	var users = make([]*domain.User, 0)
	rows, err := u.db.Client.Query("select * from users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userTable UserTable
		if err := rows.Scan(
			&userTable.ID,
			&userTable.Email,
			&userTable.EncryptedPassword,
			&userTable.CreatedAt,
			&userTable.UpdatedAt,
		); err != nil {
			return nil, err
		}

		users = append(users, userTable.toDomain())
	}

	return users, nil
}

func (u *userRepo) Create(email domain.UserEmail, password domain.UserHashedPassword) (*domain.User, error) {
	var userTable UserTable
	if err := u.db.Client.QueryRow(
		"insert into users (email, password) values ($1, $2) returning *",
		email,
		password,
	).Scan(
		&userTable.ID,
		&userTable.Email,
		&userTable.EncryptedPassword,
		&userTable.CreatedAt,
		&userTable.UpdatedAt,
	); err != nil {
		return nil, err
	}

	return userTable.toDomain(), nil
}

func (userTable *UserTable) toDomain() *domain.User {
	password := domain.UserPassword{
		HashedPassword: domain.UserHashedPassword(userTable.EncryptedPassword),
	}
	user := domain.User{
		ID:        domain.UserID(userTable.ID),
		Email:     domain.UserEmail(userTable.Email),
		Password:  password,
		CreatedAt: userTable.CreatedAt,
		UpdatedAt: userTable.UpdatedAt,
	}
	return &user
}
