//test env:
const apiurl = "http://localhost:3000/";
//prod env:
//const apiurl = "https://vibe-readerapi.onrender.com/";

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
async function getMessages() {
  const msgsJS = await fetch(apiurl + "toApprove", {
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
    let emotion = msgs[i].split("\t")[1];
    document.getElementById("mensajes").innerHTML +=
      `
    <div class="col-span-6 sm:col-span-3">
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
  </div>
    </div>
    <div class="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Aprobar
                    </button>
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Eliminar
                    </button>
                  </div>
    `;
    document.getElementById("sentence" + i).value = emotion;
    console.log(sentence, emotion);
  }
}

getMessages();
