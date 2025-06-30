# US ZIP Code Information Service

This project provides a GraphQL API for querying US ZIP code information.

## Local Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the server:
    ```bash
    npm run dev
    ```

## Docker

### Local Development

1.  Build the Docker image:
    ```bash
    docker build -t us-zips .
    ```

2.  Run the Docker container:
    ```bash
    docker run -p 4000:4000 us-zips
    ```

### Deployment to Docker Hub

1.  Make the deployment script executable:
    ```bash
    chmod +x scripts/deploy.sh
    ```

2.  Set your Docker Hub password as an environment variable:
    ```bash
    export DOCKER_PASSWORD=your_dockerhub_password
    ```

3.  Run the deployment script (optionally specify a version):
    ```bash
    # Deploy as 'latest'
    ./scripts/deploy.sh
    
    # Or specify a version
    ./scripts/deploy.sh 1.0.0
    ```

4.  Pull and run the deployed image:
    ```bash
    docker run -p 4000:4000 iamrommel/us-zips:latest
    # or with a specific version
    docker run -p 4000:4000 iamrommel/us-zips:1.0.0
    ```

## End Points
/address/zip/{zipCode} - Returns the address for a given ZIP code.
/address/state/{stateId} - Returns the address for a given state ID. 

 
