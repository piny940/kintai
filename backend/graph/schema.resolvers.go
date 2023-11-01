package graph

import (
	"context"
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/graph/generated"
	"kintai_backend/graph/model"
	"kintai_backend/registry"
)

func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.Worker, error) {
	registry := registry.GetRegistry()
	worker, err := registry.WorkerRepo().FindByEmail(domain.WorkerEmail(email))
	if err != nil {
		return nil, err
	}
	if !worker.Password.Check(domain.WorkerRawPassword(password)) {
		return nil, err
	}
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	auth.Login(echoCtx, worker)
	return &model.Worker{
		ID:     int(worker.ID),
		Status: workerStatusMap[worker.Status],
		Email:  string(worker.Email),
		Name: &model.WorkerName{
			FirstName: string(worker.Name.FirstName),
			LastName:  string(worker.Name.LastName),
		},
		CreatedAt: worker.CreatedAt,
		UpdatedAt: worker.UpdatedAt,
	}, nil
}

func (r *queryResolver) Me(ctx context.Context) (*model.Worker, error) {
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	worker, err := auth.CurrentWorker(echoCtx)
	if err != nil {
		return nil, err
	}
	return &model.Worker{
		ID:     int(worker.ID),
		Status: workerStatusMap[worker.Status],
		Email:  string(worker.Email),
		Name: &model.WorkerName{
			FirstName: string(worker.Name.FirstName),
			LastName:  string(worker.Name.LastName),
		},
		CreatedAt: worker.CreatedAt,
		UpdatedAt: worker.UpdatedAt,
	}, nil
}

func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

var workerStatusMap = map[domain.WorkerStatus]model.WorkerStatus{
	domain.WorkerActive:   model.WorkerStatusActive,
	domain.WorkerInactive: model.WorkerStatusInactive,
}
