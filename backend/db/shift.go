package db

import "kintai_backend/domain"

type shiftRepo struct {
	db *DB
}

func NewShiftRepo(db *DB) domain.IShiftRepo {
	return &shiftRepo{db: db}
}

type shiftQuery struct {
	queryObj
}

func newShiftQuery(query *domain.ShiftQuery) *shiftQuery {
	queryObj := queryObj{}
	if query.ID != nil {
		queryObj.add("id = ", *query.ID)
	}
	if query.EmploymentID != nil {
		queryObj.add("employment_id = ", *query.EmploymentID)
	}
	if query.FromTime != nil {
		queryObj.add("since >= ", *query.FromTime)
	}
	if query.ToTime != nil {
		queryObj.add("till <= ", *query.ToTime)
	}
	return &shiftQuery{queryObj: queryObj}
}

func (r *shiftRepo) ListAll(companyId domain.CompanyID, query *domain.ShiftQuery) ([]*domain.Shift, error) {
	var shifts []*domain.Shift

	queryObj := newShiftQuery(query)
	queryStr := `select shifts.* from shifts
			inner join employments on shifts.employment_id = employments.id
			where employments.company_id = $1`
	filter, params := queryObj.toFilter([]interface{}{companyId})
	if queryObj.exists() {
		queryStr += " and " + filter
	}

	rows, err := r.db.Client.Query(queryStr, params...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var shift domain.Shift
		if err := rows.Scan(
			&shift.ID,
			&shift.Since,
			&shift.Till,
			&shift.EmploymentID,
			&shift.CreatedAt,
			&shift.UpdatedAt,
		); err != nil {
			return nil, err
		}
		shifts = append(shifts, &shift)
	}
	return shifts, nil
}

func (r *shiftRepo) Create(shift *domain.Shift) (*domain.Shift, error) {
	var shiftResult domain.Shift

	if err := r.db.Client.QueryRow(
		"insert into shifts (since, till, employment_id) values ($1, $2, $3) returning *",
		shift.Since,
		shift.Till,
		shift.EmploymentID,
	).Scan(
		&shiftResult.ID,
		&shiftResult.Since,
		&shiftResult.Till,
		&shiftResult.EmploymentID,
		&shiftResult.CreatedAt,
		&shiftResult.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &shiftResult, nil
}
