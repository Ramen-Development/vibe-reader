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

var sentences = [];
async function getMessages() {
  const msgsJS = await fetch("/toApproveData", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let msgs = await msgsJS.json();
  msgs = msgs.data;
  console.log(msgs);
  let options = "";
  for (let i = 0; i < emotions.length; i++) {
    options += "<option value='" + i + "'>" + emotions[i] + "</option>";
  }
  for (let i = 0; i < msgs.length; i++) {
    let sentence = msgs[i].split("\t")[0];
    sentences.push(sentence);
    document.getElementById("mensajes").innerHTML +=
      `
    <div class="col-span-6 sm:col-span-3" id="divSentence` +
      i +
      `">
    <label
      for="sentence` +
      i +
      `"
      class="block text-sm font-medium leading-6 text-gray-900"
      >` +
      sentence +
      `</label
    >
    <select
      id="sentence` +
      i +
      `"
      name="sentence` +
      i +
      `"
      class="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
    ` +
      options +
      `
    </select>
    <div class="px-4 py-3 text-right sm:px-6">
      <button
        class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onclick="approveSentence(` +
      i +
      `,document.getElementById('sentence` +
      i +
      `').value)"
        >
          Aprobar
        </button>
        <button
          class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onclick="removeSentence(` +
      i +
      `)"
        >
          Eliminar
        </button>
      </div>
      </div>
    `;
  }
  //changes the selected emotion to match the predicted saved on the document
  for (let i = 0; i < sentences.length; i++) {
    let emotion = msgs[i].split("\t")[1];
    document.getElementById("sentence".concat(i)).selectedIndex = emotion;
  }
}

async function approveSentence(sentence, emotion) {
  const approval = await fetch("/approveSentence", {
    method: "POST",
    body: JSON.stringify({ sentence: sentences[sentence], emotion: emotion }),
    headers: { "Content-Type": "application/json" },
  });
  let data = await approval.json();
  data = data.data;
  if (data == "200") {
    document.getElementById("divSentence".concat(sentence)).innerHTML = `
    <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Aprobado</p>
      <p class="text-sm">Muchas gracias por mejorar Vibe Reader!</p>
    </div>
  </div>
</div>
    `;
  }
}

async function removeSentence(sentence) {
  const approval = await fetch("/removeSentence", {
    method: "POST",
    body: JSON.stringify({ sentence: sentences[sentence] }),
    headers: { "Content-Type": "application/json" },
  });
  let data = await approval.json();
  data = data.data;
  if (data == "200") {
    document.getElementById("divSentence".concat(sentence)).innerHTML = `
    <div class="bg-red-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Eliminado</p>
      <p class="text-sm">Muchas gracias por mejorar Vibe Reader!</p>
    </div>
  </div>
</div>
    `;
  }
}

getMessages();
