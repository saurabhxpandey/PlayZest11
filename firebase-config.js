import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDTJE-s-UPrvL3824m8kakqUCZHYbAPpug",
    authDomain: "playzest11.firebaseapp.com",
    projectId: "playzest11",
    storageBucket: "playzest11.firebasestorage.app",
    messagingSenderId: "465045882002",
    appId: "1:465045882002:web:7653d2ad9f26e7ecbe124b",
    measurementId: "G-TSS8JKGEDJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
