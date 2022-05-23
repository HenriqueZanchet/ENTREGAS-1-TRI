const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))
const start = document.querySelector("button.start")

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        
        console.log("espere a animação terminar")
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        start.innerHTML = "YOU LOSE<br>:(<br>TRY AGAIN"
        start.classList.remove("hide")
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 1500)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 750 * index);
    })
}

function inicio() {
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        start.innerHTML = cnt--
        if(cnt <= -1) {
            turno()
            clearInterval(idx)
            start.classList.add("hide")
        }
    }, 650)
}

function turno() {
    divPontuacao.innerHTML = sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}

start.addEventListener("click", () => {
    inicio()
})
