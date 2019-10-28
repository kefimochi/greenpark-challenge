package main

// package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/api/users", wrapper(getUsers)).Methods("GET")
	router.HandleFunc("/api/users/{id:[0-9]{10}}", wrapper(editUser)).Methods("POST")

	s := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	go func() {
		log.Println("Running HTTP server on port: http://localhost:8080")
		s.ListenAndServe()
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT, syscall.SIGKILL)

	<-sig

	log.Println("Stopping server")
	_ = s.Shutdown(context.Background())
}

func wrapper(f func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		f(w, r)

		var query string
		if q := r.URL.Query().Encode(); q != "" {
			query = fmt.Sprintf("?%s", q)
		}

		log.Printf("Recevied request: %s %s%s\n", r.Method, r.URL.Path, query)
	}
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	var skip int
	limit := 100

	if s := r.URL.Query().Get("skip"); s != "" {
		ss, err := strconv.Atoi(strings.TrimSpace(s))
		if err != nil {
			w.WriteHeader(400)
			_, _ = w.Write([]byte(fmt.Sprintf("unknown skip value - %s", s)))
			return
		}
		skip = ss
	}

	if l := r.URL.Query().Get("limit"); l != "" {
		ll, err := strconv.Atoi(strings.TrimSpace(l))
		if err != nil {
			w.WriteHeader(400)
			_, _ = w.Write([]byte(fmt.Sprintf("unknown limit value - %s", l)))
			return
		}

		limit = ll
	}

	allUsers := Users()
	var users []User
	for x := skip; x < skip+limit; x++ {
		users = append(users, allUsers[x])
	}

	n := skip
	stop := len(users)
	for idx, user := range users {
		if user.Id == 0 {
			stop = idx
			break
		}

		user.Id = user.Id + int64((9000+n)*1000000)
		users[idx] = user
		n++
	}

	users = users[:stop]

	b, _ := json.Marshal(users)
	w.Write(b)
}

func editUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := strings.TrimSpace(vars["id"])

	users := Users()

	var userId *int64
	var realId int64
	if id != "" {
		i := id[0:4]
		ri, err := strconv.Atoi(i)
		if err == nil {
			idx := ri - 9000
			if idx < len(users) {
				ii := int64(idx)
				userId = &ii

				realId, _ = strconv.ParseInt(id[4:], 10, 64)
			}
		}
	}

	if userId == nil {
		w.WriteHeader(404)
		return
	}

	user := users[*userId]
	if user.Id != realId {
		w.WriteHeader(404)
		return
	}

	if r.ContentLength <= 0 {
		return
	}

	var update map[string]interface{}
	body, err := ioutil.ReadAll(r.Body)
	if err == nil {
		err = json.Unmarshal(body, &update)
	}

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte(fmt.Sprintf("invalid request body")))
		return
	}

	var didChange bool
	for k, v := range update {
		switch k {
		case "first", "last", "email", "address", "city", "state", "zip":
			val, isStr := v.(string)
			if !isStr {
				w.WriteHeader(400)
				w.Write([]byte(fmt.Sprintf("unknown %s value - %s", k, v)))
				return
			}

			switch k {
			case "first":
				user.First = val
			case "last":
				user.Last = val
			case "email":
				user.Email = val
			case "address":
				user.Address = val
			case "city":
				user.City = val
			case "state":
				user.State = val
			case "zip":
				user.Zip = val
			}

			didChange = true
		case "age":
			val, isFloat := v.(float64)
			if !isFloat {
				w.WriteHeader(400)
				w.Write([]byte(fmt.Sprintf("unknown %s value - %s", k, v)))
				return
			}

			user.Age = int(val)
			didChange = true
		}
	}

	if didChange {
		SetUser(*userId, user)
	}
}
