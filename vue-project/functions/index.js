const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const auth = admin.auth();

const db = admin.firestore();

// @param {Object} req Express Request Object.
// @param {Object} res Express Response Object


async function edit(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    // res.set('Accept', 'application/json');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
    } else {
        const decodedToken = await auth.verifyIdToken(req.body.token);
        const email = req.body.email;
        console.log(email);
        const userAuth = await auth.getUserByEmail(email);

        console.log(userAuth.uid);
        await auth.updateUser(userAuth.uid, {
            password: req.body.password,
            email: req.body.newEmail
        });

        console.log(`${email} edited: ${req.body.newEmail} : ${req.body.password} by ${decodedToken.email}`);
        res.end();
    }
}

async function deleteUser(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    // res.set('Accept', 'application/json');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
    } else {
        const decodedToken = await auth.verifyIdToken(req.body.token);
        const email = req.body.email;

        const userAuth = await auth.getUserByEmail(email);

        //console.log(userAuth.uid);
        await auth.deleteUser(userAuth.uid);

        console.log(`${email} deleted by ${decodedToken.email}`);
        res.end();
    }
}

async function add(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    // res.set('Accept', 'application/json');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
    } else {
        const decodedToken = await auth.verifyIdToken(req.body.token);
        const email = req.body.email;


        //console.log(userAuth.uid);
        await auth.createUser({
            password: req.body.password,
            email
        });

        console.log(`${email} : ${req.body.password}  by ${decodedToken.email}`);

        res.end();
    }
}

async function getUsers(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    // res.set('Accept', 'application/json');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
    } else {
        // Auth
        //await auth.verifyIdToken(req.body.token);

        // Add pagination
        let lastUser = req.body.lastUser;
        const pageSize = req.body.pageSize;
        const action = req.body.action;


        console.log(lastUser);

        const usersArray = [];

        let Snapshot;

        // if (action != "last") {
        if (lastUser === "first") {
            Snapshot = await db.collection('users').orderBy("login").limit(pageSize).get();
        }
        else {
            Snapshot = await db.collection('users').orderBy("login").startAfter(lastUser).limit(pageSize).get();
        }

        if (action === "prev") {
            Snapshot = await db.collection('users').orderBy("login").startAt(lastUser).limit(pageSize).get();
        }

        for (let user of Snapshot.docs) {
            const data = user.data();
            data.id = user.id;
            usersArray.push(data);
        }
        // } else {
        //     Snapshot = await db.collection('users').orderBy("login").startAt(lastUser).get();
        //     for (let i = Snapshot.docs.length - 6; i < Snapshot.docs.length; i++) {
        //         const data = Snapshot.docs[i].data();
        //         data.id = Snapshot.docs[i].id;
        //         usersArray.push(data);
        //     }

        // }

        console.log(JSON.stringify(usersArray));
        res.status(200).send(JSON.stringify(usersArray));
        res.end();
    }
}
module.exports = {
    delete: functions.https.onRequest(deleteUser),
    edit: functions.https.onRequest(edit),
    add: functions.https.onRequest(add),
    get: functions.https.onRequest(getUsers)
};