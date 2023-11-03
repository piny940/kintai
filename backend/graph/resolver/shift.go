package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"fmt"
	"kintai_backend/domain"
	"kintai_backend/graph"
	"kintai_backend/graph/model"
	"kintai_backend/registry"
	"time"
)

func (r *mutationResolver) CreateShift(ctx context.Context, companyID uint, since time.Time, till time.Time, employmentID uint) (*model.Shift, error) {
	panic(fmt.Errorf("not implemented: CreateShift - createShift"))
}

func (r *queryResolver) CompanyShifts(ctx context.Context, companyID uint, fromTime *time.Time, toTime *time.Time) ([]*model.Shift, error) {
	registry := registry.GetRegistry()
	workerId, err := currentWorkerId(ctx)
	if err != nil {
		return nil, newError(err, "ログインしてください")
	}
	query := &domain.ShiftQuery{
		FromTime: fromTime,
		ToTime:   toTime,
	}
	shifts, err := registry.ShiftUseCase().ListCompanyShifts(*workerId, domain.CompanyID(companyID), query)
	if err != nil {
		return nil, newError(err, "シフト情報の取得に失敗しました")
	}
	return model.NewShifts(shifts), nil
}

func (r *shiftResolver) Employment(ctx context.Context, obj *model.Shift) (*model.Employment, error) {
	employment, err := r.EmploymentLoader.Load(ctx, obj.EmploymentID)()
	if err != nil {
		return nil, newError(err, "所属情報の取得に失敗しました")
	}
	return model.NewEmployment(employment), nil
}

func (r *Resolver) Shift() graph.ShiftResolver { return &shiftResolver{r} }

type shiftResolver struct{ *Resolver }
