#!/bin/bash

source .env

POSTGRES="${POSTGRES_HOST}:${POSTGRES_PORT}"
REDIS="${REDIS_HOST}:${REDIS_PORT}"
echo "Wait for POSTGRES=${POSTGRES} and REDIS=${REDIS}"

wait-for-it ${POSTGRES}
wait-for-it ${REDIS}

npm run start:dev