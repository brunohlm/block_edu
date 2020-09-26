package types

//Types constant names
const (
	INSTITUICAO = "instituicao"
	PATIENT     = "patient"
	ALUNO       = "aluno"
	DIPLOMA     = "diploma"
	HISTORICO   = "historico"
)

//CompositeKeys map
var CompositeKeys = map[string]string{
	INSTITUICAO: "type~codigoIes",
	PATIENT:     "type~cns",
	ALUNO:       "type~cpf",
	DIPLOMA:     "type~id",
	HISTORICO:   "type~cpf~idDiploma",
}
