FROM golang:1.24 AS backend

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=1 GOOS=linux go build -o /backend

EXPOSE 1323

CMD ["/backend"]