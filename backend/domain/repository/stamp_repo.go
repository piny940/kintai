package repository

import "kintai_backend/domain"

type IStampRepo interface {
	List(workerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Stamp, error)
	Create(stamp *domain.Stamp) (*domain.Stamp, error)
}
