package db

import "kintai_backend/domain"

type employmentRepo struct {
	db *DB
}

func NewEmploymentRepo(db *DB) *employmentRepo {
	return &employmentRepo{db: db}
}

func (r *employmentRepo) Find(companyId domain.CompanyID, workerId domain.WorkerID) (*domain.Employment, error) {
	var employment domain.Employment
	if err := r.db.Client.QueryRow(
		"select * from employments where company_id = $1 and worker_id = $2",
		companyId,
		workerId,
	).Scan(
		&employment.ID,
		&employment.Kind,
		&employment.Status,
		&employment.CompanyID,
		&employment.WorkerID,
		&employment.CreatedAt,
		&employment.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &employment, nil
}
