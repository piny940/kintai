package db

import (
	"kintai_backend/domain"
	"time"
)

type desiredShiftRepo struct {
	db *DB
}

func NewDesiredShiftRepo(db *DB) domain.IDesiredShiftRepo {
	return &desiredShiftRepo{db: db}
}

type desiredShiftTable struct {
	ID           domain.DesiredShiftID
	Since        time.Time
	Till         time.Time
	EmploymentID domain.EmploymentID
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
type desiredShiftQuery struct {
	queryObj
}

func newDesiredShiftQuery(query *domain.DesiredShiftQuery) *desiredShiftQuery {
	queryObj := queryObj{}
	if query.ID != nil {
		queryObj.add("id = ", query.ID)
	}
	if query.EmploymentID != nil {
		queryObj.add("employment_id = ", query.EmploymentID)
	}
	if query.FromTime != nil {
		queryObj.add("since >= ", query.FromTime)
	}
	if query.ToTime != nil {
		queryObj.add("since < ", query.ToTime)
	}
	return &desiredShiftQuery{queryObj: queryObj}
}

func (r *desiredShiftRepo) List(query *domain.DesiredShiftQuery) ([]*domain.DesiredShift, error) {
	desiredShifts := make([]*domain.DesiredShift, 0)
	queryObj := newDesiredShiftQuery(query)
	queryStr := "select * from desired_shifts"
	filter, params := queryObj.toFilter(nil)
	if queryObj.exists() {
		queryStr += " where " + filter
	}
	rows, err := r.db.Client.Query(queryStr, params...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var desiredShift desiredShiftTable
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
		desiredShifts = append(desiredShifts, desiredShift.toDomain())
	}

	return desiredShifts, nil
}

func (r *desiredShiftRepo) Create(desiredShift *domain.DesiredShift) (*domain.DesiredShift, error) {
	var desiredShiftResult desiredShiftTable

	if err := r.db.Client.QueryRow(
		"insert into desired_shifts (since, till, employment_id) values ($1, $2, $3) returning *",
		desiredShift.TimeRange.Since(),
		desiredShift.TimeRange.Till(),
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
	return desiredShiftResult.toDomain(), nil
}

func (r *desiredShiftRepo) ListAll(companyId domain.CompanyID, query *domain.DesiredShiftQuery) ([]*domain.DesiredShift, error) {
	desiredShifts := make([]*domain.DesiredShift, 0)
	queryObj := newDesiredShiftQuery(query)
	queryStr := `select desired_shifts.* from desired_shifts
			inner join employments
				on desired_shifts.employment_id = employments.id
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
		var desiredShift desiredShiftTable
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
		desiredShifts = append(desiredShifts, desiredShift.toDomain())
	}

	return desiredShifts, nil
}

func (r *desiredShiftRepo) FindById(desiredShiftId domain.DesiredShiftID) (*domain.DesiredShift, error) {
	var desiredShift desiredShiftTable
	if err := r.db.Client.QueryRow("select * from desired_shifts where id = $1", desiredShiftId).Scan(
		&desiredShift.ID,
		&desiredShift.Since,
		&desiredShift.Till,
		&desiredShift.EmploymentID,
		&desiredShift.CreatedAt,
		&desiredShift.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return desiredShift.toDomain(), nil
}

func (r *desiredShiftRepo) Update(desiredShift *domain.DesiredShift) (*domain.DesiredShift, error) {
	var desiredShiftResult desiredShiftTable
	if err := r.db.Client.QueryRow(
		"update desired_shifts set since = $1, till = $2, employment_id = $3 where id = $4 returning *",
		desiredShift.TimeRange.Since(),
		desiredShift.TimeRange.Till(),
		desiredShift.EmploymentID,
		desiredShift.ID,
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
	return desiredShiftResult.toDomain(), nil
}

func (r *desiredShiftRepo) Delete(desiredShiftId domain.DesiredShiftID) (*domain.DesiredShift, error) {
	var desiredShift desiredShiftTable
	if err := r.db.Client.QueryRow("delete from desired_shifts where id = $1 returning *", desiredShiftId).Scan(
		&desiredShift.ID,
		&desiredShift.Since,
		&desiredShift.Till,
		&desiredShift.EmploymentID,
		&desiredShift.CreatedAt,
		&desiredShift.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return desiredShift.toDomain(), nil
}

func (desiredShiftTable *desiredShiftTable) toDomain() *domain.DesiredShift {
	timeRange, _ := domain.NewTimeRange(desiredShiftTable.Since, desiredShiftTable.Till)
	return &domain.DesiredShift{
		ID:           desiredShiftTable.ID,
		TimeRange:    timeRange,
		EmploymentID: desiredShiftTable.EmploymentID,
		CreatedAt:    desiredShiftTable.CreatedAt,
		UpdatedAt:    desiredShiftTable.UpdatedAt,
	}
}
