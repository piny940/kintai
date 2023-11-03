package db

import (
	"fmt"
	"kintai_backend/domain"
	"strings"
)

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
		&employment.WorkerID,
		&employment.CompanyID,
		&employment.CreatedAt,
		&employment.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &employment, nil
}

func (r *employmentRepo) FindById(employmentId domain.EmploymentID) (*domain.Employment, error) {
	var employment domain.Employment
	if err := r.db.Client.QueryRow(
		"select * from employments where id = $1",
		employmentId,
	).Scan(
		&employment.ID,
		&employment.Kind,
		&employment.Status,
		&employment.WorkerID,
		&employment.CompanyID,
		&employment.CreatedAt,
		&employment.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &employment, nil
}

func (r *employmentRepo) FindAllByIds(employmentIds []domain.EmploymentID) ([]*domain.Employment, error) {
	var employments []*domain.Employment
	args := make([]interface{}, len(employmentIds))
	strParam := make([]string, len(employmentIds))
	for i := range employmentIds {
		args[i] = employmentIds[i]
		strParam[i] = fmt.Sprintf("$%d", i+1)
	}
	rows, err := r.db.Client.Query(
		fmt.Sprintf("select * from employments where id in (%s)", strings.Join(strParam, ", ")),
		args...,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var employment domain.Employment
		if err := rows.Scan(
			&employment.ID,
			&employment.Kind,
			&employment.Status,
			&employment.WorkerID,
			&employment.CompanyID,
			&employment.CreatedAt,
			&employment.UpdatedAt,
		); err != nil {
			return nil, err
		}
		employments = append(employments, &employment)
	}
	return employments, nil
}
