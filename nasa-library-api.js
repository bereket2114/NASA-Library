/* ==========================================================
   NASA LIBRARY
   Modern JavaScript
========================================================== */

const API_KEY = "yKdrTEe4xzSXk0HRk33dfCcMCB8XSVyUoVeDceo9";

const BASE_URL = "https://api.nasa.gov/planetary/apod";

// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("apodForm");
const dateInput = document.getElementById("find");
const getButton = document.getElementById("getData");

const title = document.querySelector(".title");
const description = document.querySelector(".description");
const image = document.querySelector(".nasa-image");
const video = document.querySelector(".nasa-video");
const dateOutput = document.querySelector(".date-output");

const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

const micButton = document.getElementById("micButton");
const micIcon = micButton.querySelector("i");

// ==========================
// SPEECH
// ==========================

const synth = window.speechSynthesis;

let currentData = null;
let speaking = false;

// ==========================
// HELPERS
// ==========================

function showLoader(show){

    loader.classList.toggle("hidden", !show);

}

function showMessage(text="", type=""){

    message.textContent = text;
    message.className = "message";

    if(type){

        message.classList.add(type);

    }

}

function clearMedia(){

    image.style.display = "none";
    video.style.display = "none";

    image.src = "";
    video.src = "";

}

function displayMedia(data){

    clearMedia();

    if(data.media_type === "image"){

        image.src = data.hdurl || data.url;
        image.style.display = "block";

    }

    else{

        video.src = data.url;
        video.style.display = "block";

    }

}

function validateDate(){

    if(!dateInput.value){

        showMessage("Please select a date first.","error");

        dateInput.focus();

        return false;

    }

    return true;

}

// ==========================
// GET NASA DATA
// ==========================

async function getNasaData(){

    if(!validateDate()) return;

    showLoader(true);
    showMessage("");

    try{

        const response = await fetch(
            `${BASE_URL}?api_key=${API_KEY}&date=${dateInput.value}`
        );

        if(!response.ok){

            throw new Error("Unable to connect to NASA.");

        }

        const data = await response.json();

        if(data.error){

            throw new Error(data.error.message);

        }

        currentData = data;

        title.textContent = data.title;

        description.textContent = data.explanation;

        dateOutput.textContent = data.date;

        displayMedia(data);

        showMessage("NASA data loaded successfully.","success");

    }

    catch(error){

        console.error(error);

        showMessage(error.message,"error");

    }

    finally{

        showLoader(false);

    }

}


// ==========================
// SPEECH FUNCTIONS
// ==========================

function startSpeech(){

    if(!currentData){

        showMessage("Load a NASA file first.","error");
        return;

    }

    synth.cancel();

    const speech = new SpeechSynthesisUtterance(
        currentData.explanation
    );

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    // Try to use an English voice
    const voices = synth.getVoices();

    const englishVoice = voices.find(v =>
        v.lang.startsWith("en")
    );

    if(englishVoice){

        speech.voice = englishVoice;

    }

    speech.onstart = ()=>{

        speaking = true;

        micIcon.classList.add("listening");

        micButton.querySelector("span").textContent =
            "Stop Reading";

        showMessage(
            "Reading NASA description...",
            "success"
        );

    };

    speech.onend = ()=>{

        stopSpeech();

    };

    speech.onerror = ()=>{

        stopSpeech();

        showMessage(
            "Speech synthesis failed.",
            "error"
        );

    };

    synth.speak(speech);

}

function stopSpeech(){

    synth.cancel();

    speaking = false;

    micIcon.classList.remove("listening");

    micButton.querySelector("span").textContent =
        "Read Description";

}

function toggleSpeech(){

    if(speaking || synth.speaking){

        stopSpeech();

    }

    else{

        startSpeech();

    }

}

// ==========================
// EVENTS
// ==========================

form.addEventListener("submit",(event)=>{

    event.preventDefault();

    getNasaData();

});

getButton.addEventListener("click",(event)=>{

    event.preventDefault();

    getNasaData();

});

dateInput.addEventListener("keydown",(event)=>{

    if(event.key==="Enter"){

        event.preventDefault();

        getNasaData();

    }

});

micButton.addEventListener("click",toggleSpeech);

// ==========================
// IMAGE CLICK TO ENLARGE
// ==========================

image.addEventListener("click",()=>{

    if(image.src){

        window.open(image.src,"_blank");

    }

});

// ==========================
// STOP SPEECH WHEN LEAVING
// ==========================

window.addEventListener("beforeunload",()=>{

    synth.cancel();

});

// ==========================
// LOAD TODAY'S APOD
// ==========================

window.addEventListener("DOMContentLoaded",()=>{

    const today = new Date()
        .toISOString()
        .split("T")[0];

    dateInput.value = today;

    getNasaData();

});