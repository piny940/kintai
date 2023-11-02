package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"kintai_backend/domain"
	"kintai_backend/graph"
	"kintai_backend/graph/model"
	"kintai_backend/registry"
)

func (r *companyResolver) Employment(ctx context.Context, obj *model.Company) (*model.Employment, error) {
	registry := registry.GetRegistry()
	worker, err := currentWorker(ctx)
	if err != nil {
		return nil, newError(err, "ログインしてください")
	}
	employment, err := registry.EmploymentRepo().Find(domain.CompanyID(obj.ID), worker.ID)
	if err != nil {
		return nil, newError(err, "所属情報の取得に失敗しました")
	}
	return model.NewEmployment(employment), nil
}

func (r *queryResolver) Company(ctx context.Context, id uint) (*model.Company, error) {
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

func (r *Resolver) Company() graph.CompanyResolver { return &companyResolver{r} }

type companyResolver struct{ *Resolver }
