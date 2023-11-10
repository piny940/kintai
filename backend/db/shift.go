package db

import (
	"kintai_backend/domain"
	"time"
)

type shiftRepo struct {
	db *DB
}

func NewShiftRepo(db *DB) domain.IShiftRepo {
	return &shiftRepo{db: db}
}

type shiftTable struct {
	ID           domain.ShiftId
	Since        time.Time
	Till         time.Time
	EmploymentID domain.EmploymentID
	CreatedAt    time.Time
	UpdatedAt    time.Time
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
		var shift shiftTable
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
		shifts = append(shifts, shift.toDomain())
	}
	return shifts, nil
}

func (r *shiftRepo) FindById(shiftId domain.ShiftId) (*domain.Shift, error) {
	var shift shiftTable

	if err := r.db.Client.QueryRow("select * from shifts where id = $1", shiftId).Scan(
		&shift.ID,
		&shift.Since,
		&shift.Till,
		&shift.EmploymentID,
		&shift.CreatedAt,
		&shift.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return shift.toDomain(), nil
}

func (r *shiftRepo) Create(shift *domain.Shift) (*domain.Shift, error) {
	var shiftResult shiftTable

	if err := r.db.Client.QueryRow(
		"insert into shifts (since, till, employment_id) values ($1, $2, $3) returning *",
		shift.TimeRange.Since(),
		shift.TimeRange.Till(),
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
	return shiftResult.toDomain(), nil
}

func (r *shiftRepo) Update(shift *domain.Shift) (*domain.Shift, error) {
	var shiftResult shiftTable

	if err := r.db.Client.QueryRow(
		"update shifts set since = $1, till = $2, employment_id = $3 where id = $4 returning *",
		shift.TimeRange.Since(),
		shift.TimeRange.Till(),
		shift.EmploymentID,
		shift.ID,
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
	return shiftResult.toDomain(), nil
}

func (r *shiftRepo) Delete(shiftId domain.ShiftId) (*domain.Shift, error) {
	var shift shiftTable

	if err := r.db.Client.QueryRow("delete from shifts where id = $1 returning *", shiftId).Scan(
		&shift.ID,
		&shift.Since,
		&shift.Till,
		&shift.EmploymentID,
		&shift.CreatedAt,
		&shift.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return shift.toDomain(), nil
}

func (shiftTable *shiftTable) toDomain() *domain.Shift {
	timeRange, _ := domain.NewTimeRange(shiftTable.Since, shiftTable.Till)
	return &domain.Shift{
		ID:           shiftTable.ID,
		TimeRange:    timeRange,
		EmploymentID: shiftTable.EmploymentID,
		CreatedAt:    shiftTable.CreatedAt,
		UpdatedAt:    shiftTable.UpdatedAt,
	}
}
