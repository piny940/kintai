package domain

import "golang.org/x/crypto/bcrypt"

type WorkerRawPassword string
type WorkerHashedPassword string

type WorkerPassword struct {
	HashedPassword WorkerHashedPassword
}

func NewWorkerPassword(rawPassword WorkerRawPassword) (*WorkerPassword, error) {
	hash, err := encryptPassword(string(rawPassword))
	if err != nil {
		return nil, err
	}
	hashedPassword := WorkerHashedPassword(string(hash))
	return &WorkerPassword{HashedPassword: hashedPassword}, nil
}

func (p *WorkerPassword) Check(rawPassword WorkerRawPassword) bool {
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
