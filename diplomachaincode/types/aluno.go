package types

type Aluno struct {
	Id   string `json:"id"`
	Cpf  string `json:"cpf"`
	Nome string `json:"nome"`
	//ConsentedTo   []string `json:"consentedTo"`
	//Vip           bool     `json:"vip"`
	//ConsentOption string   `json:"consentOption"`
}
