package main

import (
	"flag"
	"kintai_backend/config"
	"kintai_backend/db"
	"kintai_backend/registry"
	"kintai_backend/server"
)

func main() {
	env := flag.String("e", "development", "set environment")
	flag.Parse()

	config.Init(*env)
	db.Init()
	registry.Init(db.GetDB())
	defer db.Close()

	if err := server.Init(); err != nil {
		panic(err)
	}
}