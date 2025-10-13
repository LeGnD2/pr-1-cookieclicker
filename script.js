const cookie = document.getElementById("cookie")
const scoreBoard = document.getElementById("scoreBoard")
const perClickUpgrade = document.getElementById("perClickUpgrade")
const perClickCost = document.getElementById("perClickCost")
const menu2 = document.getElementById("menu2")

let scorePerClick = 1
let UpgradeCurve = 1.5

var score = 0
var perClickUpgradeAmount = 0
// namen van de auto upgrades
const names = ["Auto 1", "Auto 2", "auto 3", "auto 4", "auto 5"];


const menus = ["menu1", "menu2", "menu3", "menu4"];
const links = ["menuLink1", "menuLink2", "menuLink3", "menuLink4"];

function showMenu(index) {
    menus.forEach(menuId => document.getElementById(menuId).classList.add("d-none"));
    document.getElementById(menus[index]).classList.remove("d-none");

    links.forEach(l => document.getElementById(l).classList.remove("active", "bg-secondary"));
    document.getElementById(links[index]).classList.add("active", "bg-secondary");

    save("menuWindow", index)
}

links.forEach((linkId, i) => {
    document.getElementById(linkId).addEventListener("click", () => showMenu(i));
});


cookie.addEventListener("click", () => add(scorePerClick))
perClickUpgrade.addEventListener("click", () => {
    if (buy(Math.trunc(10 * UpgradeCurve ** perClickUpgradeAmount))) {
        perClickUpgradeAmount++
        perClickCost.innerHTML = Math.trunc(10 * UpgradeCurve ** (perClickUpgradeAmount))
        scorePerClick = 1 + perClickUpgradeAmount
        saveGame()
    }
})


document.getElementById("resetProgress").addEventListener("click", () => {
    localStorage.clear()
    save("menuWindow", 0)
    loadGame()
})

// auto upgrates
function saveGame() {
    save("score", score)
    save("perClickUpgradeAmount", perClickUpgradeAmount)
    upgrades.forEach((element) => {
        element.saveAutoUpgrade()
    })

    console.log("saved")
}
// remove menu2, reAdd, recalc
function loadGame() {
    showMenu(load("menuWindow"))

    score = load("score")
    scoreBoard.innerHTML = score

    perClickUpgradeAmount = load("perClickUpgradeAmount")
    perClickCost.innerHTML = Math.trunc(10 * UpgradeCurve ** (perClickUpgradeAmount))
    scorePerClick = 1 + perClickUpgradeAmount

    menu2.innerHTML = ""
    upgrades.forEach((element) => {
        element.loadAutoUpgrade()
        element.addHTML()
    })
}

function save(naam, waarde) {
    localStorage.setItem(naam, JSON.stringify(waarde))
}

function load(naam) {
    return JSON.parse(localStorage.getItem(naam))
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

    saveAutoUpgrade() {
        save(`upgrade-${this.baseValue}`, this.upgradeAmount)
    }

    loadAutoUpgrade() {
        this.upgradeAmount = load(`upgrade-${this.baseValue}`)
        if (this.upgradeAmount == null) {
            this.upgradeAmount = 0
        }
        this.updateCostsAndProduction();
    }

    addHTML() {
        const div = document.createElement("div");
        div.className = "upgrade-item p-2 m-2";

        div.innerHTML = `
<div class="card shadow-sm mb-3">
  <div class="card-body">
    <h5 class="card-title text-center">${this.name}</h5>
    <div class="row text-center">
      <div class="col">
        <p class="mb-1">Aantal</p>
        <strong id="amount-${this.baseValue}">${this.upgradeAmount}</strong>
      </div>
      <div class="col">
        <p class="mb-1">Score totaal</p>
        <strong id="score-${this.baseValue}">${this.productionScoreTotal}</strong>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary w-100" id="btn-${this.baseValue}">Upgrade 
      ($<strong id="cost-${this.baseValue}">${this.upgradeCostNext}</strong>)</button>
    </div>
  </div>
</div>`;
        menu2.appendChild(div);

        document.getElementById(`btn-${this.baseValue}`).addEventListener("click", () => {
            if (buy(this.upgradeCostNext)) {
                this.upgrade();
            }

            document.getElementById(`amount-${this.baseValue}`).textContent = this.upgradeAmount;
            document.getElementById(`score-${this.baseValue}`).textContent = this.productionScoreTotal;
            document.getElementById(`cost-${this.baseValue}`).textContent = this.upgradeCostNext;
        });
    }

    startAutoUpgrade() {
        this.interval = setInterval(() => {
            if (this.upgradeAmount !== 0) {
                add(this.productionScoreTotal)
            }
        }, this.productionTime * 1000)
    }
}

let upgrades = []
names.forEach((element, index) => {
    upgrades.push(new AutoUpgrade(element, index + 1))
})
upgrades.forEach((element) => {
    element.addHTML()
    element.startAutoUpgrade()
})

