Mention two parts of Express that you learned about this week.

1. The Router object

    - The `Router` object is an isolated instance of express middleware and routes. You can use the `Router` object to compose isolated, mini-instances of Express into a larger application.

2. The Application object

    - The `Application` object is the top level function exported from Express. It carries along with it all of Express's built-in middleware, as well as routing capabilities.

Describe Middleware?

Middleware is re-usable modules of code that you can run during your application's code execution. Within the Express ecosystem, middleware is run during the request handling process. Express executes middleware top --> bottom and left --> right.

Describe a Resource?

What can the API return to help clients know if a request was successful?

How can we partition our application into sub-applications?