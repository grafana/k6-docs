package main

import (
	"errors"
	"io"
	"log"
	"net"
	"os"
)

func main() {
	address := os.Getenv("TCP_SERVER_ADDRESS")
	if address == "" {
		address = "127.0.0.1:8080"
	}

	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatal(err)
	}
	defer listener.Close()

	log.Printf("TCP verification server listening on %s", address)

	for {
		connection, err := listener.Accept()
		if err != nil {
			log.Fatal(err)
		}

		go echo(connection)
	}
}

func echo(connection net.Conn) {
	defer connection.Close()

	buffer := make([]byte, 4096)
	for {
		count, err := connection.Read(buffer)
		if count > 0 {
			if _, writeErr := connection.Write(buffer[:count]); writeErr != nil {
				log.Printf("write error: %v", writeErr)
				return
			}
		}

		if err != nil {
			if !errors.Is(err, io.EOF) {
				log.Printf("read error: %v", err)
			}
			return
		}
	}
}
