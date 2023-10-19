package db

import "kintai_backend/domain"

type companyRepo struct {
	db *DB
}

func NewCompanyRepo(db *DB) *companyRepo {
	return &companyRepo{db: db}
}

func (r *companyRepo) FindById(workerId domain.WorkerID, companyId domain.CompanyID) (*domain.Company, error) {
	var company domain.Company
	if err := r.db.Client.QueryRow(
		"select * from companies where id = $1 and worker_id = $2",
		companyId,
		workerId,
	).Scan(
		&company.ID,
		&company.Name,
		&company.CreatedAt,
		&company.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &company, nil
}
