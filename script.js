const cookie = document.getElementById("cookie")
const scoreBoard = document.getElementById("score")

let score = 0
let scrorePerClick = 1

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
cookie.addEventListener("click", () => add(scrorePerClick))


function add(N) {
    score += N
    scoreBoard.innerHTML = score
}
