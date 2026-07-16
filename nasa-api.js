// set up code for voice reader
const synth = window.speechSynthesis;
            // NASA APIs PRACTICE

const button = document.querySelector('button')
button.addEventListener('click', getNasa)

const voice = document.querySelector('.fa-microphone')
voice.addEventListener('click', speakThis)

const stopVoice = document.querySelector('.fa-microphone')
voice.addEventListener('click', stopSpeaking)


function getNasa(){
    const choice = document.querySelector('input').value    
    let myUrl = `https://api.nasa.gov/planetary/apod?api_key=yKdrTEe4xzSXk0HRk33dfCcMCB8XSVyUoVeDceo9&date=${choice}`      

    fetch(myUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const image = document.querySelector("img");
        const video = document.querySelector("iframe");
        const title = document.querySelector(".title");
        const description = document.querySelector(".description");

        if(data.media_type === 'image'){
            image.src = data.hdurl
        }else if(data.media_type === 'video'){
            video.src = data.url
        }
        
        title.innerText = data.title
        
        description.innerText = data.explanation
        

    })
    .catch(err =>{
        console.log(`error is ${err}`)
    });
}

function speakThis() {
    const choice = document.querySelector('input').value    
    const myUrl = `https://api.nasa.gov/planetary/apod?api_key=yKdrTEe4xzSXk0HRk33dfCcMCB8XSVyUoVeDceo9&date=${choice}`      

   fetch(myUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    let talkThis = new SpeechSynthesisUtterance(data.explanation);
    synth.speak(talkThis);
    const mic = document.querySelector('.fa-microphone')
    mic.classList.toggle("listening");

    })
    .catch(err => console.error(err))
}

function stopSpeaking(){
    const choice = document.querySelector('input').value    
    const myUrl = `https://api.nasa.gov/planetary/apod?api_key=yKdrTEe4xzSXk0HRk33dfCcMCB8XSVyUoVeDceo9&date=${choice}`      

   fetch(myUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        synth.cancel();
        const mic = document.querySelector('.fa-microphone')
        mic.classList.remove("listening");

    })
    .catch(err => console.error(err))
}


//This line code instruct my web to hear 'Enter' by keyDown type of  EventListener beside of Click Action!!
/*button.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        getNasa();  // this is saying do exact instruction for this type of event Listener as well,So I called the above function to excute here as well !!
    }
})  */


