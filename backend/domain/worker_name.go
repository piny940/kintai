package domain

type WorkerName struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func NewWorkerName(firstName string, lastName string) *WorkerName {
	return &WorkerName{
		FirstName: firstName,
		LastName:  lastName,
	}
}
