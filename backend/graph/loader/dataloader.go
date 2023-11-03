package loader

type Loaders struct {
	EmploymentLoader IEmploymentLoader
}

func NewLoaders() *Loaders {
	return &Loaders{
		EmploymentLoader: newEmploymentLoader(),
	}
}
