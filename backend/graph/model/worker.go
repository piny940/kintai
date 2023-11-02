package model

import "kintai_backend/domain"

func NewWorker(worker *domain.Worker) *Worker {
	return &Worker{
		ID:     uint(worker.ID),
		Status: workerStatusMap[worker.Status],
		Email:  string(worker.Email),
		Name: &WorkerName{
			FirstName: string(worker.Name.FirstName),
			LastName:  string(worker.Name.LastName),
		},
		CreatedAt: worker.CreatedAt,
		UpdatedAt: worker.UpdatedAt,
	}
}

var workerStatusMap = map[domain.WorkerStatus]WorkerStatus{
	domain.WorkerActive:   WorkerStatusActive,
	domain.WorkerInactive: WorkerStatusInactive,
}
