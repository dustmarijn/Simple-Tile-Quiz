<!doctype html>
<html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SamenZwolle | Admin</title>
</head>
<style>
    body {
        padding: 0;
        margin: 0 auto;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        background-color: #f6f5fb;
        overflow-x: hidden;
        width: 100vw;
        height: auto;
    }
    html {
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;
    }
</style>
<body>
<div id="admin"></div>
</body>
<script src="{{ mix('/js/admin.js') }}"></script>
</html>
