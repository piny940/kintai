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

func mapIdToIndex(ids []uint) map[uint]int {
	result := make(map[uint]int, len(ids))
	for i, id := range ids {
		result[id] = i
	}
	return result
}
