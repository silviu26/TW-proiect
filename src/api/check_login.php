<?php
if (isset($_COOKIE["login_status"]) && $_COOKIE["login_status"] === "success") {
    echo "success";
} else {
    echo "error";
}
?>