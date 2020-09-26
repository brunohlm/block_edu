package types

import "time"

type Historico struct {
	Id        string    `json:"id"`
	Cpf       string    `json:"cpf"`
	IdDiploma string    `json:"idDiploma"`
	Data      time.Time `json:"dateTime"`
}
