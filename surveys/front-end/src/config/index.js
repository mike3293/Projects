import dev from "./development";
import prod from "./production";

let appConfig;

if (process.env.NODE_ENV == "development") {
    appConfig = dev;
}
else if (process.env.NODE_ENV == "production") {
    appConfig = prod;
}

export { appConfig };