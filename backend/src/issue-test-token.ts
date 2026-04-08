import jwt from "jsonwebtoken"
import config from "./config"

const payload = {
    sub: "" // add id of user here
}

const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1h",
    issuer: config.appName
});

console.log(token);