![CI status](https://github.com/devcrazygit/domain_lookup.git/actions/workflows/main.yml/badge.svg)

# Domain Lookup

This project is a simple service to resolve ip address from the domain.

It is fully dockerized and helm chart template is prepared for kubernetes deployment.

## Technology Stack

- Node.js
- MySQL
- Docker and Docker Compose
- Kubernetes
- Helm

## API Specification

- /v1/tools/lookup
  This endpoint resolve only the IPv4 addresses for the given domain.

- /v1/tools/validate
  This endpoint validates if the input is an IPv4 address or not.

- /v1/history
  This endpoint retrieve latest 20 lookup queries

## Running Locally

Please run the following command

```
> git clone https://github.com/devcrazygit/domain_lookup.git
> cd domain_lookup
> docker-compose up -d --build
```

### Monitoring by Prometheus

Prometheus monitoring dashboard url: http://localhost:9090

You can query time series monitoring data using Prometheus Template query on the Graph Tab

## Deploy on the Kubernetes

### Prerequisite

- A Kubernetes cluster
- Deciding what security configurations to apply to your installation, if any
- Installing and configuring Helm.

### Helm Install

You should provide database url to the Kubernetes secret. Database Url format is:

```
mysql://<username>:<password>@<host>:<port>/<db_name>
```

Then you have to encode the url by the base64 Encoding, and write it into `api-deploy/templates/secret.yaml`

```
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "api-deploy.fullname" . }}
data:
  database-url: [-- Encoded String --]
```

Then run the following command

```
> helm install api-deploy ./api-deploy
```

To uninstall the package, then

```
> helm uninstall api-deploy
```
