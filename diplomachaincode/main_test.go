package main

import (
	"encoding/json"
	"fmt"

	"strings"

	// go lang standard unit test package
	"testing"

	// Shim package for creating the MockStub Instance

	"github.com/chaincode/types"
	. "github.com/chaincode/types"
	"github.com/hyperledger/fabric/core/chaincode/shim"

	// peer.Response is in the peer package
	"github.com/hyperledger/fabric/protos/peer"
	pb "github.com/hyperledger/fabric/protos/peer"
)

const (
	MspName = "msp"
)

var testLog = shim.NewLogger("diplomachaincode_test")

func TestDocumentReference(t *testing.T) {
	stub := InitChaincode(t)
	testLog.Info("Test DocumentReference")

	patientID := "123456"
	ccArgs := SetupArgsArray("addDocumentReference", patientID, "{ \"status\": \"old\", \"date\": \"2019-10-07\" }")
	response := checkInvoke(t, stub, ccArgs)
	dumpResponse(ccArgs, response, t.Failed())
	documentID := string(response.GetPayload())
	document := &types.DocumentReference{ID: documentID, Status: "old", Date: "2019-10-07", MSPIdentifier: "Org1"}
	documentAsBytes, _ := json.Marshal(document)
	key, _ := stub.CreateCompositeKey(CompositeKeys[DOCUMENTREFERENCE], []string{DOCUMENTREFERENCE, documentID})
	checkState(t, stub, key, string(documentAsBytes))

	ccArgs = SetupArgsArray("getDocumentReference", documentID)
	checkQuery(t, stub, ccArgs, string(documentAsBytes))
	dumpResponse(ccArgs, response, t.Failed())

	ccArgs = SetupArgsArray("getPatientDocumentReference", patientID, documentID)
	checkQuery(t, stub, ccArgs, string(documentAsBytes))
	dumpResponse(ccArgs, response, t.Failed())
	//expectedResponse := "{\"FeatureId\":\"" + featureId + "\",\"Name\":\"" + featureName + "\",\"FeatureComposition\":null}"
	//checkQueryOneArg(t, mockStub, "GetFeature", featureId, expectedResponse)
}

func TestPatient(t *testing.T) {
	stub := InitChaincode(t)
	testLog.Info("Test Patient")

	patientID := "123456"
	ccArgs := SetupArgsArray("addPatient", "{\"cpf\": \"\",\"cns\": \""+patientID+"\",\"name\": \"Test\",\"consentedTo\": [],\"consentOption\": \"OptOut\",\"vip\": false }")
	response := checkInvoke(t, stub, ccArgs)
	dumpResponse(ccArgs, response, t.Failed())

	patient := &types.Patient{Cpf: "", Cns: patientID, Name: "Test", ConsentedTo: []string{}, Vip: false, ConsentOption: "OptOut"}
	patientAsBytes, _ := json.Marshal(patient)
	ccArgs = SetupArgsArray("getPatient", patientID)
	checkQuery(t, stub, ccArgs, string(patientAsBytes))
	dumpResponse(ccArgs, response, t.Failed())

	ccArgs = SetupArgsArray("addPatient", "{\"cpf\": \"\",\"cns\": \""+patientID+"\",\"name\": \"Test\",\"consentedTo\": [],\"consentOption\": \"OptOut\",\"vip\": false }")
	response = checkInvoke(t, stub, ccArgs)
	dumpResponse(ccArgs, response, t.Failed())
}

func checkQuery(t *testing.T, stub *shim.MockStub, args [][]byte, expect string) {
	res := stub.MockInvoke("1", args)
	if res.Status != shim.OK {
		fmt.Println("Query", args, "failed", string(res.Message))
		t.FailNow()
	}
	if res.Payload == nil {
		fmt.Println("Query", args, "failed to get result")
		t.FailNow()
	}
	if string(res.Payload) != expect {
		fmt.Println("Query result ", string(res.Payload), "was not", expect, "as expected")
		t.FailNow()
	}
}

func checkInvoke(t *testing.T, stub *shim.MockStub, args [][]byte) pb.Response {
	res := stub.MockInvoke("1", args)
	if res.Status != shim.OK {
		fmt.Println("Invoke", args, "failed", string(res.Message))
		t.FailNow()
	}
	return res
}

func checkState(t *testing.T, stub *shim.MockStub, name string, expect string) {
	bytes := stub.State[name]
	if bytes == nil {
		fmt.Println("State", name, "failed to get value")
		t.FailNow()
	}
	if string(bytes) != expect {
		fmt.Println("State value", name, "was not", expect, "as expected")
		t.FailNow()
	}
}

// SetupArgsArray sets up the args arrays based on passed args
func SetupArgsArray(funcName string, args ...string) [][]byte {
	ccArgs := make([][]byte, 1+len(args))

	ccArgs[0] = []byte(funcName)

	for i, arg := range args {
		ccArgs[i+1] = []byte(arg)
	}

	return ccArgs
}

// Prints the content of the Peer Response
func dumpResponse(args [][]byte, response peer.Response, printFlag bool) {
	if !printFlag {
		return
	}

	// Holds arg strings
	argsArray := make([]string, len(args))
	for i, arg := range args {
		argsArray[i] = string(arg)
	}
	fmt.Println("Call:    ", strings.Join(argsArray, ","))
	fmt.Println("RetCode: ", response.Status)
	fmt.Println("RetMsg:  ", response.Message)
	fmt.Println("Payload: ", string(response.Payload))
}

// InitChaicode creates the mock stub & initializes the chaincode
func InitChaincode(t *testing.T) *shim.MockStub {
	chainCode := new(DIPLOMAChaincode)
	// Create an instance of the MockStub
	stub := shim.NewMockStub("DIPLOMATestStub", chainCode)
	chainCode.testMode(true)

	// Execute the init
	response := stub.MockInit("mockTxId", nil)

	// Get the status
	status := response.GetStatus()

	// Log the status
	t.Logf("Received status = %d", status)

	// This is a check that indicates if there is an initialization failure
	if response.GetStatus() != shim.OK {
		t.FailNow()
	}
	// Return the stub instance to be used from MockInvoke
	return stub
}
