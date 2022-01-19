

const form = document.getElementById('form')
const titleEl = document.querySelector('.title');
const inputEl = document.getElementById('input')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const button = document.getElementById('button')

let word ;
let typed ;
let score = 0

if(navigator.onLine == true){
    function reload(){
    fetch(`https://random-word-api.herokuapp.com/word?number=1`).then(function(datas){
        return datas.json()
    }).then(getdata)
    function getdata(data){
        word = data
        titleEl.textContent = word;
        document.getElementById('input').placeholder = word;
       
    }
    scoreEl.textContent = `Score ${score}`
}reload()
form.addEventListener('input' , (e)=>{
    typed = inputEl.value
    e.preventDefault()
  if(typed == word){
   reload()
   inputEl.value = ''
   score++
   scoreEl.textContent = `Score ${score}`
  }
})

}else if(navigator.onLine == false){
    scoreEl.textContent = `You are not connected to the internet ... or the connection is not good!`
    console.log(22);
}

