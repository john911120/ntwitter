import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAtcZzDBLUXPz0NQcQkjeHB2hZKtg9i-BY",
    authDomain: "ntwitter-e471d.firebaseapp.com",
    projectId: "ntwitter-e471d",
    storageBucket: "ntwitter-e471d.appspot.com",
    messagingSenderId: "440821556452",
    appId: "1:440821556452:web:2e2f610042effbdcf8f8f1"
};
  
export default firebase.initializeApp(firebaseConfig)