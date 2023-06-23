function saveImagesAsWebP() {

  var infoCenter = document.querySelector('.infoCenter1');

  var images = infoCenter.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    var image = images[i];

    if (image.src.includes('glowing-neon-magnifying-glass-icon-isolated-on-brick-wall-background-search-focus-zoom-business-symbol-illustration-vector.jpg')) {
      continue;
    }
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
  
    context.drawImage(image, 0, 0);
    
    var webpData = canvas.toDataURL('image/webp');

    var link = document.createElement('a');
    link.href = webpData;
    link.download = 'image' + i + '.webp';
 
    link.click();
  }
}



function saveImagesAsSVG() {

  var infoCenter = document.querySelector('.infoCenter1');
  
  var images = infoCenter.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    if (img.src.includes('glowing-neon-magnifying-glass-icon-isolated-on-brick-wall-background-search-focus-zoom-business-symbol-illustration-vector.jpg')) {
      continue;
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var xlinkNS = 'http://www.w3.org/1999/xlink';

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', img.width);
    svg.setAttribute('height', img.height);

    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttributeNS(xlinkNS, 'xlink:href', img.src);
    image.setAttribute('width', img.width);
    image.setAttribute('height', img.height);

    svg.appendChild(image);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svg);
    var blob = new Blob([svgString], { type: 'image/svg+xml' });
    var filename = 'image_' + i + '.svg';

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
    }
  }
}

function exportTableAsCSV() {
  var table = document.querySelector('.infoCenter1 table');

  if (table) {
    var csv = '';
    
    var rows = table.rows;
    
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      
      var cells = row.cells;
      
      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        
        csv += cell.innerText;
        
        if (j < cells.length - 1) {
          csv += ',';
        }
      }
      
      csv += '\n';
    }
    
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    
    saveAs(blob, 'table.csv');
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'table.csv';

    
    link.click();
  }

}



var exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', exportTableAsCSV);
exportButton.addEventListener('click', saveImagesAsWebP);
exportButton.addEventListener('click', saveImagesAsSVG);
