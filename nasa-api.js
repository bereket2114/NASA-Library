
            //////// NASA APIs PRACTICE ///////


document.querySelector('button').addEventListener('click', getNasa)

function getNasa(){
    const choice = document.querySelector('input').value
    console.log(choice)          
    let myUrl = `https://api.nasa.gov/planetary/apod?api_key=yKdrTEe4xzSXk0HRk33dfCcMCB8XSVyUoVeDceo9&date=${choice}`      

    fetch(myUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.media_type === 'image'){
            document.querySelector('img').src = data.hdurl
        }else if(data.media_type === 'video'){
            document.querySelector('iframe').src = data.url
        }
        
        document.querySelector('.title').innerText = data.title
        
        document.querySelector('p').innerText = data.explanation

    })
    .catch(err =>{
        console.log(`error is ${err}`)
    });
}


