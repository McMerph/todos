# todo-example
This is a web-based application of todo-list based on [https://github.com/reactjs/redux/tree/master/examples/todos](https://github.com/reactjs/redux/tree/master/examples/todos)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You need to install node.js and npm

[Download Node.js and npm](https://nodejs.org/en/download/) - pre-built installer

### Installing
Install required packages from npm  
    
    npm i
    
### Development

To run development server

    npm start
    
App is available in browser at  
* [http://localhost:8080](http://localhost:8080)
* [http://127.0.0.1:8080](http://127.0.0.1:8080)
* [http://<your.ip>:8080](http://<your.ip>:8080)

### Running the tests
To run tests once

    npm run test

To run tests in watch mode  

    npm run test -- --watchAll
    
### Deployment
1. Build (`npm run build`)
2. Copy 'dist' directory to server
 
## Built With
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
* [Jest](https://facebook.github.io/jest/) - JavaScript Testing
* [WebPack](https://webpack.github.io/) - Module Bundler
