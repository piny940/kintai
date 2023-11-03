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

func NewWorkers(workers []*domain.Worker) []*Worker {
	result := make([]*Worker, len(workers))
	for i, worker := range workers {
		result[i] = NewWorker(worker)
	}
	return result
}

var workerStatusMap = map[domain.WorkerStatus]WorkerStatus{
	domain.WorkerActive:   WorkerStatusActive,
	domain.WorkerInactive: WorkerStatusInactive,
}
