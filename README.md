# Temperature Agent, Server and Frontend App (MEAN stack)

This README contains bash commands to run the project locally.

You will need to have Docker installed in order to run a local instance of MongoDB.

## Local MongoDB:

```bash
docker pull mongo:6.0.5-jammy
docker run --name mongodb -d -p 27017:27017 -v $(pwd)/data:/data/db mongo:6.0.5-jammy
```

## Generate a self-signed certificate for HTTPS

From the root directory of the project:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 \
-subj "/C=GB/ST=South Yorkshire/L=Sheffield/O=Your Company Name/OU=Your Department/CN=localhost"
```

## Generate Public and Private keys

From the root directory of the project:

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

## HTTPS

Initially the browser might now allow the frontend to connect to the server because of the self-signed certificate.

To allow this open `https://localhost:5555` in the browser and accept the certificate. You will see a security warning, click on "Advanced" and then "Proceed to localhost (unsafe)".

Once this is done, the frontend should be able to connect to the server.
