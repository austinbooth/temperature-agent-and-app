# Temperature Agent, Server and Frontend App (MEAN stack)

This README contains bash commands to run the project locally.

You will need to have Docker installed in order to run a local instance of MongoDB.

## Local MongoDB:

```bash
docker pull mongo:6.0.5-jammy
docker run --name mongodb -d -p 27017:27017 -v $(pwd)/data:/data/db mongo:6.0.5-jammy
```

## Generate Public and Private keys

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Running all services

From the root directory of the project:

```bash
npm install
npm run devInstall
npm run dev
```

This should run the temperature agent, server and frontend app, and open a browser tab for the Angular frontend (http://localhost:4200/).
