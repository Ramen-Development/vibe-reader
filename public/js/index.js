const emotions = [
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

  const questionsNumber = 8;

  let emotionsResults = new Array(28).fill(0);

  let usedQuestions = new Array(questionsNumber).fill(0);

  
  const questions = [
    "What you do when you feel happy?",
    "What do you do when you are alone?",
    "What is your purpose in life?",
    "What you do when you are sad?",
    "What do you do when you are angry?",
    "What do you do when you are scared?",
    "Tell me a short story about yourself.",
    "Do you have a trauma story?",
  ];
  
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
    let data = await fetch( "../data/emotions.tsv" ).then( r => r.text() );
    let lines = data.split("\n").filter((x) => !!x); // Split & remove empty lines
  
    // Randomize the lines
    shuffleArray(lines);
  
    // Process 200 lines to generate a "bag of words"
    const numSamples = 200;
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
      epochs: 50,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          setText(`Training... Epoch #${epoch} (${logs.acc})`);
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
    msgInput.value = "";
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center justify-end"><span class="flex p-2 rounded-lg bg-gray-600 text-white">'+msg+'</span></div></div>';
    evaluate(msg);
    neededmsgs++;
    
    if(neededmsgs == 3)
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
    document.getElementById("chat").innerHTML += '<div class="flex"><div class="w-0 flex flex-1 items-center"><span class="flex p-2 rounded-lg bg-gray-600 text-white">'+msg+'</span></div></div>';
  }

  function showResult(msg,val) {
    document.getElementById("chat").innerHTML += '<label for="'+ msg +'">'+msg+':  </label>';
    document.getElementById("chat").innerHTML += '<progress id="'+msg+'" value="'+val+'" max="10" class="rounded-r-md bg-gray-600">'+val+'/10 </progress>';
  }
  
  let aux = Math.floor(Math.random() * questionsNumber);
  usedQuestions[aux] = 1;
  botMsg(questions[aux]);
