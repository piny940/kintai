package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"kintai_backend/graph"
	"kintai_backend/graph/model"
)

func (r *employmentResolver) Worker(ctx context.Context, obj *model.Employment) (*model.Worker, error) {
	worker, err := r.WorkerLoader.Load(ctx, uint(obj.WorkerID))()
	if err != nil {
		return nil, newError(err, "従業員情報の取得に失敗しました")
	}
	return model.NewWorker(worker), nil
}

func (r *Resolver) Employment() graph.EmploymentResolver { return &employmentResolver{r} }

type employmentResolver struct{ *Resolver }
