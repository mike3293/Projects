const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: "http://localhost:8080" });      // To change

admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

const db = admin.firestore();

// @param {Object} req Express Request Object.
// @param {Object} res Express Response Object

async function edit(req, res) {
    cors(req, res, async function () {
        const decodedToken = await auth.verifyIdToken(req.get("Authorization"));
        const email = req.body.email;
        const userAuth = await auth.getUserByEmail(email);

        await auth.updateUser(userAuth.uid, {
            password: req.body.password,
            email: req.body.newEmail
        });

        console.log(`${email} edited: ${req.body.newEmail} : ${req.body.password} by ${decodedToken.email}`);
        res.end();
    });
}

async function deleteUser(req, res) {
    cors(req, res, async function () {
        const decodedToken = await auth.verifyIdToken(req.get("Authorization"));
        const email = req.body.email;

        const userAuth = await auth.getUserByEmail(email);

        await auth.deleteUser(userAuth.uid);

        console.log(`${email} deleted by ${decodedToken.email}`);
        res.end();
    });
}

async function add(req, res) {
    cors(req, res, async function () {
        const decodedToken = await auth.verifyIdToken(req.get("Authorization"));
        const email = req.body.email;

        await auth.createUser({
            password: req.body.password,
            email
        });

        console.log(`${email} : ${req.body.password}  by ${decodedToken.email}`);

        res.end();
    });
}

async function getUsers(req, res) {
    cors(req, res, async function () {
        await auth.verifyIdToken(req.get("Authorization"));

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
    });
}

module.exports = {
    delete: functions.https.onRequest(deleteUser),
    edit: functions.https.onRequest(edit),
    add: functions.https.onRequest(add),
    get: functions.https.onRequest(getUsers)
};