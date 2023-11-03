package db

import (
	"fmt"
	"strings"
)

type queryObj map[string]interface{}

func (q queryObj) add(key string, value interface{}) {
	q[key] = value
}
func (q queryObj) toFilter() (string, []interface{}) {
	filter := ""
	count := 1
	params := make([]interface{}, 0)
	for key, value := range q {
		filter += fmt.Sprintf("%s$%d and ", key, count)
		params = append(params, value)
		count++
	}
	return filter[:len(filter)-5], params
}
func (q queryObj) exists() bool {
	return len(q) > 0
}

type uintNumber interface {
	~uint
}

func arrayParam[T uintNumber](ids []T) (string, []interface{}) {
	args := make([]interface{}, len(ids))
	strParams := make([]string, len(ids))
	for i, id := range ids {
		args[i] = id
		strParams[i] = fmt.Sprintf("$%d", i+1)
	}
	return strings.Join(strParams, ", "), args
}
