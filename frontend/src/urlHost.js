export const URL_HOST =
    process.env.NODE_ENV === "production"
    ? "http://personalcrmbackend.us-east-1.elasticbeanstalk.com/"
    : "http://127.0.0.1:8000";