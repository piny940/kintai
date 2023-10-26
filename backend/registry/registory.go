package registry

import (
	"kintai_backend/db"
	"kintai_backend/domain"
	"kintai_backend/use_case"
)

type IRegistry interface {
	TodoUseCase() use_case.ITodoUseCase
	TodoRepo() domain.ITodoRepo
	WorkerUseCase() use_case.IWorkerUseCase
	WorkerRepo() domain.IWorkerRepo
	StampUseCase() use_case.IStampUseCase
	StampRepo() domain.IStampRepo
	EmploymentRepo() domain.IEmploymentRepo
	CompanyRepo() domain.ICompanyRepo
	WorkReportRepo() domain.IWorkReportRepo
	WorkReportUseCase() use_case.IWorkReportUseCase
	WorkStatusUseCase() use_case.IWorkStatusUseCase
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

func (r *registry) TodoRepo() domain.ITodoRepo {
	return db.NewTodoRepo(r.db)
}

func (r *registry) TodoUseCase() use_case.ITodoUseCase {
	return use_case.NewTodoUseCase(r.TodoRepo())
}

func (r *registry) WorkerRepo() domain.IWorkerRepo {
	return db.NewWorkerRepo(r.db)
}

func (r *registry) WorkerUseCase() use_case.IWorkerUseCase {
	return use_case.NewWorkerUseCase(r.WorkerRepo())
}

func (r *registry) StampRepo() domain.IStampRepo {
	return db.NewStampRepo(r.db)
}

func (r *registry) StampUseCase() use_case.IStampUseCase {
	return use_case.NewStampUseCase(r.StampRepo(), r.EmploymentRepo())
}

func (r *registry) EmploymentRepo() domain.IEmploymentRepo {
	return db.NewEmploymentRepo(r.db)
}

func (r *registry) CompanyRepo() domain.ICompanyRepo {
	return db.NewCompanyRepo(r.db)
}

func (r *registry) WorkReportRepo() domain.IWorkReportRepo {
	return db.NewWorkReportRepo(r.db)
}

func (r *registry) WorkReportUseCase() use_case.IWorkReportUseCase {
	return use_case.NewWorkReportUseCase(r.WorkReportRepo(), r.EmploymentRepo())
}

func (r *registry) WorkStatusUseCase() use_case.IWorkStatusUseCase {
	return use_case.NewWorkStatusUseCase(r.WorkReportRepo())
}
