package db

import "kintai_backend/domain"

type stampRepo struct {
	db *DB
}

func NewStampRepo(db *DB) domain.IStampRepo {
	return &stampRepo{db: db}
}

type stampQuery struct {
	queryObj
}

func newStampQuery(query *domain.StampQuery) *stampQuery {
	queryObj := queryObj{}
	if query.EmploymentId != nil {
		queryObj.add("employment_id = ", query.EmploymentId)
	}
	if query.FromTime != nil {
		queryObj.add("stamped_at >= ", query.FromTime)
	}
	if query.ToTime != nil {
		queryObj.add("stamped_at <= ", query.ToTime)
	}
	return &stampQuery{queryObj: queryObj}
}

func (r *stampRepo) List(workerId domain.WorkerID, companyId domain.CompanyID) ([]*domain.Stamp, error) {
	stamps := make([]*domain.Stamp, 0)
	rows, err := r.db.Client.Query(
		"select * from stamps where employment_id in (select id from employments where worker_id = $1 and company_id = $2)",
		workerId,
		companyId,
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

func (r *stampRepo) Count(query *domain.StampQuery) (int, error) {

}
