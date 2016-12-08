import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBAQEM4GNFq0kI42Dny5l2bck8RHe2_vQc",
    authDomain: "garcomajato-d9f5d.firebaseapp.com",
    databaseURL: "https://garcomajato-d9f5d.firebaseio.com",
    storageBucket: "garcomajato-d9f5d.appspot.com",
    messagingSenderId: "977844351237"
}
firebase.initializeApp(config)
export var fb = firebase
export var database = firebase.database()
export var refAcesso = database.ref('acessos')
export var refQuestionarios = database.ref('questionarios')
export var refPerguntas = database.ref('perguntas')
export var refRespostas = database.ref('respostas')
export var refRestaurantes = database.ref('restaurantes')

