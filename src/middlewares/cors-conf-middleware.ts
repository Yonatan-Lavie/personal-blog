import cors from 'cors';

// List of allowed origins
const allowedOrigins = [
  '*'
];

// Custom function to check if the origin is in the allowed list
const originIsAllowed = (origin: string | undefined): boolean => {
  return origin !== undefined && allowedOrigins.includes(origin);
};

// CORS middleware configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (originIsAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Middleware for verifying user token from the cookie
export const corsMiddleware = () => {
  return cors(corsOptions)
};
