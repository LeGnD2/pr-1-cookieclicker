const cookie = document.getElementById("cookie")
const scoreBoard = document.getElementById("scoreBoard")
const perClickUpgrade = document.getElementById("perClickUpgrade")
const perClickCost = document.getElementById("perClickCost")
const menu2 = document.getElementById("menu2")

let scorePerClick = 1
let UpgradeCurve = 1.5

var score = 0
var perClickUpgradeAmount = 0


const menus = ["menu1", "menu2", "menu3", "menu4"];
const links = ["menuLink1", "menuLink2", "menuLink3", "menuLink4"];

function showMenu(index) {
    menus.forEach(menuId => document.getElementById(menuId).classList.add("d-none"));
    document.getElementById(menus[index]).classList.remove("d-none");

    links.forEach(l => document.getElementById(l).classList.remove("active", "bg-secondary"));
    document.getElementById(links[index]).classList.add("active", "bg-secondary");

    window.location.hash = links[index];
}

links.forEach((linkId, i) => {
    document.getElementById(linkId).addEventListener("click", () => showMenu(i));
});

// Bij laden: check hash en toon de juiste menu
function loadMenuFromHash() {
    const hash = window.location.hash.replace("#", "");
    const index = links.indexOf(hash);
    // console.log(index)
    if (index !== -1) {
        showMenu(index);
    } else {
        showMenu(0);
    }
}


cookie.addEventListener("click", () => add(scorePerClick))
// curve, elke keer dat je het koopt word het x1.5 duurder (UpgradeCurve)
perClickUpgrade.addEventListener("click", () => {
    // console.log(10 * (UpgradeCurve ** perClickUpgradeAmount))
    if (buy(Math.trunc(10 * UpgradeCurve ** perClickUpgradeAmount))) {
        perClickUpgradeAmount++
        perClickCost.innerHTML = Math.trunc(10 * UpgradeCurve ** (perClickUpgradeAmount))
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
// schrijf in saveVars welke vars je wil opslaan en zorg ervoor dat er een staandart is.
const saveVars = ["score", "perClickUpgradeAmount"];

// rework
function saveGame() {
    let gameData = {};
    saveVars.forEach(v => {
        gameData[v] = window[v];
    });
    localStorage.setItem("gameData", JSON.stringify(gameData));
}

// rework
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
    perClickCost.innerHTML = Math.trunc(10 * UpgradeCurve ** (perClickUpgradeAmount))
}


function add(N) {
    score += N
    scoreBoard.innerHTML = score
}

function buy(N) {
    if (score - N >= 0) {
        score -= N
        scoreBoard.innerHTML = score
        return true
    } else {
        console.log("niet genoeg score")
        return false
    }
}

// rework
class AutoUpgrade {
    constructor(name, baseValue) {
        this.name = name;
        this.baseValue = baseValue;

        this.upgradeAmount = 0;
        this.upgradeCostBase = Math.trunc((baseValue ** UpgradeCurve) * 50);
        this.productionTime = this.baseValue;
        this.productionScoreBase = this.baseValue ** 2;

        this.updateCostsAndProduction();
    }

    updateCostsAndProduction() {
        this.upgradeCostNext = Math.trunc(this.upgradeCostBase * (UpgradeCurve ** this.upgradeAmount));
        this.productionScoreTotal = Math.trunc(this.productionScoreBase * this.upgradeAmount);
    }

    upgrade() {
        this.upgradeAmount++;
        this.updateCostsAndProduction();
        saveGame()
    }
}

// rework
const names = ["Auto 1", "Auto 2", "Auto 3", "Auto 4", "Auto 5"];
const upgrades = names.map((name, i) => new AutoUpgrade(name, i + 1));
// console.log(upgrades);
menu2.innerHTML = "";
upgrades.forEach((upgrade, index) => {
    const div = document.createElement("div");
    div.className = "upgrade-item border p-2 m-2";

    div.innerHTML = `
<div class="card shadow-sm mb-3">
  <div class="card-body">
    <h5 class="card-title text-center">${upgrade.name}</h5>
    <div class="row text-center">
      <div class="col">
        <p class="mb-1">Aantal</p>
        <strong id="amount-${index}">${upgrade.upgradeAmount}</strong>
      </div>
      <div class="col">
        <p class="mb-1">Score totaal</p>
        <strong id="score-${index}">${upgrade.productionScoreTotal}</strong>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary w-100" id="btn-${index}">Upgrade 
      ($<strong id="cost-${index}">${upgrade.upgradeCostNext}</strong>)</button>
    </div>
  </div>
</div>

        `;

    menu2.appendChild(div);

    document.getElementById(`btn-${index}`).addEventListener("click", () => {
        if (buy(upgrade.upgradeCostNext)) {
            upgrade.upgrade();
        }

        document.getElementById(`amount-${index}`).textContent = upgrade.upgradeAmount;
        document.getElementById(`score-${index}`).textContent = upgrade.productionScoreTotal;
        document.getElementById(`cost-${index}`).textContent = upgrade.upgradeCostNext;
    });
});