// Not working version!!

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

const db = admin.firestore();

const whitelist = ["http://localhost:8080", "https://mike3293.github.io"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const cors = require("cors")(corsOptions);      // To change

// @param {Object} req Express Request Object.
// @param {Object} res Express Response Object

async function edit(req, res) {
    const decodedToken = await auth.verifyIdToken(req.get("Authorization"));

    const email = req.body.email;
    const userAuth = await auth.getUserByEmail(email);

    await auth.updateUser(userAuth.uid, {
        password: req.body.password,
        email: req.body.newEmail
    });

    console.log(`${email} edited to: ${req.body.newEmail} by ${decodedToken.email}`);
    res.end();
}

async function deleteUser(req, res) {
    const decodedToken = await auth.verifyIdToken(req.get("Authorization"));
    const email = req.body.email;

    const userAuth = await auth.getUserByEmail(email);

    await auth.deleteUser(userAuth.uid);

    console.log(`${email} deleted by ${decodedToken.email}`);
    res.end();
}

async function add(req, res) {
    const decodedToken = await auth.verifyIdToken(req.get("Authorization"));
    const email = req.body.email;

    await auth.createUser({
        password: req.body.password,
        email
    });

    console.log(`Added ${email}  by ${decodedToken.email}`);

    res.end();
}

async function getUsers(req, res) {
    let lastUser = req.body.lastUser;
    const pageSize = req.body.pageSize;
    const action = req.body.action;

    console.log(lastUser);

    const usersArray = [];

    let Snapshot;

    if (action === "first") {
        Snapshot = await db.collection("users").orderBy("login").limit(pageSize).get();
    }
    if (action === "next") {
        Snapshot = await db.collection("users").orderBy("login").startAfter(lastUser).limit(pageSize).get();
    }

    if (action === "prev") {
        Snapshot = await db.collection("users").orderBy("login").startAt(lastUser).limit(pageSize).get();
    }

    for (let user of Snapshot.docs) {
        const data = user.data();
        data.id = user.id;
        usersArray.push(data);
    }

    console.log(JSON.stringify(usersArray));
    res.status(200).send(JSON.stringify(usersArray));
    res.end();
}

function decorateAllProperties(functions, cors, auth, onRequest) {
    const decoratedFunctions = {};

    for (let key in functions) {
        let func = functions[key];
        let funcWithAuth = async function (req, res) {
            console.log(req + "first req");
            try {
                await auth.verifyIdToken(req.get("Authorization"));
                // console.log(func);
                func(req, res);
            } catch (e) {
                console.log(e + " first");
            }
        };

        // console.log(newFunc);
        let funcWithAuthWithCors = async function (req, res) {
            try {
                // console.log(req);
                cors(req, res, funcWithAuth.bind(null, req, res));
            } catch (e) {
                console.log(e);
            }
        }

        let funcWithAuthWithCorsWithOnRequest = onRequest(funcWithAuthWithCors);

        decoratedFunctions[key] = funcWithAuthWithCorsWithOnRequest;
    }

    return decoratedFunctions;
}

const exportedFunctions = {
    delete: deleteUser,
    edit: edit,
    add: add,
    get: getUsers
};

const exportedFunctionsWithAuthWithCorsWithOnRequest = decorateAllProperties(exportedFunctions, cors, auth, functions.https.onRequest);

module.exports = exportedFunctionsWithAuthWithCorsWithOnRequest;