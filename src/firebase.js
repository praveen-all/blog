import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRt0gjcShJu7uY4_bjiaNlNjH8VDua2Sk",
  authDomain: "blog-a199e.firebaseapp.com",
  projectId: "blog-a199e",
  storageBucket: "blog-a199e.appspot.com",
  messagingSenderId: "598861718283",
  appId: "1:598861718283:web:eb9a2f20b1ed1febd4b80e",
};


 const app = initializeApp(firebaseConfig);

 const auth=getAuth(app);
 const storage=getStorage(app);
 const db=getFirestore(app);

 export {auth,storage,db};