package registry

import (
	"kintai_backend/db"
	"kintai_backend/domain/repository"
	"kintai_backend/use_case"
)

type IRegistry interface {
	TodoUseCase() use_case.ITodoUseCase
	TodoRepo() repository.ITodoRepo
	WorkerUseCase() use_case.IWorkerUseCase
	WorkerRepo() repository.IWorkerRepo
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

func (r *registry) WorkerRepo() repository.IWorkerRepo {
	return db.NewWorkerRepo(r.db)
}

func (r *registry) WorkerUseCase() use_case.IWorkerUseCase {
	return use_case.NewWorkerUseCase(r.WorkerRepo())
}