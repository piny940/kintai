package loader

import (
	"context"
	"kintai_backend/domain"
	"kintai_backend/registry"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type IWorkerLoader dataloader.Interface[uint, *domain.Worker]

func newWorkerLoader() IWorkerLoader {
	return dataloader.NewBatchedLoader(getWorkers)
}

func getWorkers(ctx context.Context, ids []uint) []*dataloader.Result[*domain.Worker] {
	registry := registry.GetRegistry()
	workerIds := make([]domain.WorkerID, len(ids))
	for i, id := range ids {
		workerIds[i] = domain.WorkerID(id)
	}
	workers, err := registry.WorkerRepo().FindAllByIds(workerIds)
	results := make([]*dataloader.Result[*domain.Worker], len(ids))
	for i, worker := range workers {
		if err != nil {
			results[i] = &dataloader.Result[*domain.Worker]{Error: err}
			continue
		}
		results[i] = &dataloader.Result[*domain.Worker]{Data: worker}
	}
	return results
}
