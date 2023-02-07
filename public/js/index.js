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

  let allWords = [];
  let wordReference = {};
  const model = tf.sequential();
  function setText(text) {
    document.getElementById("status").innerText = text;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  (async () => {
    document.getElementById("message").disabled = true;
    document.getElementById("sendbtn").disabled = true;
    // Load GoEmotions data (https://github.com/google-research/google-research/tree/master/goemotions)
    let data = await fetch( "data/emotions_es.tsv" ).then( r => r.text() );
    let lines = data.split("\n").filter((x) => !!x); // Split & remove empty lines
  
    // Randomize the lines
    shuffleArray(lines);
  
    // Process 200 lines to generate a "bag of words"
    const numSamples = 500;
    let bagOfWords = {};
    let sentences = lines.slice(0, numSamples).map((line) => {
      let sentence = line.split("\t")[0];
      return sentence;
    });
  
    sentences.forEach((s) => {
      let words = s
        .replace(/[^a-z ]/gi, "")
        .toLowerCase()
        .split(" ")
        .filter((x) => !!x);
      words.forEach((w) => {
        if (!bagOfWords[w]) {
          bagOfWords[w] = 0;
        }
        bagOfWords[w]++; // Counting occurrence just for word frequency fun
      });
    });
  
    allWords = Object.keys(bagOfWords);
    allWords.forEach((w, i) => {
      wordReference[w] = i;
    });
  
    // Generate vectors for sentences
    let vectors = sentences.map((s) => {
      let vector = new Array(allWords.length).fill(0);
      let words = s
        .replace(/[^a-z ]/gi, "")
        .toLowerCase()
        .split(" ")
        .filter((x) => !!x);
      words.forEach((w) => {
        if (w in wordReference) {
          vector[wordReference[w]] = 1;
        }
      });
      return vector;
    });
  
    let outputs = lines.slice(0, numSamples).map((line) => {
      let categories = line
        .split("\t")[1]
        .split(",")
        .map((x) => parseInt(x));
      let output = [];
      for (let i = 0; i < emotions.length; i++) {
        output.push(categories.includes(i) ? 1 : 0);
      }
      return output;
    });
  
    // Define our model with several hidden layers
    model.add(
      tf.layers.dense({
        units: 100,
        activation: "relu",
        inputShape: [allWords.length],
      })
    );
    model.add(tf.layers.dense({ units: 50, activation: "relu" }));
    model.add(tf.layers.dense({ units: 25, activation: "relu" }));
    model.add(
      tf.layers.dense({
        units: emotions.length,
        activation: "softmax",
      })
    );
  
    model.compile({
      optimizer: tf.train.adam(),
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });
  
    const xs = tf.stack(vectors.map((x) => tf.tensor1d(x)));
    const ys = tf.stack(outputs.map((x) => tf.tensor1d(x)));
    await model.fit(xs, ys, {
      epochs: 100,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          setText(`Entrenando... Epoch #${epoch} (${logs.acc})`);
          console.log("Epoch #", epoch, logs);
        },
      },
    });
    setText("");
    document.getElementById("message").disabled = false;
    document.getElementById("sendbtn").disabled = false;
  })();
  
  async function evaluate(sentence) {
  
    // Generate vectors for sentences
    let vector = new Array(allWords.length).fill(0);
    // Use a regex to only get spaces and letters and remove any blank elements
    let words = sentence
      .replace(/[^a-z ]/gi, "")
      .toLowerCase()
      .split(" ")
      .filter((x) => !!x);
    words.forEach((w) => {
      if (w in wordReference) {
        vector[wordReference[w]] = 1;
      }
    });
  
    let prediction = await model.predict(tf.stack([tf.tensor1d(vector)])).data();
    // Get the index of the highest value in the prediction
    let id = prediction.indexOf(Math.max(...prediction));
    emotionsResults[id] = emotionsResults[id]+1;
    console.log(emotions[id]);

    
  }

  let neededmsgs=0;
  function userMsg() {
    let msgInput = document.getElementById("message");
    let msg = msgInput.value;
    if(msg == "") return;
    msgInput.value = "";
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center justify-end"><span class="flex p-2 rounded-lg bg-sky-300 text-white">'+msg+'</span></div></div>';
    neededmsgs++;

    iterator = -1;
    document.getElementById("botface").innerHTML = '<img class="mx-auto w-auto" id="botface" src="images/BOT-3.png" alt="Workflow"/>';
    
    if(neededmsgs == 10)
    {
      document.getElementById("chat").innerHTML += "<br>";
      //Results
      for(let i=0;i<emotionsResults.length;i++)
      {
        if(emotionsResults[i] > 0)
        {
          showResult(emotions[i],emotionsResults[i].toString());
        }
      }
      //Borrar boton
      let interaction = document.getElementById("interact");
      interaction.remove();
    }
    else
    {
      let iaux = 0;
      while(iaux == 0)
      {
        let aux = Math.floor(Math.random() * questionsNumber);
        if(usedQuestions[aux] == 0)
        {
          botMsg(questions[aux]);
          usedQuestions[aux]++;
          iaux=1;
        }
      }
    }

  }

  

  function botMsg(msg) {
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center"><span class="flex p-2 rounded-lg bg-sky-500 text-white">'+msg+'</span></div></div>';
   
  }

  function showResult(msg,val) {
    document.getElementById("chat").innerHTML += '<label for="'+ msg +'">'+msg+':  </label>';
    document.getElementById("chat").innerHTML += '<progress id="'+msg+'" value="'+val+'" max="10">'+val+'/9 </progress>';
  }
  
  let aux = Math.floor(Math.random() * questionsNumber);
  usedQuestions[aux] = 1;
  botMsg(questions[aux]);

  //Sprite bot
  var intervalID = window.setInterval(myCallback, 1000);
  var iterator=0;

  function myCallback() {
    if(iterator >= 0)
    {
      if(iterator%2 == 0)
      {
        document.getElementById("botface").innerHTML = '<img class="mx-auto w-auto" id="botface" src="images/BOT-1.png" alt="Workflow"/>';
      }
      else
      {
        document.getElementById("botface").innerHTML = '<img class="mx-auto w-auto" id="botface" src="images/BOT-2.png" alt="Workflow"/>';
      }
    }

    iterator++;
    if(iterator == 10)
    {
      iterator=0;
    }
  }
