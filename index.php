<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Cookie Clicker</title>
    <link rel="stylesheet" href="style.css">
</head>

<body class="vh-100 overflow-hidden">

    <main class="d-flex h-100 w-100">

        <!-- cookie/play window-->
        <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <h1 id="scoreBoard" class="rounded-4 px-4 py-2 mb-4">0</h1>
            <!-- geen goede foto-->
            <img src="./img/cookieTEMP.png" id="cookie" alt="Cookie">
        </div>

        <!-- sidebar -->
        <div class="col-5 d-flex flex-column h-100 p-0 shadow-lg">

            <!-- menu knoppen -->
            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                    <a id="menuLink1" class="nav-link active" href="#">Per Click</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink2" class="nav-link" href="#">Auto Productie</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink3" class="nav-link" href="#">Menu 3</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink4" class="nav-link" href="#">Settings</a>
                </li>
            </ul>

            <!-- menu's -->
            <div class="flex-grow-1 menu-container d-flex justify-content-center align-items-center" id="menu1">
                <div class="card text-center" style="width:350px">
                    <img class="card-img-top p-3" src="./img/cookieTEMP.png" alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">Meer Cookies</h4>
                        <p class="card-text">Verdien meer cookies per click</p>
                        <a href="#" class="btn btn-primary col-12" id="perClickUpgrade">
                            Upgrade ($<span id="perClickCost">10</span>)
                        </a>
                    </div>
                </div>
            </div>

            <div class="flex-grow-1 menu-container d-none" id="menu2">
                <p class="text-center m-auto">Auto productie komt hier</p>
            </div>

            <div class="flex-grow-1 menu-container d-none" id="menu3">
                <p class="text-center m-auto">Menu 3 inhoud</p>
            </div>

            <div class="flex-grow-1 menu-container d-none" id="menu4">
                <p class="text-center m-auto">Instellingen</p>
            </div>
        </div>
    </main>

    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // elke 10 sec
        setInterval(saveGame, 10 * 1000);
        loadGame()
    </script>
</body>

</html>