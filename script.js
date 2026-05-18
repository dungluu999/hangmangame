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

let selectedWord = "";

let hiddenWord = [];

let usedWords = [];

let lives = 6;

let score = 0;

let playerName = "";

function startLogin(){

    playerName =
        document.getElementById("playerName").value;

    if(playerName === ""){

        alert("Enter your name!");

        return;
    }

    document
        .getElementById("loginBox")
        .classList.add("hidden");

    document
        .getElementById("gameBox")
        .classList.remove("hidden");

    document
        .getElementById("rankBox")
        .classList.remove("hidden");

    document
        .getElementById("playerText").innerText =
        "Player: " + playerName;

    startGame();
}

function startGame(){

    if(usedWords.length === words.length){

        document.getElementById("message").innerText =
            "🎉 All Words Completed!";

        saveScore();

        disableKeyboard();

        return;
    }

    do{

        selectedWord =
            words[Math.floor(Math.random() * words.length)];

    }while(usedWords.includes(selectedWord));

    hiddenWord = [];

    lives = 6;

    for(let char of selectedWord){

        if(char === " "){

            hiddenWord.push(" ");
        }
        else{

            hiddenWord.push("_");
        }
    }

    giveRandomHints();

    createKeyboard();

    updateScreen();

    clearCanvas();

    document.getElementById("message").innerText =
        "Game Started!";
}

function giveRandomHints(){

    let amount =
        Math.floor(Math.random() * 2) + 2;

    let indexes = [];

    for(let i = 0; i < selectedWord.length; i++){

        if(selectedWord[i] !== " "){

            indexes.push(i);
        }
    }

    for(let i = 0; i < amount; i++){

        if(indexes.length <= 0){
            break;
        }

        let random =
            Math.floor(Math.random() * indexes.length);

        let index =
            indexes[random];

        hiddenWord[index] =
            selectedWord[index];

        indexes.splice(random,1);
    }
}

function updateScreen(){

    let html = "";

    let wordsArray =
        hiddenWord.join("").split(" ");

    for(let word of wordsArray){

        html += `<div class="word">`;

        for(let char of word){

            html += `
            <span class="letter">
                ${char}
            </span>
            `;
        }

        html += `</div>`;
    }

    document.getElementById("wordDisplay").innerHTML =
        html;

    document.getElementById("lives").innerText =
        lives;

    document.getElementById("score").innerText =
        score;
}

function createKeyboard(){

    const keyboard =
        document.getElementById("keyboard");

    keyboard.innerHTML = "";

    for(let letter of alphabet){

        const btn =
            document.createElement("button");

        btn.innerText = letter;

        btn.classList.add("letter-btn");

        btn.onclick = function(){

            guessLetter(letter, btn);
        };

        keyboard.appendChild(btn);
    }
}

function guessLetter(letter, button){

    button.disabled = true;

    let correct = false;

    for(let i = 0; i < selectedWord.length; i++){

        if(selectedWord[i] === letter){

            hiddenWord[i] = letter;

            correct = true;

            score += 10;
        }
    }

    if(correct){

        document.getElementById("message").innerText =
            "✅ Correct!";
    }
    else{

        lives--;

        drawHangman();

        document.getElementById("message").innerText =
            "❌ Wrong!";
    }

    updateScreen();

    checkGame();
}

function checkGame(){

    if(!hiddenWord.includes("_")){

        disableKeyboard();

        usedWords.push(selectedWord);

        document.getElementById("message").innerText =
            "🎉 You Win!";

        setTimeout(() => {

            startGame();

        }, 2000);
    }

    if(lives <= 0){

        disableKeyboard();

        document.getElementById("message").innerText =
            "💀 Game Over! Word: "
            + selectedWord;

        saveScore();
    }
}

function disableKeyboard(){

    const buttons =
        document.querySelectorAll(".letter-btn");

    buttons.forEach(btn => {

        btn.disabled = true;
    });
}

function saveScore(){

    const li =
        document.createElement("li");

    li.innerText =
        playerName +
        " : " +
        score +
        " points";

    document
        .getElementById("rankList")
        .appendChild(li);
}


function clearCanvas(){

    const canvas =
        document.getElementById("hangmanCanvas");

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.lineWidth = 5;

    // GIÁ TREO MÀU ĐỎ

    ctx.strokeStyle = "red";

    // Đế

    ctx.beginPath();

    ctx.moveTo(20,280);

    ctx.lineTo(150,280);

    ctx.stroke();

    // Cột dọc

    ctx.beginPath();

    ctx.moveTo(80,280);

    ctx.lineTo(80,40);

    ctx.stroke();

    // Thanh ngang

    ctx.beginPath();

    ctx.moveTo(80,40);

    ctx.lineTo(200,40);

    ctx.stroke();

    // Dây treo

    ctx.beginPath();

    ctx.moveTo(200,40);

    ctx.lineTo(200,70);

    ctx.stroke();
}
function drawHangman(){

    const canvas =
        document.getElementById("hangmanCanvas");

    const ctx =
        canvas.getContext("2d");

    ctx.lineWidth = 5;

    // NHÂN VẬT MÀU ĐEN

    ctx.strokeStyle = "black";

    switch(lives){

        // ĐẦU

        case 5:

            ctx.beginPath();

            ctx.arc(
                200,
                95,
                25,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            break;

        // THÂN

        case 4:

            ctx.beginPath();

            ctx.moveTo(200,120);

            ctx.lineTo(200,190);

            ctx.stroke();

            break;

        // TAY TRÁI

        case 3:

            ctx.beginPath();

            ctx.moveTo(200,140);

            ctx.lineTo(170,170);

            ctx.stroke();

            break;

        // TAY PHẢI

        case 2:

            ctx.beginPath();

            ctx.moveTo(200,140);

            ctx.lineTo(230,170);

            ctx.stroke();

            break;

        // CHÂN TRÁI

        case 1:

            ctx.beginPath();

            ctx.moveTo(200,190);

            ctx.lineTo(170,230);

            ctx.stroke();

            break;

        // CHÂN PHẢI

        case 0:

            ctx.beginPath();

            ctx.moveTo(200,190);

            ctx.lineTo(230,230);

            ctx.stroke();

            break;
    }
}
