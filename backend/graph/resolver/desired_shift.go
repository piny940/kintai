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
	"time"
)

func (r *queryResolver) DesiredShifts(ctx context.Context, companyID uint, fromTime *time.Time, toTime *time.Time) ([]*model.DesiredShift, error) {
	registry := registry.GetRegistry()
	worker, err := currentWorker(ctx)
	if err != nil {
		return nil, newError(err, "ログインしてください")
	}
	company, err := GetCompany(ctx, companyID)
	if err != nil {
		return nil, newError(err, "company_idが適切ではありません")
	}
	employment, err := registry.EmploymentRepo().Find(company.ID, worker.ID)
	if err != nil {
		return nil, newError(err, "会社に属していません")
	}
	query := domain.DesiredShiftQuery{
		EmploymentID: &employment.ID,
		FromTime:     fromTime,
		ToTime:       toTime,
	}
	desiredShifts, err := registry.DesiredShiftRepo().List(query)
	if err != nil {
		return nil, newError(err, "希望シフトの取得に失敗しました")
	}
	return model.NewDesiredShifts(desiredShifts), nil
}

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
