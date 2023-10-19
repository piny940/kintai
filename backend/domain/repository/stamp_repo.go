package repository

import "kintai_backend/domain"

type IStampRepo interface {
	List(workerId domain.WorkerID) ([]*domain.Stamp, error)
	Create(stamp *domain.Stamp) (*domain.Stamp, error)
}
