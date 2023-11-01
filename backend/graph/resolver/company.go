package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.40

import (
	"context"
	"fmt"
	"kintai_backend/graph"
	"kintai_backend/graph/model"
)

func (r *queryResolver) Company(ctx context.Context, id int) (*model.Company, error) {
	panic(fmt.Errorf("not implemented: Company - company"))
}

func (r *queryResolver) Companies(ctx context.Context) ([]*model.Company, error) {
	panic(fmt.Errorf("not implemented: Companies - companies"))
}

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
