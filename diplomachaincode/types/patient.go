package types

//Patient Type
type Patient struct {
	Cpf           string   `json:"cpf"`
	Cns           string   `json:"cns"`
	Name          string   `json:"name"`
	ConsentedTo   []string `json:"consentedTo"`
	Vip           bool     `json:"vip"`
	ConsentOption string   `json:"consentOption"`
}
