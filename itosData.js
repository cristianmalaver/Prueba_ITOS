// codigo javascrit realizado por Cristian Camilo Malaver Alzate
var key = 'token=5858bff517a0f374fee19539c958ac0ffccdc0c8ad7641d82856b99db305754e';
// Funciòn para ejecutar la tabla de consulta al banco central de mexico, adicional la libreria dayjs permitetrabajar con
// fechas para los parametros
async function getData() {

    var fechaHoy = dayjs(new Date());
    var fechaHoyD = dayjs(fechaHoy).date();
    var fechaHoyM = dayjs(fechaHoy).month() + 1;
    var fechaHoyA = dayjs(fechaHoy).year();

    var fechaHoyCalculate = fechaHoyA + "-" + fechaHoyM + "-" + fechaHoyD;
    console.log(fechaHoyCalculate);

    var restaDias = dayjs().subtract(4, 'day');
    var fechaHoyD5 = dayjs(restaDias).date();
    var fechaHoyM5 = dayjs(restaDias).month() + 1;
    var fechaHoyA5 = dayjs(restaDias).year();
    var fechaMenos5 = fechaHoyA5 + "-" + fechaHoyM5 + "-" + fechaHoyD5;
    console.log(fechaMenos5);

    $(function () {
        $.ajax({
            url: "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SP68257,SF61745/datos/" + fechaMenos5 + "/" + fechaHoyCalculate + "?" + key,
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (response) {
                var series = response.bmx.series;


                for (var i in series) {
                    var serie = series[i];
                    var reg =  '<tr><th>Nombre de Serie</th><th>Fecha</th><th>Datos</th></tr>'+                    
                    '<tr><td>' + serie.titulo + '</td><td>' + serie.datos[0].fecha + '</td><td>' + '|' + serie.datos[0].dato + '</td></tr>' +
                        '<tr><td>' + '' + '</td><td>' + serie.datos[1].fecha + '</td><td>' + '|' + serie.datos[1].dato + '</td></tr>' +
                        '<tr><td>' + '' + '</td><td>' + serie.datos[2].fecha + '</td><td>' + '|' + serie.datos[2].dato + '</td></tr>' +
                        '<tr><td>' + '' + '</td><td>' + serie.datos[3].fecha + '</td><td>' + '|' + serie.datos[3].dato + '</td></tr>' +
                        '<tr><td>' + '' + '</td><td>' + serie.datos[4].fecha + '</td><td>' + '|' + serie.datos[4].dato + '</td></tr>'

                    $('#result').append(reg);
                }
            }
        });
    });
}
//funcion para obtener los datos del usuario, procesarlos y ejecutar la funcion bisiesto
var form = document.getElementById("fechas");
form.onsubmit = function (e) {
    e.preventDefault();
    var fechaInicio = document.getElementById("fechaInicio").value;
    //var fechaFin = document.getElementById("fechaFin").value;
    console.log(fechaInicio);

    if (fechaInicio == "") {
        alert("fecha vacia x favor diligencia la fecha")
    } else {
        var dateCalculate = dayjs(fechaInicio).year();
        bisiesto(dateCalculate);
    }
}
//funcion bisiesto para saber si un año es bisiesto o no 
function bisiesto(initYear) {
    if (((initYear % 4 == 0) && (initYear % 100 != 0)) || (initYear % 400 == 0)) {
        alert("el año ingresado :" + initYear + ' Es bisiesto. ');
    }
    else {
        alert("el año ingresado : " + initYear + " No es bisiesto")
    }
}
var form = document.getElementById("tablas");
form.onsubmit = function (e) {
    e.preventDefault();
    var filas = document.getElementById("filas").value;
    var columnas = document.getElementById("columnas").value;

    var i, j;
    var res = filas * columnas;
    document.write("<table border>");
    for (i = 0; i < filas; i++) {
        document.write("<tr>");
        for (j = 0; j < columnas; j++) {
            document.write("<td>");
            document.write(res);
            res--;
            document.write("</td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
    

}
// funciòn generate realiza la creaciòn de un array con 20 numeros y la envia a la funcion numberPar que remplaza el metodo SORT
function generate(){

var array = [];
var user_in = 20*2;

while (array.length < user_in){
    array.push(Math.floor(10*Math.random()));
   // var array1 = array.sort();

}
var result = numberPar(array);

    
//console.log(result);
document.getElementById('print').innerHTML="["+result+"]"; 
}

function numberPar (arrayNumbers){
    let newArray = [];
    let max = arrayNumbers[0];

    for(let i = 0; i < arrayNumbers.length; i+= 2){
        newArray.push(arrayNumbers[i]* arrayNumbers[i])
        
    }
    
    let dataLen = newArray.length;
    for(let i=0; i < dataLen; i++){
      for(let j=0; j < dataLen; j++){
        if(j+1 !== dataLen){
          if(newArray[j] > newArray[j+1]){
            let swapElement = newArray[j+1];
            newArray[j+1] = newArray[j];
            newArray[j] = swapElement;
          }
        }  
      }
    }
    return newArray;
}

