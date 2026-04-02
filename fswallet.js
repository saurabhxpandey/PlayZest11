// fswallet.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTJE-s-UPrvL3824m8kakqUCZHYbAPpug",
  authDomain: "playzest11.firebaseapp.com",
  projectId: "playzest11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const FSWallet = {

  async initFirestore() {
    console.log("Firestore connected");
  },

  async getUserWallet() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.email) {
        console.error("User not found");
        return 0;
    }

    const ref = doc(db, "users", user.email.toLowerCase());
    const snap = await getDoc(ref);

    return snap.exists() ? snap.data().wallet || 0 : 0;
  }

};
