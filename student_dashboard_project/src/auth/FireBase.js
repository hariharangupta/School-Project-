import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyARWwWFNtOcBjC94Dq5s2gj0uXKxHaI4iw",
  authDomain: "student-d30dc.firebaseapp.com",
  projectId: "student-d30dc",
  storageBucket: "student-d30dc.appspot.com",
  messagingSenderId: "488170122802",
  appId: "1:488170122802:web:12e0007c45799b9893162b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
