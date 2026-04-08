const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "5000"),
    debug: process.env.APP_DEBUG === "true",
    jwtSecret: process.env.JWT_SECRET || "",
    appName: process.env.APP_NAME || "",
    issueBaseUrl: process.env.ISSUER_BASE_URL || "",
    audience: process.env.AUDIENCE || "",
    logLevel: process.env.LOG_LEVEL || "info"
};

export default config;