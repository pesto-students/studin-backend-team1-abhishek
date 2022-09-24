NodeJS style guide:

1.Indentation 2 spaces
2.Functions, objects and variables use camelCase
3.Constants use all caps
4.File naming for Models, Controllers and Routes use
    Test.model.js, Test.controller.js, Test.route.js


The below considerations have been followed while designing the folders in the backend:

1.Separation of concerns. 
Organizing functions and modules to ensure they have a single, clear task which ensures your code is easy to read and maintain.

2.Modular architecture. 
Composing your app in pieces that are isolated and easy to understand. This ensures your code is flexible and allows it to be recomposed for cron tasks, unit testing, etc.

To structure our API app we have used the “three-layer architecture”.

 
1. Web layer. Responsible for sending, receiving, and validating HTTP requests. Common configuration here includes routes, controllers, and middleware.
 
2. Service layer. Contains business logic.
 
3. Data access layer. Where we read and write to a database. We typically use an ORM like Mongoose or Sequelize.
 
This architecture creates a good separation of concerns that will make it easy to read and maintain the code.
 
 
1. Web layer
The web layer is where we process HTTP requests, dispatch data to the service layer, then return an HTTP response.
 
Anything dealing with the req and res objects lives here. The main abstractions we utilize in this layer are:
 
Routes. Where you declare the path of API endpoints and assign to controllers.
 
Middleware. Reusable plugins to modify requests typically used for cache control, authentication, error handling, etc.
 
Controllers. The methods that process an endpoint and unpack web layer data to dispatch to services.
 
1.1. Routes
If you have reusable functionality like cache control, access checks, or input validation, it’s a good idea to abstract these into middleware plugins.
These can then be applied on a per-route basis in the routes file.
 
1.2. Middleware
With your route modules created, you can declare them in your app index file. Note that a path prefix can also be set here.
 
1.3. Controllers
The best practice for controllers is to keep them free of business logic. Their single job is to get any relevant data from the req object and dispatch it to services. The returned value should be ready to be sent in a response using res.
 
Make sure you don’t pass any web layer objects (i.e. req, res, headers, etc) into your services. Instead, unwrap any values like URL parameters, header values, body data, etc before dispatching to the service layer.
 
3. Data access layer
The final layer to consider in our app structure is the data access layer. This is the layer that communicates with your database. Refers to the 'models'
 
 

