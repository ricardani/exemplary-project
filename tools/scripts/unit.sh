#!/usr/bin/env bash
printf "Running unit tests...\n"
jest --config tools/jest/jest.config.js
printf "Unit tests passed!\n"
