#!/usr/bin/env bash
printf "Running unit tests in watch mode...\n"
jest --watchAll --config tools/jest/jest.config.js
