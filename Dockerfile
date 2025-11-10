# syntax=docker/dockerfile:1
FROM golang:1.24
WORKDIR /src
COPY <<EOF ./main.go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
EOF

# WITHOUT USING MULTI-STAGE SIZE IS "1.36GB"
RUN go build -o /bin/hello ./main.go

# USING MULTI-STAGE SIZE REDUCE FROM "1.36GB" TO "3.57MB"
FROM scratch
COPY --from=0 /bin/hello /bin/hello
ENTRYPOINT [ "/bin/hello" ]