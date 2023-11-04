package model

import "kintai_backend/domain"

func NewStamp(stamp *domain.Stamp) *Stamp {
	return &Stamp{
		ID:           uint(stamp.ID),
		StampedAt:    stamp.StampedAt,
		EmploymentID: uint(stamp.EmploymentID),
		CreatedAt:    stamp.CreatedAt,
		UpdatedAt:    stamp.UpdatedAt,
	}
}
func NewStamps(stamps []*domain.Stamp) []*Stamp {
	result := make([]*Stamp, len(stamps))
	for i, stamp := range stamps {
		result[i] = NewStamp(stamp)
	}
	return result
}
