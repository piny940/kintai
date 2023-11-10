package domain

import "time"

type EmploymentID uint
type EmploymentKind int
type EmploymentStatus int

const (
	EmploymentMember EmploymentKind = iota
	EmploymentAdmin
)
const (
	EmploymentActive EmploymentStatus = iota
	EmploymentInactive
)

type Employment struct {
	ID        EmploymentID
	Kind      EmploymentKind
	Status    EmploymentStatus
	CompanyID CompanyID
	WorkerID  WorkerID
	CreatedAt time.Time
	UpdatedAt time.Time
}
type IEmploymentRepo interface {
	Find(companyId CompanyID, workerId WorkerID) (*Employment, error)
	FindById(employmentId EmploymentID) (*Employment, error)
	FindAllByIds(employmentIds []EmploymentID) ([]*Employment, error)
}
