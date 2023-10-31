package db

import "fmt"

type queryObj map[string] interface{}

func (q queryObj) add(key string, value interface{}) {
	q[key] = value
}
func (q queryObj) toFilter() string {
	filter := ""
	for key := range q {
		filter += fmt.Sprintf("%s$%d and ", key, len(filter)+1)
	}
	return filter[:len(filter)-5]
}
func (q queryObj) toParams() []interface{} {
	params := make([]interface{}, 0)
	for _, value := range q {
		params = append(params, value)
	}
	return params
}
func (q queryObj) exists() bool {
	return len(q) > 0
}