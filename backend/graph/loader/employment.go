package loader

import (
	"context"
	"kintai_backend/domain"
	"kintai_backend/registry"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type IEmploymentLoader dataloader.Interface[uint, *domain.Employment]

func newEmploymentLoader() IEmploymentLoader {
	return dataloader.NewBatchedLoader(batchGetEmployments)
}

func batchGetEmployments(ctx context.Context, Ids []uint) []*dataloader.Result[*domain.Employment] {
	registry := registry.GetRegistry()
	employmentIds := make([]domain.EmploymentID, len(Ids))
	for i, id := range Ids {
		employmentIds[i] = domain.EmploymentID(id)
	}
	employments, err := registry.EmploymentRepo().FindAllByIds(employmentIds)
	results := make([]*dataloader.Result[*domain.Employment], len(Ids))
	for i, employment := range employments {
		if err != nil {
			results[i] = &dataloader.Result[*domain.Employment]{Error: err}
			continue
		}
		results[i] = &dataloader.Result[*domain.Employment]{Data: employment}
	}
	return results
}
