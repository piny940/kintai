package loader

type Loaders struct {
	EmploymentLoader IEmploymentLoader
	WorkerLoader     IWorkerLoader
}

func NewLoaders() *Loaders {
	return &Loaders{
		EmploymentLoader: newEmploymentLoader(),
		WorkerLoader:     newWorkerLoader(),
	}
}
