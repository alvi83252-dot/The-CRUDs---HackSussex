// Validate Auth JWT tokens for protected routes

import { auth } from "express-oauth2-jwt-bearer"
import dotenv from "dotenv";

dotenv.config();

// this proetcts routes using Auth0 JWT validation
export const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: 'https://${process.env.AUTH0_DOMAIN}/',
    tokenSigningAlg: "RS256",
});