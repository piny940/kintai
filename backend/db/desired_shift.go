package db

import "kintai_backend/domain"

type desiredShiftRepo struct {
	db *DB
}

func NewDesiredShiftRepo(db *DB) domain.IDesiredShiftRepo {
	return &desiredShiftRepo{db: db}
}

func (r *desiredShiftRepo) List(employmentId domain.EmploymentID) ([]*domain.DesiredShift, error) {
	desiredShifts := make([]*domain.DesiredShift, 0)
	rows, err := r.db.Client.Query("select * from desired_shifts where employment_id = $1", employmentId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var desiredShift domain.DesiredShift
		if err := rows.Scan(
			&desiredShift.ID,
			&desiredShift.Since,
			&desiredShift.Till,
			&desiredShift.EmploymentID,
			&desiredShift.CreatedAt,
			&desiredShift.UpdatedAt,
		); err != nil {
			return nil, err
		}
		desiredShifts = append(desiredShifts, &desiredShift)
	}

	return desiredShifts, nil
}

func (r *desiredShiftRepo) Create(desiredShift *domain.DesiredShift) (*domain.DesiredShift, error) {
	var desiredShiftResult domain.DesiredShift

	if err := r.db.Client.QueryRow(
		"insert into desired_shifts (since, till, employment_id) values ($1, $2, $3) returning *",
		desiredShift.Since,
		desiredShift.Till,
		desiredShift.EmploymentID,
	).Scan(
		&desiredShiftResult.ID,
		&desiredShiftResult.Since,
		&desiredShiftResult.Till,
		&desiredShiftResult.EmploymentID,
		&desiredShiftResult.CreatedAt,
		&desiredShiftResult.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &desiredShiftResult, nil
}
