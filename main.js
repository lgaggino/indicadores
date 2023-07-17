$(document).ready(function() {
    var categories = [];
    $('#categorySelect').append(new Option('Elegí una categoría...', '', true, true));
    $('#categorySelect').append(new Option('Todas las categorías', 'all'));

    var data; // Variable global para almacenar los datos

    $.getJSON('https://lgaggino.github.io/indicadores/base_series.json', function(jsonData) {
        data = jsonData; // Guardamos los datos en la variable global
        data.forEach(function(item) {
            if (!categories.includes(item.organismo)) {
                categories.push(item.organismo);
            }
        });
        categories.forEach(function(category) {
            $('#categorySelect').append(new Option(category, category));
        });

        // Aquí se ordenan los datos por 'proximo_dato' y se seleccionan los primeros 3
        var upcomingEvents = data.sort(function(a, b) {
            return new Date(a.proximo_dato) - new Date(b.proximo_dato);
        }).slice(0, 3);

        // Aquí se añaden los próximos eventos al header
        var eventsHtml = upcomingEvents.map(function(item) {
            return 'Evento: ' + descripcion_serie + ', Fecha: ' + item.proximo_dato;
        }).join('<br>');

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

        $('#resultArea').empty();
        var resultsCount = 0;
        data.forEach(function(item, index) {
            if ((category == 'all' || item.organismo == category) && 
                (item.descripcion_serie.toLowerCase().includes(keyword) || item.organismo.toLowerCase().includes(keyword))) {
                $('#resultArea').append(
                    '<div class="resultItem">' + 
                    '<h3 id="item-'+index+'"><a href="#">' + item.descripcion_serie + '</a></h3>' +
                    '<div id="popup-'+index+'" class="popupMenu" style="display:none;">' +
                    '<a href="'+item.fuente+'" target="_blank">Ir a la fuente</a><br>' +
                    '<a href="'+item.link_de_la_serie+'" target="_blank">Ir a serie</a><br>' +
                    '<a href="#">Ver metodología</a><br>' +
                    '<a href="#">Ver datos</a>' +
                    '</div>' +
                    '<p>Organismo: ' + item.organismo + '</p>' +
                    '<p>Fuente: ' + item.fuente + '</p>' +
                    '<p>Unidad de Medida: ' + item.unidad_de_medida + '</p>' +
                    '<p>Periodicidad: ' + item.periodicidad + '</p>' +
                    '<p>Desestacionalizado: ' + item.desestacionalizada + '</p>' +
                    '<p>Tipo de Resumen: ' + item.tipo_de_resumen + '</p>' +
                    '<p>Fecha de último dato: ' + item.fecha_ult_dato + '</p>' +
                    '</div>'
                );
                $('#item-'+index).on('click', function(e) {
                    e.preventDefault(); // Agregamos preventDefault aquí
                    $('.popupMenu').hide(); // esconde cualquier otro menú popup visible
                    $('#popup-'+index).show(); // muestra el menú popup para este elemento
                });
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

    $.getJSON('https://lgaggino.github.io/indicadores/base_series.json', function(data) {
    // Ordena los datos por fecha del próximo dato
    data.sort(function(a, b) {
        return new Date(a.proximo_dato) - new Date(b.proximo_dato);
    });
    // Selecciona los primeros 3 elementos
    var upcomingEvents = data.slice(0, 3);
    // Para cada uno de estos eventos, añádelos al div de eventos
    upcomingEvents.forEach(function(event) {
        $('#eventsList').append(
            '<div>' +
            '<h3>Id: #' + event.id_serie + '</h3>' +
            '<p>Fecha: ' + event.proximo_dato + '</p>' +
            '</div>'
        );
    });
});

});










