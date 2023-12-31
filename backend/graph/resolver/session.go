package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"kintai_backend/auth"
	"kintai_backend/domain"
	"kintai_backend/graph/model"
	"kintai_backend/registry"
)

func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.LoginResponse, error) {
	registry := registry.GetRegistry()
	worker, err := registry.WorkerRepo().FindByEmail(domain.WorkerEmail(email))
	if err != nil {
		return nil, newError(err, "メールアドレスまたはパスワードが間違っています")
	}
	if !worker.Password.Check(domain.WorkerRawPassword(password)) {
		return nil, newError(err, "メールアドレスまたはパスワードが間違っています")
	}
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	auth.Login(echoCtx, worker)
	return &model.LoginResponse{
		Worker: model.NewWorker(worker),
	}, nil
}

func (r *mutationResolver) Logout(ctx context.Context) (bool, error) {
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return false, err
	}
	auth.Logout(echoCtx)
	return true, nil
}
