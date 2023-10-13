package db

import (
	"kintai_backend/domain"
	"time"
)

type workerRepo struct {
	db *DB
}

func NewWorkerRepo(db *DB) *workerRepo {
	return &workerRepo{db: db}
}

type WorkerTable struct {
	ID                uint      `json:"id"`
	Email             string    `json:"email"`
	EncryptedPassword string    `json:"-"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

func (u *workerRepo) FindByEmail(email domain.WorkerEmail) (*domain.Worker, error) {
	var workerTable WorkerTable
	if err := u.db.Client.QueryRow(
		"select * from workers where email = $1",
		email,
	).Scan(
		&workerTable.ID,
		&workerTable.Email,
		&workerTable.EncryptedPassword,
		&workerTable.CreatedAt,
		&workerTable.UpdatedAt,
	); err != nil {
		return nil, err
	}

	return workerTable.toDomain(), nil
}

func (u *workerRepo) List() ([]*domain.Worker, error) {
	var workers = make([]*domain.Worker, 0)
	rows, err := u.db.Client.Query("select * from workers")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var workerTable WorkerTable
		if err := rows.Scan(
			&workerTable.ID,
			&workerTable.Email,
			&workerTable.EncryptedPassword,
			&workerTable.CreatedAt,
			&workerTable.UpdatedAt,
		); err != nil {
			return nil, err
		}

		workers = append(workers, workerTable.toDomain())
	}

	return workers, nil
}

func (u *workerRepo) Create(email domain.WorkerEmail, password domain.WorkerHashedPassword) (*domain.Worker, error) {
	var workerTable WorkerTable
	if err := u.db.Client.QueryRow(
		"insert into workers (email, password) values ($1, $2) returning *",
		email,
		password,
	).Scan(
		&workerTable.ID,
		&workerTable.Email,
		&workerTable.EncryptedPassword,
		&workerTable.CreatedAt,
		&workerTable.UpdatedAt,
	); err != nil {
		return nil, err
	}

	return workerTable.toDomain(), nil
}

func (workerTable *WorkerTable) toDomain() *domain.Worker {
	password := domain.WorkerPassword{
		HashedPassword: domain.WorkerHashedPassword(workerTable.EncryptedPassword),
	}
	worker := domain.Worker{
		ID:        domain.WorkerID(workerTable.ID),
		Email:     domain.WorkerEmail(workerTable.Email),
		Password:  password,
		CreatedAt: workerTable.CreatedAt,
		UpdatedAt: workerTable.UpdatedAt,
	}
	return &worker
}
