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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_POST['judet']) && !isset($_POST['categorie_nationala']) && !isset($_POST['categorie_comunitara']) && !isset($_POST['marca'])) {
    echo "Trebuie să selectați cel puțin o opțiune.";
    exit();
  }

  $selectedJudet = preg_replace('/\s+/', '', $_POST['judet']);
  $selectedCategorieNationala = preg_replace('/\s+/', '', $_POST['categorie_nationala']);
  $selectedCategorieComunitara = preg_replace('/\s+/', '', $_POST['categorie_comunitara']);
  $selectedMarca = preg_replace('/\s+/', '', $_POST['marca']);


  $sql = "SELECT JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA,TOTAL FROM PARC_AUTO_ROMANIA WHERE 1=1";
  $sql1 = "SELECT JUDET, sum(TOTAL) as tot FROM PARC_AUTO_ROMANIA WHERE 1=1";
  $continuareSQl = " GROUP BY JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, TOTAL";
  $continuareSQl1 = " GROUP BY JUDET";
  if (strlen($selectedJudet)) {
    $sql .= " AND UPPER(JUDET) LIKE UPPER(:judet)";
    $sql1 .= " AND UPPER(JUDET) LIKE UPPER(:judet)";
  }
  if (strlen($selectedCategorieNationala)) {
    $sql .= " AND UPPER(CATEGORIE_NATIONALA) LIKE UPPER(:categorie_nationala)";
    $sql1 .= " AND UPPER(CATEGORIE_NATIONALA) LIKE UPPER(:categorie_nationala)";
  }
  if (strlen($selectedCategorieComunitara)) {
    $sql .= " AND UPPER(CATEGORIA_COMUNITARA) LIKE UPPER(:categorie_comunitara)";
    $sql1 .= " AND UPPER(CATEGORIA_COMUNITARA) LIKE UPPER(:categorie_comunitara)";
  }
  if (strlen($selectedMarca)) {
    $sql .= " AND UPPER(MARCA) LIKE UPPER(:marca)";
    $sql1 .= " AND UPPER(MARCA) LIKE UPPER(:marca)";
  }


  $sql1 .= $continuareSQl1;
  $sql .= $continuareSQl;
  $stmt = oci_parse($conn, $sql);
  $stmt1 = oci_parse($conn, $sql1);
  if (strlen($selectedJudet)) {
    oci_bind_by_name($stmt, ":judet", $selectedJudet);
    oci_bind_by_name($stmt1, ":judet", $selectedJudet);
  }
  if (strlen($selectedCategorieNationala)) {
    oci_bind_by_name($stmt, ":categorie_nationala", $selectedCategorieNationala);
    oci_bind_by_name($stmt1, ":categorie_nationala", $selectedCategorieNationala);
  }
  if (strlen($selectedCategorieComunitara)) {
    oci_bind_by_name($stmt, ":categorie_comunitara", $selectedCategorieComunitara);
    oci_bind_by_name($stmt1, ":categorie_comunitara", $selectedCategorieComunitara);
  }
  if (strlen($selectedMarca)) {
    oci_bind_by_name($stmt, ":marca", $selectedMarca);
    oci_bind_by_name($stmt1, ":marca", $selectedMarca);
  }


  oci_execute($stmt);

  $numRows = oci_fetch_all($stmt, $results);

  oci_execute($stmt1);



  $data12 = array();


  while ($row = oci_fetch_assoc($stmt1)) {
    $judet = $row['JUDET'];
    $numarMasini = $row['TOT'];
    $data12[$judet] = $numarMasini;
  }

  $fileToDelete123 = "generated_map.html";
  if (file_exists($fileToDelete123)) {
    if (unlink($fileToDelete123)) {

    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }

  $datedetrimis = json_encode($data12, JSON_NUMERIC_CHECK);
  file_put_contents("ss.json", $datedetrimis);
  $command12 = "python generare_harta.py ss.json";




  $result122 = shell_exec($command12);
  if (file_exists("generated_map.html")) {
    echo "Cartographic data:<br>";
    $hartaHTML = file_get_contents("generated_map.html");
    echo '<iframe srcdoc="' . htmlentities($hartaHTML) . '" width="100%" height="500px"></iframe>';
  } else {
    echo "Generarea hărții a eșuat.";
  }

  oci_free_statement($stmt1);
  oci_free_statement($stmt);
  oci_close($conn);

  $resultHTML = '<table>';
  $resultHTML .= '<tr><th>Judet</th><th>Categorie Nationala</th><th>Categorie Comunitara</th><th>Marca</th><th>Total</th></tr>';
  for ($i = 0; $i < $numRows; $i++) {
    $resultHTML .= '<tr>';
    $resultHTML .= '<td>' . $results['JUDET'][$i] . '</td>';
    $resultHTML .= '<td>' . $results['CATEGORIE_NATIONALA'][$i] . '</td>';
    $resultHTML .= '<td>' . $results['CATEGORIA_COMUNITARA'][$i] . '</td>';
    $resultHTML .= '<td>' . $results['MARCA'][$i] . '</td>';
    $resultHTML .= '<td>' . $results['TOTAL'][$i] . '</td>';
    $resultHTML .= '</tr>';
  }
  $resultHTML .= '</table>';

  $datatosend = implode(', ', $results['TOTAL']);

  $dataConcatenated = array();
  for ($i = 0; $i < $numRows; $i++) {
    $row = $results['JUDET'][$i] . '_' . $results['CATEGORIE_NATIONALA'][$i] . '_' . $results['CATEGORIA_COMUNITARA'][$i] . '_' . $results['MARCA'][$i];
    $dataConcatenated[] = $row;
  }

  $dataConcatenatedString = implode(", ", $dataConcatenated);
  $fileContents = $dataConcatenatedString;
  $filePathConcatenat = "dataNume.TXT";
  file_put_contents($filePathConcatenat, $fileContents);

  $filePathSelectie = "dataSelectie.TXT";
  $filePathTot = "dataNume.TXT";
  file_put_contents($filePathSelectie, $datatosend);

  $fileToDelete = "diagrama.png";

  if (file_exists($fileToDelete)) {
    if (unlink($fileToDelete)) {
    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }

  $fileToDelete1 = "exp.png";

  if (file_exists($fileToDelete1)) {
    if (unlink($fileToDelete1)) {
    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }
  $fileToDelete2 = "Pie.png";

  if (file_exists($fileToDelete2)) {
    if (unlink($fileToDelete2)) {
    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }

  $fileToDelete3 = "BarChart.png";

  if (file_exists($fileToDelete3)) {
    if (unlink($fileToDelete3)) {
    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }

  $fileToDelete4 = "boxenplot.png";

  if (file_exists($fileToDelete4)) {
    if (unlink($fileToDelete4)) {
    } else {
      echo "Eroare la ștergerea fișierului.";
    }
  }

  $command = "python statistic.py \"$filePathSelectie\"";

  $output = shell_exec($command);
  echo "Statistical data:<br>";
  echo $output;


  if (file_exists("boxenplot.png")) {
    echo '<img src="boxenplot.png?' . time() . '" alt="boxenplot">';
  }


  if (file_exists("exp.png")) {
    echo '<img src="exp.png?' . time() . '" alt="exp">';
  }
  if (file_exists("BarChart.png")) {
    echo '<img src="BarChart.png?' . time() . '" alt="BarChart">';
  }

  if (file_exists("diagrama.png")) {
    echo '<img src="diagrama.png?' . time() . '" alt="Diagrama">';

  }

  if (file_exists("Pie.png")) {
    echo '<img src="Pie.png?' . time() . '" alt="Pie">';
  }

  echo "Processed data:<br>";
  echo $resultHTML;
}
?>