package domain

import "time"

type EmploymentID uint
type EmploymentKind int
type EmploymentStatus int

const (
	EmploymentAdmin EmploymentKind = iota
	EmploymentMember
)
const (
	EmploymentActive EmploymentStatus = iota
	EmploymentInactive
)

type Employment struct {
	ID        EmploymentID     `json:"id"`
	Kind      EmploymentKind   `json:"kind"`
	Status    EmploymentStatus `json:"status"`
	CompanyID CompanyID        `json:"company_id"`
	WorkerID  WorkerID         `json:"worker_id"`
	CreatedAt time.Time        `json:"created_at"`
	UpdatedAt time.Time        `json:"updated_at"`
}
