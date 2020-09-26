package main

import (
	"encoding/json"
	"fmt"
	//"strings"
	//"time"

	//"github.com/chaincode/types"
	. "github.com/chaincode/types"
	//cid "github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
	pb "github.com/hyperledger/fabric/protos/peer"
	//uuid "github.com/nu7hatch/gouuid"
)

var logger = shim.NewLogger("DIPLOMAChaincode")

// DIPLOMAChaincode Represents our chaincode object
type DIPLOMAChaincode struct {
}

var functions = map[string]func(stub shim.ChaincodeStubInterface, params []string) pb.Response{
	"getInstituicao": getInstituicao,
	"addInstituicao": addInstituicao,
	"getAluno":       getAluno,
	"addAluno":       addAluno,
	"getDiploma":     getDiploma,
	"addDiploma":     addDiploma,
	"getHistorico":   getHistorico,
	"addHistorico":   addHistorico,
	"addPatient":     addPatient,
	"getPatient":     getPatient,
}

// Init Implements the Init method
func (cc *DIPLOMAChaincode) Init(stub shim.ChaincodeStubInterface) peer.Response {
	logger.Debug("DIPLOMA chaincode initialized!")
	return shim.Success(nil)
}

//Invoke chaincode
func (cc *DIPLOMAChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	funcName, params := stub.GetFunctionAndParameters()
	if function, ok := functions[funcName]; ok {
		logger.Debugf("Invoking %s\n with params: \n %s", funcName, params)
		return function(stub, params)
	}
	return shim.Error(fmt.Sprintf("Unknown function %s", funcName))
}

func getAluno(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Informe o cpf para o aluno")
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[ALUNO], []string{ALUNO, params[0]})
	if err != nil {
		return shim.Error("Error creating Compsite Key: " + err.Error())
	}

	aluno, _ := stub.GetState(key)
	if aluno == nil {
		return NotFound("Aluno não encontrado")
	}

	return shim.Success(aluno)
}

func addAluno(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a aluno Json")
	}

	var aluno Aluno
	err := json.Unmarshal([]byte(params[0]), &aluno)
	if err != nil {
		return shim.Error("Failed to decode JSON of: " + string(params[0]) + "/n Error: " + err.Error())
	}

	if len(aluno.Cpf) <= 0 {
		return shim.Error("Missing some required field")
	}

	alunoBytes, err := json.Marshal(aluno)
	if err != nil {
		return shim.Error(err.Error())
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[ALUNO], []string{ALUNO, aluno.Cpf})

	err = stub.PutState(key, alunoBytes)
	if err != nil {
		shim.Error("Failed to create aluno")
	}

	return shim.Success([]byte("Aluno " + aluno.Cpf + " Created"))
}

func addInstituicao(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a instituicao")
	}

	var instituicao Instituicao
	err := json.Unmarshal([]byte(params[0]), &instituicao)
	if err != nil {
		return shim.Error("Failed to decode JSON of: " + string(params[0]) + "/n Error: " + err.Error())
	}

	if len(instituicao.CodigoIes) <= 0 {
		return shim.Error("Missing some required field")
	}

	instituicaoBytes, err := json.Marshal(instituicao)
	if err != nil {
		return shim.Error(err.Error())
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[INSTITUICAO], []string{INSTITUICAO, instituicao.CodigoIes})

	err = stub.PutState(key, instituicaoBytes)
	if err != nil {
		shim.Error("Failed to create instituicao")
	}

	return shim.Success([]byte("instituicao " + instituicao.CodigoIes + " Created"))
}

func getInstituicao(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Informe o CodigoIes para a IES")
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[INSTITUICAO], []string{INSTITUICAO, params[0]})
	if err != nil {
		return shim.Error("Error creating Compsite Key: " + err.Error())
	}

	instituicao, _ := stub.GetState(key)
	if instituicao == nil {
		return NotFound("Instituição não encontrada")
	}

	return shim.Success(instituicao)
}

func addPatient(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a patient Json")
	}

	var patient Patient
	err := json.Unmarshal([]byte(params[0]), &patient)
	if err != nil {
		return shim.Error("Failed to decode JSON of: " + string(params[0]) + "/n Error: " + err.Error())
	}

	if len(patient.Cns) <= 0 {
		return shim.Error("Missing some required field")
	}

	patientBytes, err := json.Marshal(patient)
	if err != nil {
		return shim.Error(err.Error())
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[PATIENT], []string{PATIENT, patient.Cns})

	err = stub.PutState(key, patientBytes)
	if err != nil {
		shim.Error("Failed to create patient")
	}

	return shim.Success([]byte("Patient " + patient.Cns + " Created"))
}

func getPatient(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a cns for patient")
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[PATIENT], []string{PATIENT, params[0]})
	if err != nil {
		return shim.Error("Error creating Compsite Key: " + err.Error())
	}

	patient, _ := stub.GetState(key)
	if patient == nil {
		return NotFound("Patient Not Found")
	}

	return shim.Success(patient)
}

func getDiploma(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Informe o id para o diploma")
	}

	key, err := stub.CreateCompositeKey(CompositeKeys[DIPLOMA], []string{DIPLOMA, params[0]})
	if err != nil {
		return shim.Error("Error creating Compsite Key: " + err.Error())
	}

	diploma, _ := stub.GetState(key)
	if diploma == nil {
		return NotFound("Diploma não encontrado")
	}

	return shim.Success(diploma)
}

func addDiploma(stub shim.ChaincodeStubInterface, params []string) pb.Response {

	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a diploma Json")
	}

	var diploma Diploma
	err := json.Unmarshal([]byte(params[0]), &diploma)
	if err != nil {
		return shim.Error("Failed to decode JSON of: " + string(params[0]) + "/n Error: " + err.Error())
	}

	if len(diploma.Id) <= 0 {
		return shim.Error("Missing some required field")
	}

	intituicaoResponse := getInstituicao(stub, []string{diploma.IdInstituicao})
	if intituicaoResponse.Status == 404 {
		return shim.Error("instituicao não encontrada")
	}

	var instituicao Instituicao
	errInstituicao := json.Unmarshal(intituicaoResponse.Payload, &instituicao)
	if errInstituicao != nil {
		return shim.Error("problema de conversao")
	}

	diploma.Instituicao = instituicao;
	key, err := stub.CreateCompositeKey(CompositeKeys[DIPLOMA], []string{DIPLOMA, diploma.Id})

	diplomaBytes, err := json.Marshal(diploma)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(key, diplomaBytes)
	if err != nil {
		shim.Error("Failed to create diploma")
	}

	return shim.Success([]byte("Diploma " + diploma.Id + " Created"))
}

func getHistorico(stub shim.ChaincodeStubInterface, params []string) pb.Response {
	if len(params[0]) <= 0 {
		return shim.Error("Informe o id para o historico")
	}

	histIterator, err := stub.GetStateByPartialCompositeKey(CompositeKeys[HISTORICO], []string{HISTORICO, params[0]})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer histIterator.Close()

	var resultJSON = "["
	counter := 0
	// Iterate to read the keys returned
	for histIterator.HasNext() {

		queryResultKV, err := histIterator.Next()
		if err != nil {
			fmt.Println("Err=" + err.Error())
			return shim.Error(err.Error())
		}

		consent := queryResultKV.GetValue()
		logger.Debugf("Found document: %s", consent)
		if counter == 0 {
			resultJSON += string(consent)
		} else {
			resultJSON += ", " + string(consent)
		}
		counter++
	}
	resultJSON += "]"

	return shim.Success([]byte(resultJSON))
	//key, err := stub.CreateCompositeKey(CompositeKeys[HISTORICO], []string{HISTORICO, params[0]})
	//if err != nil {
	//	return shim.Error("Error creating Compsite Key: " + err.Error())
	//}

	//
	//historico, _ := stub.GetState(key)
	//if historico == nil {
	//	return NotFound("Historico não encontrado")
	//}

	//return shim.Success(historico)
}

func addHistorico(stub shim.ChaincodeStubInterface, params []string) pb.Response {

	if len(params[0]) <= 0 {
		return shim.Error("Please, provide a historico Json")
	}

	var historico Historico
	err := json.Unmarshal([]byte(params[0]), &historico)
	if err != nil {
		return shim.Error("Failed to decode JSON of: " + string(params[0]) + "/n Error: " + err.Error())
	}

	if len(historico.Id) <= 0 {
		return shim.Error("Missing some required field")
	}

	// key, err := stub.CreateCompositeKey(CompositeKeys[ACCESSLOG], []string{ACCESSLOG, params[0], acessLog.DateTime.Format("2006-01-0215:04:05")})
	key, err := stub.CreateCompositeKey(CompositeKeys[HISTORICO], []string{HISTORICO, historico.Cpf, historico.IdDiploma})

	historicoBytes, err := json.Marshal(historico)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(key, historicoBytes)
	if err != nil {
		shim.Error("Failed to create historico")
	}

	return shim.Success([]byte("Historico " + historico.Id + " Created"))
}

// Chaincode registers with the Shim on startup
func main() {
	logger.Info("Started DIPLOMAChaincode.")
	chainCode := new(DIPLOMAChaincode)
	err := shim.Start(chainCode)
	if err != nil {
		logger.Errorf("Error starting chaincode: %s", err)
	}
}
