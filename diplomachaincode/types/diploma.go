package types

import "time"

type Diploma struct {
	Id             string      `json:"id"`
	IdInstituicao  string      `json:"idInstituicao"`
	Instituicao    Instituicao `json:"instituicao"`
	TipoDiploma    string      `json:"tipoDiploma"`
	CodigoIesCurso string      `json:"codigoIesCurso"`
	NomeCurso      string      `json:"nomeCurso"`
	Modalidade     string      `json:"modalidade"`
	DataConclusao  time.Time   `json:"dataConclusao"`
	PathDoc        string      `json:"pathDoc"`
	IdDoc          string      `json:"idDoc"`
}
