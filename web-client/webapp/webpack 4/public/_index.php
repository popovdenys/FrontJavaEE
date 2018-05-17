
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-16">
    <title>Less</title>
    <link rel="stylesheet" href="http://localhost:8080/assets/app.css">
</head>
<body>
<div id="app-7">
    <ol>
        <todo-item
                v-for="item in groceryList"
                v-bind:todo="item"
                v-bind:key="item.id">
        </todo-item>
    </ol>
</div>

<p id="target">Go!</p>
<div id="image-first"></div>

<div id="image-third"></div>
<div><p id="text-field">Text</p></div>
<button class="btn btn-primary" id="btn-login">Login</button>

<div id="app">{{ message }}</div>

<?php
var_dump($_SERVER) ?>

<script type="text/javascript" src="http://localhost:8080/assets/app.js"></script>
</body>
</html>
