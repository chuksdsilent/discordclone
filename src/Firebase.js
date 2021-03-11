import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBQW8dV-5YQlO6C21LIGhZtsmYrHdsVU-E",
    authDomain: "discordclone-57065.firebaseapp.com",
    projectId: "discordclone-57065",
    storageBucket: "discordclone-57065.appspot.com",
    messagingSenderId: "563866763013",
    appId: "1:563866763013:web:db0ea1d77ef38dbbe7816c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;