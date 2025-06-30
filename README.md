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

1.  Build the Docker image:
    ```bash
    docker build -t us-zips .
    ```

2.  Run the Docker container:
    ```bash
    docker run -p 4000:4000 us-zips
    ```

## Example Queries

### Get ZIP by Code

```graphql
{
  getZipByCode(zip: "90210") {
    city
    state_name
  }
}
```

### Get ZIPs by State

```graphql
{
  getZipsByState(state_name: "California") {
    zip
    city
  }
}
```
