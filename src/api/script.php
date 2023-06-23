<?php

$hostname = 'localhost';
$database = 'XE';
$username = 'ProiectTW';
$password = 'STUDENT';


$conn = oci_connect($username, $password, "$hostname/$database");


if (!$conn) {
    $error = oci_error();
    echo "Conexiunea la baza de date Oracle a eșuat: " . $error['message'];
    exit();
}

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];


    $query = "SELECT COUNT(*) as count FROM Utilizatori WHERE nume = :username AND parola = :password";
    $stmt = oci_parse($conn, $query);
    oci_bind_by_name($stmt, ':username', $username);
    oci_bind_by_name($stmt, ':password', $password);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);

    if ($row['COUNT'] > 0) {

        setcookie("login_status", "success", time() + 3600, "/");
        echo "success";
    } else {
        echo "Numele de utilizator sau parola incorecte!";
    }

} elseif (isset($_POST['newUsername']) && isset($_POST['newPassword'])) {
    $newUsername = $_POST['newUsername'];
    $newPassword = $_POST['newPassword'];


    $query = "SELECT COUNT(*) as count FROM Utilizatori WHERE nume = :newUsername";
    $stmt = oci_parse($conn, $query);
    oci_bind_by_name($stmt, ':newUsername', $newUsername);
    oci_execute($stmt);
    $row = oci_fetch_assoc($stmt);

    if ($row['COUNT'] > 0) {
        echo "Există deja un utilizator cu același nume!";
    } else {

        $query = "INSERT INTO Utilizatori (id, nume, parola) VALUES (utilizatori_seq.nextval, :newUsername, :newPassword)";
        $stmt = oci_parse($conn, $query);
        oci_bind_by_name($stmt, ':newUsername', $newUsername);
        oci_bind_by_name($stmt, ':newPassword', $newPassword);
        oci_execute($stmt);

        echo "Înregistrare reușită!";
    }
}

oci_close($conn);

?>