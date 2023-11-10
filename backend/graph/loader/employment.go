package loader

import (
	"context"
	"kintai_backend/domain"
	"kintai_backend/registry"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type IEmploymentLoader dataloader.Interface[uint, *domain.Employment]

func newEmploymentLoader() IEmploymentLoader {
	return dataloader.NewBatchedLoader(getEmployments)
}

func getEmployments(ctx context.Context, Ids []uint) []*dataloader.Result[*domain.Employment] {
	registry := registry.GetRegistry()
	indexMap := mapIdToIndex(Ids)

	employmentIds := make([]domain.EmploymentID, len(Ids))
	for i, id := range Ids {
		employmentIds[i] = domain.EmploymentID(id)
	}
	employments, err := registry.EmploymentRepo().FindAllByIds(employmentIds)
	results := make([]*dataloader.Result[*domain.Employment], len(Ids))
	for _, employment := range employments {
		index := indexMap[uint(employment.ID)]
		if err != nil {
			results[index] = &dataloader.Result[*domain.Employment]{Error: err}
			continue
		}
		results[index] = &dataloader.Result[*domain.Employment]{Data: employment}
	}
	return results
}
