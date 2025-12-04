import express from 'express';
import { Router } from 'express';
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.json()); // predefined middleware to parse JSON bodies

app.use('/about',(req, res, next) => {
  console.log(`Hello Middleware! from app.js for about page`);
  next();
});


app.use((req, res, next) => {
  console.log("start");
  res.on('finish', () => {
    console.log("end");
  });
  next();
});

const router = Router();

app.use('/', router); // mount the router




router.get('/', (req, res) => {
  console.log(' in the home route');
  res.send('Hello, World!'); // response to client

}); // route handler

router.get('/about', (req, res) => {
  console.log(`Hello  from router for about page`);
  res.send('About Page');
});

router.get('/contact', (req, res) => {
  const err = new Error('Simulated error in contact route'); // Simulate an error
  err.message = 'Contact Page Error';
  err.statusCode = 300;
  err.status = 'error';
  throw err; // Throw the error to be caught by error-handling middleware
});

router.get('/error', (req, res, next) => {
  const err = new Error('This is a forced error.');
  err.statusCode = 400;
  err.status = 'fail';
  err.message = 'Bad Request - Forced Error';
  next(err); // Pass the error to the error-handling middleware
});

// Error Middleware global handler
app.use((err, req, res, next) => {
  console.log(`Error middleware called ${err.message} err.statusCode: ${err.statusCode}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // fail or error

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
  // res.send("Something went wrong!");
});

export default app;