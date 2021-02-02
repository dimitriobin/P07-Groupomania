# P07-Groupomania
"Créez un réseau social d’entreprise"

## Prerequisites ##
You will need to have npm and NodeJS installed on your machine

## Environment ##
This project has been made with the following dependencies. 
Too se the full list of dependencies, please look through each package.json

### Backend ###
* [NodeJS](https://nodejs.org/en/) v12.18.4
* [npm](https://www.npmjs.com/) v6.14.6
* [Express](https://expressjs.com/fr/) v4.17.1
* [Sequelize](https://sequelize.org/master/) v6.3.5
* [Mysql2](https://www.npmjs.com/package/mysql2) v2.2.5
* [MySQL Server](https://www.mysql.com/fr/) v8.0.22

### Frontend ###
* [VueJS](https://vuejs.org/) v2.6.11
* [axios](https://www.mysql.com/fr/) v0.21.0
* [bootstrap-vue](https://www.mysql.com/fr/) v2.19.0

## Installation ##
First of all, clone this repository. Then run through the following explanations.
### Backend ###
1. Run the following command in your terminal

    `cd back_end/`
    
    `npm install`

2. Rename `.env.sample` into `.env` and set your environment like the following example:

    * PORT='here is the port, by default it is set to 3000'
    * DB_NAME='here is the database name'
    * DB_PASSWORD='here is your database's user password'
    * DB_HOST='here is the host like localhost'
    * DB_USER='here is your database's user name'
    * DB_DIALECT='like mysql, mariadb, postgres, mssql'
    * TOKEN_SECRET='here is the secret passphrase that will be used to create the authentication token'

3. Run the server with the following command:

    `npm run start `

### Frontend ###
1. Run the following command in your terminal

    `cd front_end`
    
    `npm install`

2. Then run front end server with the following line in your terminal, the server should run on localhost with port 8080

    `npm run serve`

If there is any error with the serve command, please try the following line:

    `npm run lint`

## Documentations ##
You can find the API's documentation at the following : 
`localhost:3000/api/docs`


## DEMONSTRATION ##
You can connect two demo account with the following : 
`email: Demo1@mail.com || password: Motdepasse123!` 
`email: Demo2@mail.com || password: Motdepasse123!`

## Vulnerabilities are checked with snyk.io and deepscan.io ##
[![Known Vulnerabilities](https://snyk.io/test/github/dimitriobin/P07-Groupomania/badge.svg?targetFile=back_end/package.json)](https://snyk.io/test/github/dimitriobin/P07-Groupomania?targetFile=back_end/package.json)
[![DeepScan grade](https://deepscan.io/api/teams/11502/projects/14691/branches/278093/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11502&pid=14691&bid=278093)
