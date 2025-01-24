import express from 'express';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"
import cors from 'cors';
var verifier = require('email-verify');

const firebaseConfig = {
    apiKey: "AIzaSyBF6gLujJZq6aW37hLGaEj_eDiqJckEoI4",
    authDomain: "scraper-c87bd.firebaseapp.com",
    projectId: "scraper-c87bd",
    storageBucket: "scraper-c87bd.firebasestorage.app",
    messagingSenderId: "941117050458",
    appId: "1:941117050458:web:8a516eb7e723b317ed1263"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);

async function getStoredParameters() {
  const docRef = doc(db, "parameters", "current");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', async (req, res) => {
  const data = await getStoredParameters();
  res.json(data);
});

app.post('/verify-email', (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  verifier.verify(email, function( err: any, info: { success: string; info: string; } ){
    if( err ) {
      console.log(err);
      res.json({success: false, info: err});
    }
    else{
      // console.log( "Success (T/F): " + info.success );
      // console.log( "Info: " + info.info );
    }
    return res.json({success: info.success, info: info.info});
  });

});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});