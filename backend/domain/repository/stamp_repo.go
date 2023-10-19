package repository

import "kintai_backend/domain"

type IStampRepo interface {
	Create(stamp *domain.Stamp) (*domain.Stamp, error)
}
