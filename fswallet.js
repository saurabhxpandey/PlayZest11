// fswallet.js

import { db } from "./firebase-config.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
