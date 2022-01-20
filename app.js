
const select = document.getElementById('select')
const form = document.getElementById('form')
const titleEl = document.querySelector('.title');
const inputEl = document.getElementById('input')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const button = document.getElementById('button')

let word;
let typed;
let score = 0
let time = 10;
let level = 'Eyse'

if (navigator.onLine == true) {
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
            if (level == 'Eyse') {
                time += 5
            }
            else if (level == 'Medium') {
                time += 4
            }
            else if (level == 'Hard') {
                time += 3
            }
        }
    })
    select.addEventListener('change', () => {
        level = select.value
    })
    const setGameOver = setInterval(timeFUnction, 1000);
function timeFUnction() {
    time--
    timeEl.textContent = `Time: ${time}`
    if (time <= 0) {
        clearInterval(setGameOver)
    }
}
} else if (navigator.onLine == false) {
    scoreEl.textContent = `You are not connected to the internet ... or the connection is not good!`
}
