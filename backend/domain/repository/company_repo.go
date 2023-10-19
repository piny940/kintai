package repository

import "kintai_backend/domain"

type ICompanyRepo interface {
	FindById(domain.WorkerID, domain.CompanyID) (*domain.Company, error)
	List(domain.WorkerID) ([]*domain.Company, error)
}
