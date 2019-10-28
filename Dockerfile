FROM golang:1.13.1-alpine3.10

ENV WD /opt/fullstack

RUN mkdir -p $WD

WORKDIR $WD

ADD . .

RUN go build -o fullstack *.go

EXPOSE 8080

CMD ["./fullstack"]
