import {
    initializeApp
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
    update,
    onValue
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ================== FIREBASE ==================

const firebaseConfig = {

    apiKey:
    "AIzaSyC8grDi3wq5gusjMSopjdO1H3C2jwjeN5s",

    authDomain:
    "hangman-510ab.firebaseapp.com",

    databaseURL:
    "https://hangman-510ab-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
    "hangman-510ab",

    storageBucket:
    "hangman-510ab.firebasestorage.app",

    messagingSenderId:
    "202602694664",

    appId:
    "1:202602694664:web:f750efa1906cdaf0aaa9bd"
};

const app =
initializeApp(
firebaseConfig
);

const db =
getDatabase(app);

// ================== PLAYER COUNT ==================

window.addPlayerCount =
async function(){

    const playerRef =
    ref(
    db,
    "server/totalPlayers"
    );

    const snapshot =
    await get(
    playerRef
    );

    let count =
    snapshot.exists()
    ?
    snapshot.val()
    :
    0;

    await set(
    playerRef,
    count + 1
    );
};

// ================== TOTAL SCORE ==================

window.updateTotalScore =
async function(points){

    const scoreRef =
    ref(
    db,
    "server/totalScore"
    );

    const snapshot =
    await get(
    scoreRef
    );

    let total =
    snapshot.exists()
    ?
    snapshot.val()
    :
    0;

    await set(
    scoreRef,
    total + points
    );
};

// ================== SAVE PLAYER ==================

window.savePlayer =
async function(){

    if(
    !playerName
    ) return;

    await update(
    ref(
    db,
    "players/" +
    playerName
    ),
    {

        name:
        playerName,

        score:
        score
    });
};

// ================== ADMIN DATA ==================

window.loadAdminData =
function(){

    // TOTAL PLAYERS
    onValue(
    ref(
    db,
    "server/totalPlayers"
    ),
    (snapshot)=>{

        document
        .getElementById(
        "totalPlayers"
        )
        .innerText =
        snapshot.val()
        || 0;
    });

    // TOTAL SCORE
    onValue(
    ref(
    db,
    "server/totalScore"
    ),
    (snapshot)=>{

        document
        .getElementById(
        "totalScore"
        )
        .innerText =
        snapshot.val()
        || 0;
    });

    // TOP PLAYERS
    onValue(
    ref(
    db,
    "players"
    ),
    (snapshot)=>{

        const data =
        snapshot.val();

        const list =
        document
        .getElementById(
        "topPlayers"
        );

        list.innerHTML =
        "";

        if(!data)
        return;

        const players =
        Object.values(
        data
        );

        players.sort(
        (
        a,
        b
        )=>
        b.score -
        a.score
        );

        players
        .slice(0,10)
        .forEach(
        player=>{

            const li =
            document
            .createElement(
            "li"
            );

            li.innerText =
            player.name
            +
            " ⭐ "
            +
            player.score;

            list
            .appendChild(
            li
            );
        });
    });
};