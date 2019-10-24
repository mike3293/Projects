import dev from "./development";
import prod from "./production";

let firebaseConfig;

if (process.env.NODE_ENV == "development") {
    firebaseConfig = dev;
}
else if (process.env.NODE_ENV == "production") {
    firebaseConfig = prod;
}

export { firebaseConfig };

// let firebaseConfig;

// (async function () {
//     if (process.env.NODE_ENV == "development") {
//         firebaseConfig = await import('./development');
//     }
//     else if (process.env.NODE_ENV == "production") {
//         firebaseConfig = await import('./production');
//     }
// })();

// export { firebaseConfig };