package domain

import "golang.org/x/crypto/bcrypt"

type UserRawPassword string
type UserHashedPassword string

type UserPassword struct {
	HashedPassword UserHashedPassword
}

func NewUserPassword(rawPassword UserRawPassword) (*UserPassword, error) {
	hash, err := encryptPassword(string(rawPassword))
	if err != nil {
		return nil, err
	}
	hashedPassword := UserHashedPassword(string(hash))
	return &UserPassword{HashedPassword: hashedPassword}, nil
}

func (p *UserPassword) Check(rawPassword UserRawPassword) bool {
	return comparePassword(string(p.HashedPassword), string(rawPassword))
}

func encryptPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func comparePassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
