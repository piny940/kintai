package db

import "kintai_backend/domain"

type stampRepo struct {
	db *DB
}

func NewStampRepo(db *DB) *stampRepo {
	return &stampRepo{db: db}
}

func (r *stampRepo) Create(stamp *domain.Stamp) (*domain.Stamp, error) {
	var stampResult domain.Stamp
	if err := r.db.Client.QueryRow(
		"insert into stamps (stamped_at, worker_id) values ($1, $2) returning *",
		stamp.StampedAt,
		stamp.WorkerID,
	).Scan(
		&stampResult.ID,
		&stampResult.StampedAt,
		&stampResult.WorkerID,
		&stampResult.CreatedAt,
		&stampResult.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &stampResult, nil
}
