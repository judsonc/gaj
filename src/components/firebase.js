import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBAQEM4GNFq0kI42Dny5l2bck8RHe2_vQc",
    authDomain: "garcomajato-d9f5d.firebaseapp.com",
    databaseURL: "https://garcomajato-d9f5d.firebaseio.com",
    storageBucket: "garcomajato-d9f5d.appspot.com",
    messagingSenderId: "977844351237"
}
const fb = firebase.initializeApp(config).database()
export default fb
