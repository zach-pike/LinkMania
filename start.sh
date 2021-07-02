#!/bin/bash

cd app/ && npm i && npm run build

cd ../

cd server/ && npm i && node main.js