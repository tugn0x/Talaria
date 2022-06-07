#!/bin/bash
# Deploy script for DevNilde server: it run all docker container (NILDE+RSCVD)
docker-compose -f docker-compose.yml -f docker-compose.devdeploy.yml up -d