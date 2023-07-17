$(document).ready(function() {
    var categories = [];
    $('#categorySelect').append(new Option('Elegí una categoría...', '', true, true));
    $('#categorySelect').append(new Option('Todas las categorías', 'all'));
    $.getJSON('https://deissms.github.io/leyes_especiales_m/base_series.json', function(data) {
        data.forEach(function(item) {
            if (!categories.includes(item.organismo)) {
                categories.push(item.organismo);
            }
        });
        categories.forEach(function(category) {
            $('#categorySelect').append(new Option(category, category));
        });
    });

    $('#searchForm').submit(function(e) {
        e.preventDefault();
        var keyword = $('#searchInput').val().toLowerCase();
        var category = $('#categorySelect').val();
        var alertMessage = '';
        if (keyword == "" && category == "") {
            alertMessage = "Introducí un parámetro de búsqueda y elegí una categoría";
        } else if (keyword == "") {
            alertMessage = "Introducí un parámetro de búsqueda";
        } else if (category == "") {
            alertMessage = "Elegí una categoría";
        }
        if (alertMessage != '') {
            alert(alertMessage);
            return;
        }
    
        $.getJSON('https://deissms.github.io/leyes_especiales_m/base_series.json', function(data) {
            $('#resultArea').empty();
            var resultsCount = 0;
            data.forEach(function(item) {
                if ((category == 'all' || item.organismo == category) && 
                    (item.descripcion_serie.toLowerCase().includes(keyword) || item.organismo.toLowerCase().includes(keyword))) {
                    $('#resultArea').append(
                        '<div class="resultItem">' + 
                        '<h3>' + item.descripcion_serie + '</h3>' +
                        '<p>Organismo: ' + item.organismo + '</p>' +
                        '<p>Fuente: ' + item.fuente + '</p>' +
                        '<p>Unidad de Medida: ' + item.unidad_de_medida + '</p>' +
                        '<p>Periodicidad: ' + item.periodicidad + '</p>' +
                        '<p>Desestacionalizado: ' + item.desestacionalizada + '</p>' +
                        '<p>Tipo de Resumen: ' + item.tipo_de_resumen + '</p>' +
                        '<p>Fecha de último dato: ' + item.fecha_ult_dato + '</p>' +
                        '</div>'
                    );
                    resultsCount++;
                }
            });
            if(resultsCount > 0){
                var resultsText = resultsCount > 1 ? "Resultados encontrados: " : "Resultado encontrado: ";
                $('#resultArea').prepend('<p id="resultsCount" style="color: #E156A6; font-family: Poppins;">' + resultsText + resultsCount + '</p>');
            } else {
                alert("Ningún resultado encontrado. Hacé otra búsqueda");
                document.getElementById("searchForm").reset();  // Añadimos esta línea para resetear el formulario
            }
        });
    });
});
