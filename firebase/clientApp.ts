import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const firestore = getFirestore();

export { firestore };

export async function getAllMacth() {
    var _FM = localStorage.getItem('match_0');
    const _firstMatch = JSON.parse(_FM);
    console.log(_firstMatch.date + 20 > Date.now())
    if (_firstMatch.date + 180000 > Date.now()) {
        console.log("retrieve local data...")
        var retrievedMatch = _firstMatch;
        let i = 1;
        var _allMatch = [_firstMatch]
        while (retrievedMatch) {
            var _RM = localStorage.getItem('match_' + i);
            retrievedMatch = JSON.parse(_RM);
            if (retrievedMatch) {
                _allMatch.push(retrievedMatch)
            }
            i++;
        }
        return _allMatch;
    }
    else {
        console.log("fetch database...");
        const q = query(collection(firestore, "matchs"));
        const oui = await getDocs(q);
        let _allMatch : any[];
        _allMatch = [];
        oui.docs.map((m: any, i: number) => {
            const _obj = {
                "id": m._document.data.value.mapValue.fields.id.stringValue,
                "team1": m._document.data.value.mapValue.fields.team1.stringValue,
                "team2": m._document.data.value.mapValue.fields.team2.stringValue,
                "isEnd": m._document.data.value.mapValue.fields.isEnd.booleanValue,
                "date": Date.now()
            }
            localStorage.setItem('match_' + i, JSON.stringify(_obj));
            _allMatch.push(_obj)
        })
        return _allMatch;
    }
}