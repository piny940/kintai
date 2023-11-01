package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"kintai_backend/graph"
	"kintai_backend/graph/model"
	"kintai_backend/registry"
)

func (r *queryResolver) Company(ctx context.Context, id uint) (*model.Company, error) {
	// registry := registry.GetRegistry()
	// worker, err := currentWorker(ctx)
	// if err != nil {
	// 	return nil, newError(err, "ログインしてください")
	// }
	company, err := GetCompany(ctx, id)
	if err != nil {
		return nil, newError(err, "会社情報の取得に失敗しました")
	}
	return model.NewCompany(company), nil
}

func (r *queryResolver) Companies(ctx context.Context) ([]*model.Company, error) {
	registry := registry.GetRegistry()
	worker, err := currentWorker(ctx)
	if err != nil {
		return nil, newError(err, "ログインしてください")
	}

	companies, err := registry.CompanyRepo().List(worker.ID)
	if err != nil {
		return nil, newError(err, "会社情報の取得に失敗しました")
	}
	return model.NewCompanies(companies), nil
}

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
