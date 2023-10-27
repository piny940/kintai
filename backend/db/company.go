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
		"select * from companies where id = $1 and id in (select company_id from employments where worker_id = $2)",
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

func (r *companyRepo) List(workerId domain.WorkerID) ([]*domain.Company, error) {
	companies := make([]*domain.Company, 0)
	rows, err := r.db.Client.Query(
		"select * from companies where id in (select company_id from employments where worker_id = $1)",
		workerId,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var company domain.Company
		if err := rows.Scan(
			&company.ID,
			&company.Name,
			&company.CreatedAt,
			&company.UpdatedAt,
		); err != nil {
			return nil, err
		}
		companies = append(companies, &company)
	}
	return companies, nil
}
