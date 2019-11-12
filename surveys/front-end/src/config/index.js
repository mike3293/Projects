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

// TODO: async
// let firebaseConfig;

// (async function () {
//     if (process.env.NODE_ENV == "development") {
//         firebaseConfig = await import("./development");
//     }
//     else if (process.env.NODE_ENV == "production") {
//         firebaseConfig = await import("./production");
//     }
// })();

// export { firebaseConfig };