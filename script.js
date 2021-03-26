document.getElementById("demo").style.textAlign = "center";
document.getElementById("demo").style.backgroundColor = "#A4A4A4";


var tempo = document.getElementById("tempo");
var adicionar = document.createElement("span");
var inputar = document.createElement("input");
var btniniciar = document.createElement("input");
var btnmaisdez = document.createElement("input");
var btnmenosdez = document.createElement("input");
var hr = document.createElement("hr");
var divinputar = document.createElement("div");

inputar.setAttribute("type", "number");
inputar.setAttribute("id", "valorinputar");
inputar.setAttribute("value", "0");
inputar.setAttribute("min", "0");
inputar.setAttribute("style", "width:70px;");
inputar.setAttribute("class", "ui input");

divinputar.setAttribute("class", "ui input");
divinputar.appendChild(inputar);

btniniciar.setAttribute("id", "comecar");
btniniciar.setAttribute("type", "button");
btniniciar.setAttribute("value", "iniciar");
btniniciar.setAttribute("class", "ui teal button");


btnmaisdez.setAttribute("type", "button");
btnmaisdez.setAttribute("value", "+10");
btnmaisdez.setAttribute("class", "ui blue button");

btnmenosdez.setAttribute("type", "button");
btnmenosdez.setAttribute("value", "-10");
btnmenosdez.setAttribute("class", "ui orange button");

var texto = document.createTextNode("Descanso: ");
adicionar.appendChild(texto);
var novoElemento = document.getElementById("lista");

var botao = document.getElementById("botao").addEventListener("click", function () {
    novoElemento.appendChild(hr);
    novoElemento.appendChild(adicionar);
    novoElemento.appendChild(divinputar);
    novoElemento.appendChild(btnmaisdez);
    novoElemento.appendChild(btnmenosdez);
    novoElemento.appendChild(btniniciar);

    document.getElementById("comecar").addEventListener("click", function(){
        document.getElementById("lista").setAttribute("style", "transition: all rotate(270deg) 2s linear;");
    })
});

btnmaisdez.addEventListener("click", function () {
    var tempoatual = parseInt(document.getElementById("valorinputar").value, 10);
    document.getElementById("valorinputar").value = tempoatual + 10;
});

btnmenosdez.addEventListener("click", function () {
    var tempoatual = parseInt(document.getElementById("valorinputar").value, 10);
    if (tempoatual == 0) {
        alert("O tempo de descanso deve ser maior que 0.");
    } else {
        document.getElementById("valorinputar").value = tempoatual - 10;
    }
});

btniniciar.addEventListener("click", function () {
    document.getElementById("demo").style.transition = "all 0.5s";
    var cor = document.getElementById("demo");
    cor.style.backgroundColor = "lightBlue";
    var contador = document.getElementById("valorinputar").value;

    var intervalo = setInterval(function () {
        if (contador >= 10) {
            document.getElementById("tempo").setAttribute("style", "font-size:300px; margin-top:150px; text-align: center;");
            document.getElementById("demo").style.textAlign = "center";
            document.getElementById("tempo").textContent = contador;
            document.getElementById("lista").setAttribute("style", "margin-top:137px;");
            contador = contador - 1;
        }
        else if (contador >= 0) {
            if (contador == 0) {
                cor.style.backgroundColor = "orange";
            }
            if (contador <= 9) {
                document.getElementById("tempo").setAttribute("style", "font-size:300px; margin-top:150px; text-align: center;");
                document.getElementById("demo").style.textAlign = "center";
                document.getElementById("tempo").textContent = "0" + contador;
                document.getElementById("lista").setAttribute("style", "margin-top:137px;");
                contador = contador - 1;
            }
        }
        else {
            clearInterval(intervalo);
            cor.style.backgroundColor = "orange";
            document.getElementById("tempo").setAttribute("style", "color:red; font-size:300px; margin-top:150px; transition:color 1s ease-in-out;");
            document.getElementById("player").setAttribute("src", "3seg.mp3");
        }

    }, 1000);

});