package db

import (
	"kintai_backend/domain"
	"time"
)

type workReportRepo struct {
	db *DB
}

func NewWorkReportRepo(db *DB) domain.IWorkReportRepo {
	return &workReportRepo{db: db}
}

func (r *workReportRepo) Show(employmentId domain.EmploymentID, since time.Time, until time.Time) (*domain.WorkReport, error) {
	stamps := make([]*domain.Stamp, 0)

	rows, err := r.db.Client.Query(
		"select * from stamps where employment_id = $1 and stamped_at between $2 and $3",
		employmentId,
		since,
		until,
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
	workReport := domain.WorkReport{
		EmploymentId: employmentId,
		Stamps:       stamps,
		Since:        since,
		Until:        until,
	}
	return &workReport, nil
}
