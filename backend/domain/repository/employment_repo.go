package repository

import "kintai_backend/domain"

type IEmploymentRepo interface {
	Find(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Employment, error)
}
