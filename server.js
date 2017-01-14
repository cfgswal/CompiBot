/**
 * Ejemplo de servicio basado en Node.js para crear contenido dinámico para un bot.
 *
 */

// Puerto en el que escucha el servidor Node.js (lo obtiene de una variable de entorno y si no existe, el 3000)
const PORT = process.env.PORT || 3000;

// Importamos el framework Express y lo inicializamos
var express = require("express");
var app = express();


// El contenido de la carpeta public se muestra en la raíz del servidor
app.use(express.static(__dirname + "/public"));


/*
    GET /plazo/:fecha
    Ruta que calcula el número de días que faltan para una fecha
    Si el servidor se está ejecutando localmente:
    http://localhost:3000/plazo/2017-01-31T23:59:59.000Z
    Devuelve un objeto JSON con el formato:
    [{"text":"Faltan 59 días..."}]
*/

var request = require("request");

app.get("/temp", function (req, res) {

    var temperatura = 0;

    request('http://api.geonames.org/findNearByWeatherJSON?lat=42.846718&lng=-2.671635&username=eduardo_gpg',
        function (error, response, data) {
            if (!error) {
                var response = JSON.parse(data);
                temperatura = response.weatherObservation.temperature;
                console.log(response.weatherObservation);
            } else {
                temperatura = 15; //temperatura por defecto
            }

            // Crear el objeto con la respuesta
            var respuesta = [
                {
                    text: "Nos encontramos a " + temperatura + " grados de temperatura",
                }
            ];

            // Devolver el objeto en formato JSON
            res.json(respuesta);

        });

});


// Arrancar el servidor y dejarlo a la espera
app.listen(PORT, function () {
    console.log("Servidor Express escuchando en el puerto " + PORT + "...");
});
