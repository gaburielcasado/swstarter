#!/usr/bin/env bash
docker-compose down --volumes --remove-orphans
docker-compose up --build
