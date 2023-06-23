<?php

setcookie("login_status", "", time() - 3600, "/");

header("Location: login.html");
exit;
?>