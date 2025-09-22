<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <title>Document</title>
</head>

<body class="vh-100 overflow-hidden">

    <main class="d-flex h-100 w-100">
        <div class="flex-grow-1 bg-light">
            text
        </div>

        <div class="col-5 d-flex flex-column h-100 p-0">
            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                    <a id="menuLink1" class="nav-link active" href="#">menu 1</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink2" class="nav-link" href="#">menu 2</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink3" class="nav-link" href="#">menu 3</a>
                </li>
                <li class="nav-item">
                    <a id="menuLink4" class="nav-link" href="#">menu 4</a>
                </li>
            </ul>

            <!-- menu's -->
            <div class="flex-grow-1 bg-secondary" id="menu1">menu1</div>
            <div class="flex-grow-1 bg-secondary d-none" id="menu2">menu2</div>
            <div class="flex-grow-1 bg-secondary d-none" id="menu3">menu3</div>
            <div class="flex-grow-1 bg-secondary d-none" id="menu4">menu4</div>
        </div>
    </main>
    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>