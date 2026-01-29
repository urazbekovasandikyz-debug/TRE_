// ========== ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ==========
const pages=document.querySelectorAll(".page");
function openPage(id){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="games") resetGames();
}

// ========== МУЗЫКА ==========
const music=document.getElementById("music");
function toggleMusic(){ music.paused?music.play():music.pause(); }

// ========== НИК ==========
function saveNick(){
  localStorage.setItem("nick",nick.value);
  nickView.textContent="👤 "+nick.value;
}
nickView.textContent="👤 "+(localStorage.getItem("nick")||"");

// ========== КАМЕНЬ-НОЖНИЦЫ-БУМАГА ==========
function playRPS(user){
  const map={rock:"🪨",scissors:"✂️",paper:"🧻"};
  const arr=["rock","scissors","paper"];
  const bot=arr[Math.floor(Math.random()*3)];

  let result="Ничья 🤝";
  if((user==="rock"&&bot==="scissors")||(user==="scissors"&&bot==="paper")||(user==="paper"&&bot==="rock"))
    result="🎉 Ты выиграл!";
  if(user!==bot&&result==="Ничья 🤝") result="😢 Ты проиграл";

  rpsResult.innerHTML=`Ты: ${map[user]} <br>Бот: ${map[bot]} <br><span class="${result.includes("выиграл")?"win":""}">${result}</span>`;
}

// ========== КРЕСТИКИ-НОЛИКИ ==========
const ttt=document.getElementById("ttt");
let board=[],gameOver=false;
const tttStatus=document.getElementById("tttStatus");

function resetGames(){
  rpsResult.textContent="";
  ttt.innerHTML=""; board=Array(9).fill(""); gameOver=false; tttStatus.textContent="";
  board.forEach((_,i)=>{
    const cell=document.createElement("div");
    cell.onclick=()=>move(i,cell);
    ttt.appendChild(cell);
  });
}

function move(i,cell){
  if(board[i]||gameOver) return;
  board[i]="❌"; cell.textContent="❌";
  if(checkWin("❌")) return win("🎉 Ты выиграл!");
  setTimeout(botMove,400);
}

function botMove(){
  const empty=board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  if(!empty.length) return;
  const i=empty[Math.floor(Math.random()*empty.length)];
  board[i]="⭕"; ttt.children[i].textContent="⭕";
  if(checkWin("⭕")) win("😢 Бот выиграл");
}

function checkWin(sym){
  const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return w.some(c=>c.every(i=>board[i]===sym));
}

function win(text){
  gameOver=true;
  tttStatus.innerHTML=`<span class="win">${text}</span><br><button onclick="resetGames()">🔁 Еще раз</button>`;
}

// ========== КЕСТЕ ==========
const kesteData={
1:[{name:"Қазақ тілі",time:"8:00-8:45"},{name:"Дж/Тарих",time:"8:50-9:35"},{name:"Алгебра",time:"9:40-10:30"},{name:"Құқық негіздері",time:"10:40-11:25"},{name:"Ағылшын",time:"11:30-12:15"},{name:"География (ф)",time:"12:20-13:05"},{name:"Дене шынықтыру",time:"13:10-13:55"},{name:"Сынып сағаты",time:"14:00-14:45"}],
2:[{name:"Қазақ әдебиет",time:"8:00-8:45"},{name:"Информатика",time:"8:50-9:35"},{name:"Қазақ т (ф)",time:"9:40-10:30"},{name:"Геометрия",time:"10:40-11:25"},{name:"Химия",time:"11:30-12:15"},{name:"География",time:"12:20-13:05"},{name:"Орыс т",time:"13:10-13:55"}],
3:[{name:"Ағылшын",time:"8:00-8:45"},{name:"Информатика",time:"8:50-9:35"},{name:"Биология",time:"9:40-10:30"},{name:"Алгебра",time:"10:40-11:25"},{name:"Физика",time:"11:30-12:15"},{name:"Қазақстан тарих",time:"12:20-13:05"},{name:"География",time:"13:10-13:55"}],
4:[{name:"АӘД",time:"8:00-8:45"},{name:"Геометрия",time:"8:50-9:35"},{name:"Алгебра",time:"9:40-10:30"},{name:"Қазақстан тарих",time:"10:40-11:25"},{name:"Химия",time:"11:30-12:15"},{name:"Дене шынықтыру",time:"12:20-13:05"},{name:"Орыс т",time:"13:10-13:55"}],
5:[{name:"Қазақ әдебиет",time:"8:00-8:45"},{name:"Алгебра",time:"8:50-9:35"},{name:"Физика",time:"9:40-10:30"},{name:"Биология",time:"10:40-11:25"},{name:"Дене шынықтыру",time:"11:30-12:15"},{name:"Ағылшын",time:"12:20-13:05"},{name:"Жаһандық құз (ф)",time:"13:10-13:55"}]
};

function showDay(day){
  const content=document.getElementById("dayContent");
  content.innerHTML="";
  kesteData[day].forEach(l=>{
    const div=document.createElement("div");
    div.className="lesson";
    div.innerHTML=`<span>${l.name}</span><span>${l.time}</span>`;
    content.appendChild(div);
  });
}
showDay(1);
