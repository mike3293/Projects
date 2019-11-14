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

const cors = require("cors")(corsOptions);

// @param {Object} req Express Request Object.
// @param {Object} res Express Response Object

async function edit(req, res, decodedUser) {
    const email = req.body.email;
    const userAuth = await auth.getUserByEmail(email);

    await auth.updateUser(userAuth.uid, {
        password: req.body.password,
        email: req.body.newEmail
    });

    console.log(`${email} edited to: ${req.body.newEmail} by ${decodedUser.email}`);
    res.end();
}

async function deleteUser(req, res, decodedUser) {
    const email = req.body.email;

    const userAuth = await auth.getUserByEmail(email);

    await auth.deleteUser(userAuth.uid);

    console.log(`${email} deleted by ${decodedUser.email}`);
    res.end();
}

async function add(req, res, decodedUser) {
    const email = req.body.email;

    await auth.createUser({
        password: req.body.password,
        email
    });

    console.log(`Added ${email}  by ${decodedUser.email}`);

    res.end();
}

async function getUsers(req, res) {
    let lastUser = req.body.lastUser;
    const pageSize = req.body.pageSize;
    const action = req.body.action;

    const usersArray = [];

    let query = db.collection("users").orderBy("login");

    if (action === "next") {
        query = query.startAfter(lastUser);
    }
    else if (action === "prev") {
        query = query.startAt(lastUser);
    }
    else if (!(action === "first")) {
        throw Error("Invalid args");
    }

    const snapshot = await query.limit(pageSize).get();

    for (let user of snapshot.docs) {
        const data = user.data();
        data.id = user.id;

        const surveysSnapshot = await db.collection("surveys").where("creator", "==", data.login).get();
        data.numberOfCreatedSurveys = surveysSnapshot.size;

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
            const decodedUser = await auth.verifyIdToken(req.get("Authorization"));
            func(req, res, decodedUser);
        };

        let funcWithAuthWithCors = async function (req, res) {
            cors(req, res, funcWithAuth.bind(null, req, res));
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