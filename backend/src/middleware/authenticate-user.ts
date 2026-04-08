import { auth } from "express-oauth2-jwt-bearer";
import config from "../config";

const authenticateUser = auth({
    audience: config.audience,
    issuerBaseURL: config.issueBaseUrl
});

export default authenticateUser
