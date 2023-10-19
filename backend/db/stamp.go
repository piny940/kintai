package db

import "kintai_backend/domain"

type stampRepo struct {
	db *DB
}

func NewStampRepo(db *DB) *stampRepo {
	return &stampRepo{db: db}
}

func (r *stampRepo) List(workerId domain.WorkerID) ([]*domain.Stamp, error) {
	stamps := make([]*domain.Stamp, 0)
	rows, err := r.db.Client.Query(
		"select * from stamps where worker_id = $1",
		workerId,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var stamp domain.Stamp
		if err := rows.Scan(
			&stamp.ID,
			&stamp.StampedAt,
			&stamp.EmploymentID,
			&stamp.CreatedAt,
			&stamp.UpdatedAt,
		); err != nil {
			return nil, err
		}
		stamps = append(stamps, &stamp)
	}
	return stamps, nil
}

func (r *stampRepo) Create(stamp *domain.Stamp) (*domain.Stamp, error) {
	var stampResult domain.Stamp

	if err := r.db.Client.QueryRow(
		"insert into stamps (stamped_at, employment_id) values ($1, $2) returning *",
		stamp.StampedAt,
		stamp.EmploymentID,
	).Scan(
		&stampResult.ID,
		&stampResult.StampedAt,
		&stampResult.EmploymentID,
		&stampResult.CreatedAt,
		&stampResult.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &stampResult, nil
}
