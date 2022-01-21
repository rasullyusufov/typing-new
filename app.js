
const select = document.getElementById('select')
const form = document.getElementById('form')
const titleEl = document.querySelector('.title');
const inputEl = document.getElementById('input')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const button = document.getElementById('button')
const modalScore = document.getElementById('modalscore')
const modal = document.getElementById('modal')
inputEl.focus()
let word;
let typed;
let score = 0
let time = 15;
let difficulty 


if (navigator.onLine == true) {
    select.value = localStorage.getItem('difficulty ') !== null ? localStorage.getItem('difficulty ') : 'Eyse'
    function reload() {
        fetch(`https://random-word-api.herokuapp.com/word`).then(function (datas) {
            return datas.json()
        }).then(getdata)
        function getdata(data) {
            word = data
            titleEl.textContent = word;
            document.getElementById('input').placeholder = word;
        }
        scoreEl.textContent = `Score ${score}`
    } reload()
    form.addEventListener('input', (e) => {
        typed = inputEl.value
        e.preventDefault()
        if (typed.toLowerCase() == word) {
            reload()
            inputEl.value = ''
            score++
            scoreEl.textContent = `Score ${score}`
            if (difficulty === 'Eyse') {
                time += 5
            }
            else if (difficulty === 'Medium') {
                time += 4
            }
            else if (difficulty === 'Hard') {
                time += 3
            }
        }
    })
    select.addEventListener('change', (e) => {
        difficulty  = e.target.value
        localStorage.setItem(difficulty  , difficulty )
    })
    const setGameOver = setInterval(timeFUnction, 1000);
function timeFUnction() {
    time--
    timeEl.textContent = `Time: ${time}`
    if (time <= 0) {
        clearInterval(setGameOver)
        modal.classList.remove('hidden')
        modalScore.textContent = `Score ${score}`
    }
    else if(time <= 5){
        timeEl.style.color = 'red'
    }
    document.addEventListener('keydown', (e)=>{
        if(e.key == 'Escape') {
            modal.classList.add('hidden')
            score = 0
            location.reload()
        }
    })
}
} else if (navigator.onLine == false) {
    scoreEl.textContent = `You are not connected to the internet ... or the connection is not good!`
}
