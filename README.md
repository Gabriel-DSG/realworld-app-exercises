# Real World App - Test Automation Project

This repository contains the automated tests for the **Real World App (RWA)** project, developed as part of the **Guardião da Qualidade PRO** mentorship program.

## Overview
The goal of this project is to validate RWA functionalities using automated tests with **Cypress**. The tests include scenarios such as user login, user registration, money transfer, and transaction history.

## Test Plan
The Test Plan for this project is available on Google Sheets. Access it through the link below:

[Test Plan - Google Sheets](https://docs.google.com/spreadsheets/d/1gDU7xbMhii7PtfbyhHrVzSR2kK9Fn4Few-NMLNloF50/edit?usp=sharing)

## Prerequisites
Before starting, ensure you have the following tools installed on your machine:
- [Node.js](https://nodejs.org/)
- Yarn Classic is also required. Once you have Node.js installed, execute the following to install the npm module yarn:
```bash
npm install yarn@latest -g
```

### 1. Install and run Real World App
Access the official Real World App (RWA) repository and follow the instructions to run the application locally.
```bash
git clone https://github.com/cypress-io/cypress-realworld-app.git
cd cypress-realworld-app
yarn
```
Run the App:
```bash
yarn dev
```
### 2. Clone this repository
Inside the RWA root folder, clone this repository to add the automated tests.
```bash
git clone https://github.com/Gabriel-DSG/realworld-app-exercises.git
cd realworld-app-exercises
```

### 3. Start Cypress
Inside the "realworld-app-exercises" folder, start Cypress:
```bash
npx cypress open
```





