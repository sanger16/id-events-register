import { APP_URL, NODE_ENV } from "../env/env.js";

export default [{
    origin: NODE_ENV === "production" ? APP_URL : '*',
    credentials: true
}]