package registry

import (
	"kintai_backend/db"
	"kintai_backend/domain/repository"
	"kintai_backend/use_case"
)

type IRegistry interface {
	TodoUseCase() use_case.ITodoUseCase
	TodoRepo() repository.ITodoRepo
	UserUseCase() use_case.IUserUseCase
	UserRepo() repository.IUserRepo
}

type registry struct {
	db *db.DB
}

var reg IRegistry

func Init(db *db.DB) {
	reg = &registry{db: db}
}

func GetRegistry() IRegistry {
	return reg
}

func (r *registry) TodoRepo() repository.ITodoRepo {
	return db.NewTodoRepo(r.db)
}

func (r *registry) TodoUseCase() use_case.ITodoUseCase {
	return use_case.NewTodoUseCase(r.TodoRepo())
}

func (r *registry) UserRepo() repository.IUserRepo {
	return db.NewUserRepo(r.db)
}

func (r *registry) UserUseCase() use_case.IUserUseCase {
	return use_case.NewUserUseCase(r.UserRepo())
}
