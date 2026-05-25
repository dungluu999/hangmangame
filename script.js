const words = [

    "BACKPACK",
    "MOBILE PHONE",
    "POWER BANK",
    "SUIT",
    "PASSPORT",
    "RAINCOAT",
    "HAT",
    "WARM CLOTHES",
    "WATER BOTTLE",
    "SNACKS",
    "UMBRELLA",
    "FIRST AID KIT",
    "BANDAGES",
    "MEDICINE",
    "SUNSCREEN"
];

const alphabet =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ADMIN_PASSWORD =
"luutandung08022005";

let selectedWord = "";
let hiddenWord = [];
let usedWords = [];
let lives = 6;
let score = 0;
let playerName = "";

// ================== BUTTONS ==================

document
.getElementById("startBtn")
.addEventListener(
"click",
startLogin
);

document
.getElementById("adminBtn")
.addEventListener(
"click",
()=>{
document
.getElementById(
"adminLoginBox"
)
.classList
.toggle("hidden");
});

document
.getElementById(
"loginAdminBtn"
)
.addEventListener(
"click",
adminLogin
);

// ================== LOGIN ==================

function startLogin(){

    playerName =
    document
    .getElementById(
    "playerName"
    )
    .value.trim();

    if(playerName === ""){

        alert(
        "Please enter name!"
        );
        return;
    }

    document
    .getElementById(
    "loginBox"
    )
    .classList
    .add("hidden");

    document
    .getElementById(
    "gameBox"
    )
    .classList
    .remove("hidden");

    document
    .getElementById(
    "rankBox"
    )
    .classList
    .remove("hidden");

    document
    .getElementById(
    "playerText"
    )
    .innerText =
    "Player: " +
    playerName;

    addPlayerCount();

    startGame();
}

// ================== ADMIN ==================

function adminLogin(){

    const pass =
    document
    .getElementById(
    "adminPassword"
    )
    .value;

    if(
    pass ===
    ADMIN_PASSWORD
    ){

        document
        .getElementById(
        "adminBox"
        )
        .classList
        .remove("hidden");

        document
        .getElementById(
        "adminLoginBox"
        )
        .classList
        .add("hidden");

        loadAdminData();

    }else{

        document
        .getElementById(
        "adminError"
        )
        .innerText =
        "Wrong password!";
    }
}

// ================== GAME ==================

function startGame(){

    if(
    usedWords.length ===
    words.length
    ){

        document
        .getElementById(
        "message"
        )
        .innerText =
        "🎉 All Words Completed!";

        return;
    }

    do{

        selectedWord =
        words[
        Math.floor(
        Math.random()
        *
        words.length
        )
        ];

    }while(
    usedWords.includes(
    selectedWord
    )
    );

    hiddenWord = [];
    lives = 6;

    for(
    let char
    of selectedWord
    ){

        if(
        char === " "
        ){

            hiddenWord
            .push(" ");

        }else{

            hiddenWord
            .push("_");
        }
    }

    giveHints();

    createKeyboard();

    updateScreen();

    clearCanvas();
}

function giveHints(){

    let amount =
    Math.floor(
    Math.random()*2
    ) + 2;

    let indexes = [];

    for(
    let i = 0;
    i < selectedWord.length;
    i++
    ){

        if(
        selectedWord[i]
        !== " "
        ){

            indexes.push(i);
        }
    }

    for(
    let i = 0;
    i < amount;
    i++
    ){

        let random =
        Math.floor(
        Math.random()
        *
        indexes.length
        );

        let index =
        indexes[random];

        hiddenWord[index] =
        selectedWord[index];

        indexes.splice(
        random,
        1
        );
    }
}

function updateScreen(){

    let html = "";

    let wordsArray =
    hiddenWord
    .join("")
    .split(" ");

    for(
    let word
    of wordsArray
    ){

        html +=
        `<div class="word">`;

        for(
        let char
        of word
        ){

            html += `
            <span
            class="letter">
            ${char}
            </span>
            `;
        }

        html +=
        `</div>`;
    }

    document
    .getElementById(
    "wordDisplay"
    )
    .innerHTML =
    html;

    document
    .getElementById(
    "lives"
    )
    .innerText =
    lives;

    document
    .getElementById(
    "score"
    )
    .innerText =
    score;
}

// ================== KEYBOARD ==================

function createKeyboard(){

    const keyboard =
    document
    .getElementById(
    "keyboard"
    );

    keyboard.innerHTML =
    "";

    for(
    let letter
    of alphabet
    ){

        const btn =
        document
        .createElement(
        "button"
        );

        btn.innerText =
        letter;

        btn.classList
        .add(
        "letter-btn"
        );

        btn.onclick =
        function(){

            guessLetter(
            letter,
            btn
            );
        };

        keyboard
        .appendChild(btn);
    }
}

function guessLetter(
letter,
button
){

    button.disabled =
    true;

    let correct =
    false;

    for(
    let i = 0;
    i <
    selectedWord.length;
    i++
    ){

        if(
        selectedWord[i]
        === letter
        ){

            hiddenWord[i]
            = letter;

            correct =
            true;

            score += 10;

            updateTotalScore(
            10
            );
        }
    }

    if(correct){

        document
        .getElementById(
        "message"
        )
        .innerText =
        "✅ Correct!";

    }else{

        lives--;

        drawHangman();

        document
        .getElementById(
        "message"
        )
        .innerText =
        "❌ Wrong!";
    }

    updateScreen();
    checkGame();
}

function checkGame(){

    if(
    !hiddenWord
    .includes("_")
    ){

        usedWords.push(
        selectedWord
        );

        savePlayer();

        document
        .getElementById(
        "message"
        )
        .innerText =
        "🎉 You Win!";

        disableKeyboard();

        setTimeout(
        ()=>{
        startGame();
        },2000);
    }

    if(
    lives <= 0
    ){

        document
        .getElementById(
        "message"
        )
        .innerText =
        "💀 Game Over";

        savePlayer();

        disableKeyboard();
    }
}

function disableKeyboard(){

    const buttons =
    document
    .querySelectorAll(
    ".letter-btn"
    );

    buttons
    .forEach(btn=>{

        btn.disabled =
        true;
    });
}

// ================== CANVAS ==================

function clearCanvas(){

    const canvas =
    document
    .getElementById(
    "hangmanCanvas"
    );

    const ctx =
    canvas
    .getContext("2d");

    ctx.clearRect(
    0,0,
    canvas.width,
    canvas.height
    );

    ctx.lineWidth =
    5;

    ctx.strokeStyle =
    "red";

    ctx.beginPath();
    ctx.moveTo(20,280);
    ctx.lineTo(150,280);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80,280);
    ctx.lineTo(80,40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80,40);
    ctx.lineTo(200,40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200,40);
    ctx.lineTo(200,70);
    ctx.stroke();
}

function drawHangman(){

    const canvas =
    document
    .getElementById(
    "hangmanCanvas"
    );

    const ctx =
    canvas
    .getContext("2d");

    ctx.lineWidth = 5;
    ctx.strokeStyle =
    "black";

    switch(lives){

        case 5:
        ctx.beginPath();
        ctx.arc(
        200,
        95,
        25,
        0,
        Math.PI*2
        );
        ctx.stroke();
        break;

        case 4:
        ctx.beginPath();
        ctx.moveTo(
        200,120
        );
        ctx.lineTo(
        200,190
        );
        ctx.stroke();
        break;
    }
}
