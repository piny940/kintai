// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"
)

type DesiredShift struct {
	ID           uint      `json:"id"`
	Since        string    `json:"since"`
	Till         string    `json:"till"`
	EmploymentID int       `json:"employmentId"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type LoginResponse struct {
	Worker *Worker `json:"worker,omitempty"`
}

type Stamp struct {
	ID           uint      `json:"id"`
	StampedAt    time.Time `json:"stampedAt"`
	EmploymentID uint      `json:"employmentID"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type Worker struct {
	ID         uint         `json:"id"`
	Status     WorkerStatus `json:"status"`
	Email      string       `json:"email"`
	Name       *WorkerName  `json:"name"`
	WorkStatus *WorkStatus  `json:"workStatus,omitempty"`
	CreatedAt  time.Time    `json:"createdAt"`
	UpdatedAt  time.Time    `json:"updatedAt"`
}

type WorkerName struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type EmploymentKind string

const (
	EmploymentKindAdmin  EmploymentKind = "ADMIN"
	EmploymentKindMember EmploymentKind = "MEMBER"
)

var AllEmploymentKind = []EmploymentKind{
	EmploymentKindAdmin,
	EmploymentKindMember,
}

func (e EmploymentKind) IsValid() bool {
	switch e {
	case EmploymentKindAdmin, EmploymentKindMember:
		return true
	}
	return false
}

func (e EmploymentKind) String() string {
	return string(e)
}

func (e *EmploymentKind) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = EmploymentKind(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid EmploymentKind", str)
	}
	return nil
}

func (e EmploymentKind) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type EmploymentStatus string

const (
	EmploymentStatusActive   EmploymentStatus = "ACTIVE"
	EmploymentStatusInactive EmploymentStatus = "INACTIVE"
)

var AllEmploymentStatus = []EmploymentStatus{
	EmploymentStatusActive,
	EmploymentStatusInactive,
}

func (e EmploymentStatus) IsValid() bool {
	switch e {
	case EmploymentStatusActive, EmploymentStatusInactive:
		return true
	}
	return false
}

func (e EmploymentStatus) String() string {
	return string(e)
}

func (e *EmploymentStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = EmploymentStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid EmploymentStatus", str)
	}
	return nil
}

func (e EmploymentStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type WorkStatus string

const (
	WorkStatusWorking WorkStatus = "WORKING"
	WorkStatusLeft    WorkStatus = "LEFT"
)

var AllWorkStatus = []WorkStatus{
	WorkStatusWorking,
	WorkStatusLeft,
}

func (e WorkStatus) IsValid() bool {
	switch e {
	case WorkStatusWorking, WorkStatusLeft:
		return true
	}
	return false
}

func (e WorkStatus) String() string {
	return string(e)
}

func (e *WorkStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = WorkStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid WorkStatus", str)
	}
	return nil
}

func (e WorkStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type WorkerStatus string

const (
	WorkerStatusActive   WorkerStatus = "ACTIVE"
	WorkerStatusInactive WorkerStatus = "INACTIVE"
)

var AllWorkerStatus = []WorkerStatus{
	WorkerStatusActive,
	WorkerStatusInactive,
}

func (e WorkerStatus) IsValid() bool {
	switch e {
	case WorkerStatusActive, WorkerStatusInactive:
		return true
	}
	return false
}

func (e WorkerStatus) String() string {
	return string(e)
}

func (e *WorkerStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = WorkerStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid WorkerStatus", str)
	}
	return nil
}

func (e WorkerStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
