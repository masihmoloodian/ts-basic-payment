## Requirements

-   Postgres
-   Redis

## Run Project

npm i && npm run start  
Or  
docker-compose up

server running on port 4200  
swagger runnung on /docs

## Role and Permission

superadmin define by username at .env called SUPER_USER_USERNAME  
permission decorator support multiple Role (each role can have multiple permissions) with AND/OR condition
