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
        var keyword = $('#searchInput').val();
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
            data.forEach(function(item) {
                if (category == 'all' || item.organismo == category) {
                    $('#resultArea').append(
                        '<div>' + 
                        '<h3>Fuente: ' + item.fuente + '</h3>' +
                        '<p>Organismo: ' + item.organismo + '</p>' +
                        '<p>Serie: ' + item.descripcion_serie + '</p>' +
                        '<p>Unidad de Medida: ' + item.unidad_de_medida + '</p>' +
                        '<p>Periodicidad: ' + item.periodicidad + '</p>' +
                        '<p>Desestacionalizado: ' + item.desestacionalizada + '</p>' +
                        '<p>Tipo de Resumen: ' + item.tipo_de_resumen + '</p>' +
                        '<p>Fecha de último dato: ' + item.fecha_ult_dato + '</p>' +
                        '<p><a href="' + item.link_de_la_fuente + '" target="_blank">Link a la fuente</a></p>' +
                        '</div>'
                    );
                }
            });
        });
    });
});
