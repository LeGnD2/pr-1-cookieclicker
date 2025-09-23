const cookie = document.getElementById("cookie")
const scoreBoard = document.getElementById("scoreBoard")
const perClickUpgrade = document.getElementById("perClickUpgrade")
const perClickCost = document.getElementById("perClickCost")

let scorePerClick = 1
let perClickUpgradeCurve = 1.5

var score = 0
var perClickUpgradeAmount = 0

// schrijf in saveVars welke vars je wil opslaan en zorg ervoor dat er een staandart is.
const saveVars = ["score", "perClickUpgradeAmount"];

const menus = ["menu1", "menu2", "menu3", "menu4"]
const links = ["menuLink1", "menuLink2", "menuLink3", "menuLink4"]

links.forEach((linkId, i) => {
    document.getElementById(linkId).addEventListener("click", () => {
        menus.forEach(menuId => document.getElementById(menuId).classList.add("d-none"))
        document.getElementById(menus[i]).classList.remove("d-none")

        links.forEach(l => document.getElementById(l).classList.remove("active"))
        document.getElementById(linkId).classList.add("active")
        links.forEach(l => document.getElementById(l).classList.remove("bg-secondary"))
        document.getElementById(linkId).classList.add("bg-secondary")
    })
})
cookie.addEventListener("click", () => add(scorePerClick))
// curve, elke keer dat je het koopt word het x1.5 duurder (perClickUpgradeCurve)
perClickUpgrade.addEventListener("click", () => {
    // console.log(10 * (perClickUpgradeCurve ** perClickUpgradeAmount))
    if (buy(Math.trunc(10 * perClickUpgradeCurve ** perClickUpgradeAmount))) {
        perClickUpgradeAmount++
        perClickCost.innerHTML = Math.trunc(10 * perClickUpgradeCurve ** (perClickUpgradeAmount))
        scorePerClick = 1 + perClickUpgradeAmount
        saveGame()
    }
})
document.getElementById("resetProgress").addEventListener("click", () => {
    let gameData = {};
    saveVars.forEach(v => {
        gameData[v] = 0;
    });
    localStorage.setItem("gameData", JSON.stringify(gameData));
    loadGame()
})

function saveGame() {
    let gameData = {};
    saveVars.forEach(v => {
        gameData[v] = window[v];
    });
    localStorage.setItem("gameData", JSON.stringify(gameData));
}

function loadGame() {
    let saved = JSON.parse(localStorage.getItem("gameData"));
    if (saved) {
        saveVars.forEach(v => {
            if (saved[v] !== undefined) {
                window[v] = saved[v];
            }
        });
    }
    scoreBoard.innerHTML = score
    scorePerClick = 1 + perClickUpgradeAmount
    perClickCost.innerHTML = Math.trunc(10 * perClickUpgradeCurve ** (perClickUpgradeAmount))
}


function add(N) {
    score += N
    scoreBoard.innerHTML = score
}

function buy(N) {
    if (score - N >= 0) {
        score -= N
        scoreBoard.innerHTML = score
        // console.log("genoeg score")
        return true
    } else {
        console.log("niet genoeg score")
        return false
    }
}


