const firebaseConfig = {
    apiKey: "AIzaSyA-_8HvxJNwsrcftMmA6o983CCE6vi1jH4",
    authDomain: "eco-proyecto-parcial-ii.firebaseapp.com",
    projectId: "eco-proyecto-parcial-ii",
    storageBucket: "eco-proyecto-parcial-ii.appspot.com",
    messagingSenderId: "565887734392",
    appId: "1:565887734392:web:813a5fb8048c1c6452138d"
};

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}
