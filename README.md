
# Steps to run the backend for StudIn

1. `npm install`

2. `npm run dev` to start the backend with nodemon
(or)
2. `node server.js` to start the backend without nodemon

3. `lint:check` to verify style guide

4. `lint:fix` to fix by style guide recommendations




# Backend Architecture - MRC pattern is used for the separation of concerns.

## NodeJS style guide
## Google styleguide has been used in the backend

1. Indentation 2 spaces
2. Functions, objects and variables use camelCase
3. Constants use all caps
4. File naming for Models, Controllers and Routes use
    Test.model.js, Test.controller.js, Test.route.js


## The below considerations have been followed while designing the folders in the backend:

1. Separation of concerns. 
Organizing functions and modules to ensure they have a single, clear task which ensures your code is easy to read and maintain.

2. Modular architecture. 
Composing your app in pieces that are isolated and easy to understand. This ensures your code is flexible and allows it to be recomposed for cron tasks, unit testing, etc.

## To structure our API app we have used the “three-layer architecture”.

1. Web layer. 
Responsible for sending, receiving, and validating HTTP requests. Common configuration here includes routes, controllers, and middleware.
 
2. Service layer. 
Contains business logic.
 
3. Data access layer. 
Where we read and write to a database. We typically use an ORM like Mongoose or Sequelize.
 
This architecture creates a good separation of concerns that will make it easy to read and maintain the code.
