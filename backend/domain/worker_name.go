package domain

type WorkerName struct {
	FirstName string
	LastName  string
}

func NewWorkerName(firstName string, lastName string) *WorkerName {
	return &WorkerName{
		FirstName: firstName,
		LastName:  lastName,
	}
}
