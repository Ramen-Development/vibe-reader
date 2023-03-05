//test env:
const apiurl = "http://localhost:3000/";
//prod env:
//const apiurl = "https://vibe-readerapi.onrender.com/";

const contextQuestions = [
  "¿Por qué te sientes así?",
  "¿Qué te hace sentir así?",
  "¿Lo cambiarias si pudieras?",
  "¿Alguien influyó en lo que me comentas?",
];



const emotions_en = [
  "Admiration",
  "Amusement",
  "Anger",
  "Annoyance",
  "Approval",
  "Caring",
  "Confusion",
  "Curiosity",
  "Desire",
  "Disappointment",
  "Disapproval",
  "Disgust",
  "Embarrassment",
  "Excitement",
  "Fear",
  "Gratitude",
  "Grief",
  "Joy",
  "Love",
  "Nervousness",
  "Optimism",
  "Pride",
  "Realization",
  "Relief",
  "Remorse",
  "Sadness",
  "Surprise",
  "Neutral",
];

const emotions = [
  "Admiracion",
  "Asombro",
  "Enojo",
  "Molestia",
  "Aprobacion",
  "Cariño",
  "Confusion",
  "Curiosidad",
  "Deseo",
  "Decepcion",
  "Desaprobacion",
  "Disgusto",
  "Pena",
  "Emocion",
  "Miedo",
  "Gratitud",
  "Duelo",
  "Alegria",
  "Amor",
  "Nervios",
  "Optimismo",
  "Orgullo",
  "Realizacion",
  "Alivio",
  "Remordimiento",
  "Tristeza",
  "Sorpresa",
  "Neutral",
];

const questions_en = [
  "How are you feeling ?",
  "What is bothering you the most at the moment?",
  "Has there been anything that has made you feel better lately?",
  "Would you like to talk about what is bothering you or do you feel more comfortable keeping it to yourself?", "Have you talked to anyone else about how you are feeling?", "Have you talked to anyone else about how you are feeling?",
  "Have you talked to anyone else about how you are feeling?",
  "How do you spend your free time?",
  "Do you have any hobbies or interests that you are passionate about?",
  "Do you have any books, movies, or series that you would recommend?",
  
  "Do you have any dreams or goals you would like to achieve in the future?", "Do you have any dreams or goals you would like to achieve in the future?",
  "How would you describe your personality?",
  "What do you like most about yourself?",
  "What kind of food do you like to eat?",
  "How would you describe yourself in stressful situations?",
  "Is there anything that life has taught you that you always remember?",

  "What you do when you feel happy?",
  "What do you do when you are alone?",
  "What is your purpose in life?",
  "What you do when you are sad?",
  "What do you do when you are angry?",
  "What do you do when you are scared?",
  "Tell me a short story about yourself.",
  "Do you have a trauma story?",
  "Do you feel good?",
  "Do you feel bad?",
  "How is your relationship with your family?",
  "What do you do for a living?",
  "Tell me an achievement you got",
  "What is your favorite animal?",
  "Tell me a secret about you",
  "What type of music do you listen?",
  "How was your last relationship?",
  "What do you do before sleeping?",
  "Who is your hero?",
  "If you could live anywhere, where would it be?",
  "What is your biggest fear?",
  "What is your favorite family vacation?",
  "What would you change about yourself if you could?",
  "What really makes you angry?",
  "What motivates you to work hard?",
  "What is your favorite thing about your career?",
  "What is your biggest complaint about your job?",
  "What is your proudest accomplishment?",
  "What is your favorite book to read?",
  "What makes you laugh the most?",
  "What was the last movie you went to? What did you think?",
  "What did you want to be when you were small?",
];

const questions = [
  "¿Cómo te sientes hoy?",
  "¿Qué es lo que más te está preocupando en este momento?",
  "¿Ha habido algo que te haya hecho sentir mejor últimamente?",
  "¿Te gustaría hablar sobre lo que te está molestando o te sientes más cómodo/a guardándolo para ti?",
  "¿Has hablado con alguien más sobre cómo te sientes?",
  "¿Cómo pasas tu tiempo libre?",
  "¿Tienes algún hobby o interés que te apasiona?",
  "¿Tienes algún libro, película o serie que recomendarías?",
  
  "¿Tienes algún sueño o meta que te gustaría alcanzar en el futuro?",
  "¿Cómo describirías tu personalidad?",
  "¿Qué es lo que más te gusta de ti?",
  "¿Qué tipo de comida te gusta comer?",
  "¿Cómo te describirías en situaciones de estrés?",
  "¿Hay algo que te haya enseñado la vida que siempre recuerdas?",

  "¿Que haces cuando te sientes feliz?",
  "¿Que haces cuando estas solo?",
  "¿Cual es tu proposito en la vida?",
  "¿Que haces cuando estas triste?",
  "¿Que haces cuando estas enojado?",
  "¿Que haces cuando estas asustado?",
  "Cuentame un corto anecdota sobre ti",
  "¿Tienes algun trauma?",
  "Cuentame como te sientes",
  "¿Como es tu relacion con tu familia?",
  "¿A que te dedicas?",
  "Cuentame un logro tuyo",
  "¿Cual es tu animal favorito y porque?",
  "Cuentame un secreto tuyo",
  "¿Que tipo de musica escuchas?, ¿Como te hace sentir?",
  "¿Como fue tu ultima relacion?",
  "¿Que haces antes de dormir?",
  "¿Quien es tu heroe y porque?",
  "¿Si pudieras vivir donde sea, donde seria y porque?",
  "¿Cual es tu mayor miedo?",
  "¿Cuales han sido tus vacaciones favoritas y porque?",
  "¿Que cambiarias sobre ti si pudieras?",
  "¿Que te hace enojar realmente?",
  "¿Que te motiva a trabajar?",
  "¿Cual es tu parte favorita de tu carrera?",
  "¿Que es lo que menos te gusta de tu trabajo?",
  "¿Cual es el logro del que mas te enorgulleces?",
  "¿Como te hace sentir tu libro favorito?",
  "¿Que es lo que mas te hace reir?",
  "¿Como te hizo sentir la ultima pelicula que viste?",
  "¿Que querias ser cuando fueras grande y porque?",
];

const questionsNumber = questions.length;


let emotionsResults = new Array(28).fill(0);

let usedQuestions = new Array(questionsNumber).fill(0);

function setText(text) {
  document.getElementById("status").innerText = text;
}

let newQuestionNeeded = true;
let neededmsgs = 0;
let helpMsg = false;
async function userMsg() {
  let msgInput = document.getElementById("message");
  let msg = msgInput.value;
  if (msg == "") return;
  msgInput.value = "";
  document.getElementById("chat").innerHTML +=
    '<div class="flex"><div class="w-0 flex flex-1 items-center justify-end"><span class="flex p-2 rounded-lg bg-sky-300 text-white">' +
    msg +
    "</span></div></div>";
  const evaluation = await fetch(apiurl+"evaluate", {
    method: "POST",
    body: JSON.stringify({ sentence: msg }),
    headers: { "Content-Type": "application/json" },
  });
  let id = await evaluation.json();
  id = id.id;
  emotionsResults[id] = emotionsResults[id] + 1;
  neededmsgs++;

  

  iterator = -1;
  document.getElementById("botface").innerHTML =
    '<img class="mx-auto w-auto" id="botface" src="images/BOT-3.png" alt="Workflow"/>';

  if (neededmsgs == 10) {
    document.getElementById("chat").innerHTML += "<br>";
    //Results
    for (let i = 0; i < emotionsResults.length; i++) {
      if (emotionsResults[i] > 0) {
        
        showResult(emotions[i], emotionsResults[i].toString());
        if (emotions[i] == "Tristeza" && emotionsResults[i] >= 2) {
          helpMsg = true;
        }
      }
    }

    if (helpMsg) {
      showHelpMsg();

    }

    //Borrar boton
    let interaction = document.getElementById("interact");
    interaction.remove();
  } else {
    let iaux = 0;
    
    if(botReaction(emotions[id]) && !newQuestionNeeded){
      let aux = Math.floor(Math.random() * contextQuestions.length);
      botMsg(contextQuestions[aux]);
      newQuestionNeeded = true;
    }
    else{
      while (iaux == 0) {
        let aux = Math.floor(Math.random() * questionsNumber);
        if (usedQuestions[aux] == 0) {
          botMsg(questions[aux]);
          usedQuestions[aux]++;
          iaux = 1;
        }
      }
      newQuestionNeeded = false;
    }
  }
}

function botReaction(emotion){
  let rand = Math.floor(Math.random() * 3);
  console.log(emotion);

  switch(emotion){

    case "Alegría":
      botMsg("Detecto "+emotion);
      if(rand == 0){
        botMsg("Me alegra que te sientas asi");
      }else if(rand == 1){
        botMsg("Que bueno que te sientas asi");
      }else{
        botMsg("Muy bien");
      }
      break;
    case "Tristeza":
      botMsg("Detecto "+emotion);
      if(rand == 0){
        botMsg("Todo va a estar bien");
      }else if(rand == 1){
        botMsg("No te preocupes, todo va a estar bien");
      }else{
        botMsg("No estas solo.");
      }
      break;
    case "Neutral":
      if(rand == 0){
        botMsg("Entiendo");
      }else{
        botMsg("Okay");
      }
      return false;

    case "Enojo": case "Molestia":
      botMsg("Detecto "+emotion);
      if(rand == 0){
        botMsg("Es comprensible que te sientas asi");
      }else{
        botMsg("Tranquilo, no pasa nada");
      }
      break;
    case "Miedo":
      botMsg("Detecto "+emotion);
      if(rand == 0){
        botMsg("");
      }else{
        botMsg("Estas seguro, tranquilo");
      }
      break;
    default:
      return false;
  }
  return true;


}

function showHelpMsg(){
  document.getElementById("chat").innerHTML += "<br>";

  botMsg("Es probable que necesites ayuda en base a tus respuestas. Te recomendamos que busques una opinión profesional.");
  botMsg("(México) Línea de la vida: 800 911 2000");
  botMsg("(México) Instituto Nacional de Psiquiatría: 55 4160 3282");
  botMsg("Animo, todo va a estar bien.");
}      


function botMsg(msg) {
  document.getElementById("chat").innerHTML +=
    '<div class="flex"><div class="w-0 flex flex-1 items-center"><span class="flex p-2 rounded-lg bg-sky-500 text-white">' +
    msg +
    "</span></div></div>";
}

function showResult(msg, val) {
  document.getElementById("chat").innerHTML +=
    '<label for="' + msg + '">' + msg + ":  </label>";
  document.getElementById("chat").innerHTML +=
    '<progress id="' +
    msg +
    '" value="' +
    val +
    '" max="10">' +
    val +
    "/9 </progress> ";
}

let aux = Math.floor(Math.random() * questionsNumber);
usedQuestions[aux] = 1;
botMsg(questions[aux]);

//Sprite bot
var intervalID = window.setInterval(myCallback, 1000);
var iterator = 0;

function myCallback() {
  if (iterator >= 0) {
    if (iterator % 2 == 0) {
      document.getElementById("botface").innerHTML =
        '<img class="mx-auto w-auto" id="botface" src="images/BOT-1.png" alt="Workflow"/>';
    } else {
      document.getElementById("botface").innerHTML =
        '<img class="mx-auto w-auto" id="botface" src="images/BOT-2.png" alt="Workflow"/>';
    }
  }

  iterator++;
  if (iterator == 10) {
    iterator = 0;
  }
}
