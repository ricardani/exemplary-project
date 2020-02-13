#!/usr/bin/env bash
set -e
printf "Running linting...\n"
printf "Checking js and jsx files...\n"
eslint "src/**/*.{js,jsx}"
printf "Checking scss files...\n"
stylelint "**/*.scss"
printf "Lint passed!\n"
