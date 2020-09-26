package main

import (
	"strings"

	pb "github.com/hyperledger/fabric/protos/peer"
)

//NotFound Response
func NotFound(msg string) pb.Response {
	return pb.Response{
		Status:  404,
		Message: msg,
	}
}

//Contains Checks if an array of string contains a value
func Contains(a []string, x string) bool {
	for _, n := range a {
		if x == n {
			return true
		}
	}
	return false
}

//ContainsAny Checks if an array of string contains a value
func ContainsAny(a []string, x []string) bool {
	m := make(map[string]string)
	for _, n := range a {
		m[n] = n
	}
	for _, n := range x {
		if _, ok := m[n]; ok {
			return true
		}
	}
	return false

}

// Trims the suffix at the end
func TrimSuffix(s, suffix string) string {
	if strings.HasSuffix(s, suffix) {
		s = s[:len(s)-len(suffix)]
	}
	return s
}
