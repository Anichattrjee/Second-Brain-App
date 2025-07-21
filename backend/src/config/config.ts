import { config as conf } from "dotenv";
conf();

const _config={
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    jwt_secret:process.env.JWT_SECRET,
    email_from:process.env.EMAIL_FROM,
    email_pass:process.env.EMAIL_PASS
};

//to make this object read only
export const config=Object.freeze(_config);