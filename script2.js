//Banco de Dados +++
var bd = openDatabase("meubanco","1.0", "mybase", 4096);
bd.transaction(function(criar){
    criar.executeSql("create table if not exists exercicios (id integer primary key, nome text, treino integer(1))");
});


function salvar(){
    var exercnome = document.getElementById("exercnome").value;
    var idtreino = document.getElementById("idtreino").value;
    bd.transaction(function(armazenar){
        armazenar.executeSql("insert into exercicios (nome, treino) values (?, ?)", [exercnome, idtreino]);
    });

    setTimeout(function(){
        consultarPorTreino();
    },500);
}

function atualizar(idexercicio, exercnome, idtreino ){
    bd.transaction(function(armazenar){
        armazenar.executeSql("update exercicios set nome=?, treino=? where id=?", [exercnome, idtreino, idexercicio]);
    });

    consultarPorTreino();
}

function deletar(valor){

    bd.transaction(function(tx) {
        tx.executeSql('delete from exercicios where id=?', [valor], function(transaction, result) {
            console.log(result);
            console.info('Record Deleted Successfully!');
        }, function(transaction, error) {
            console.log(error);
        });
    });
    
    setTimeout(function(){
        consultarPorTreino();
    },500);
    location.reload();
}

function consultar(){
    var tabela = document.getElementById("tabelaexerc");
    bd.transaction(function(consulta){
        consulta.executeSql("select * from exercicios", [], function(consulta, resultado){
            var linhas = resultado.rows;
            var tr = '';

            for(var i = 0; i < linhas.length; i++){
                tr += '<tr>';
                tr += '<td>' + linhas[i].id + '</td>';
                tr += '<td>' + linhas[i].nome + '</td>';
                tr += '<td><button value='+linhas[i].id+' class="btn btn-danger" data-toggle="modal" data-target="#exampleModal2" style="font-size: 1vh">deletar</td> ';
                tr += '<td></td>';
                tr += '</tr>';
            }
            tabela.innerHTML = tr;
        });
    });
}

function consultarPorTreino(){
    var tabela = document.getElementById("tabelaexerc");
    var treino = document.getElementById("treino").value;

    bd.transaction(function(consulta){
        consulta.executeSql("select * from exercicios where treino= ?", [treino], function(consulta, resultado){
            var linhas = resultado.rows;
            var tr = '';

            if(linhas.length > 0){
                for(var i = 0; i < linhas.length; i++){
                    tr += '<tr>';
                    tr += '<td style=visibility: hidden>' + linhas[i].id + '</td>';
                    tr += '<td>' + linhas[i].nome + '</td>';
                    tr += '<td><button value='+linhas[i].id+' class="btn btn-danger" data-toggle="modal" data-target="#exampleModal2" style="font-size: 1vh">deletar</td> ';
                    tr += '<td><button value='+linhas[i].id+' class="btn btn-success" data-toggle="modal" data-target="#exampleModal3" style="font-size: 1vh">alterar</td> ';
                    tr += '<td></td>';
                    tr += '</tr>';
                }
                tabela.innerHTML = tr;
            }else{
                tabela.innerHTML = '<tr><td>Não há exercícios salvos!!</td></tr>'
            }
            
        });
    });

}
//Banco de Dados ---


document.querySelector("#cronometro").innerHTML = '0';

document.getElementById("mais10").addEventListener("click", function(){
    var mais10 = parseInt(document.getElementById("valorinput").value, 10) + 10;
    document.getElementById("valorinput").value = mais10;

    if(document.getElementById("valorinput").value <= 0 ){
        document.getElementById("valorinput").value = 0;
    }
});

document.getElementById("menos10").addEventListener("click", function(){
    var menos10 = parseInt(document.getElementById("valorinput").value, 10) - 10;
    document.getElementById("valorinput").value = menos10;

    if(document.getElementById("valorinput").value <= 0 ){
        document.getElementById("valorinput").value = 0;
    }
});

var alarme;
document.getElementById("iniciar").addEventListener("click", function(){
    contador = parseInt(document.getElementById("valorinput").value, 10);
    alarme = setInterval(function(){
        if(contador >= 0){
            var dividir = parseFloat(contador).toFixed(3).split(".");

            if(dividir[0].length >=3){
                document.getElementById("cronometro").innerHTML = dividir[0] + ".".fontsize('10px') + dividir[1].fontsize('10px');
                $("#cronometro").innerHTML = dividir[0] + ".".fontsize('10px') + dividir[1].fontsize('10px');
            }else{
                document.getElementById("cronometro").innerHTML = dividir[0] + ".".fontsize('10px') + dividir[1].fontsize('10px');
            }
            contador = contador - 0.01;
        }else{
            document.getElementById('player').play();
            clearInterval(alarme);
            
        }
    }, 10);
    
});

function piscar(){
    $("body").fadeOut();
    $("body").fadeIn();
}

document.getElementById("pausar").addEventListener("click", function(){
    document.getElementById('player').pause();
    clearInterval(alarme);
});

jQuery(document).ready(function() {
    consultarPorTreino();
    setTimeout(function(){
        var trs = document.querySelectorAll("#tabelaexerc tr");
        for(var i = 0; i < trs.length; i++){
            $(trs[i]).children("td:eq(2)").on("click", function () {
                var local = this;
                
                $("#apagarsim").on("click", function(){
                    //alert($(local).closest("tr").children("td:eq(0)").text());
                    deletar($(local).closest("tr").children("td:eq(0)").text());
                });
            });

            $(trs[i]).children("td:eq(3)").children("button").on("click", function () {              
                    $("#altnome").val($(this).parent().parent().children("td:eq(1)").text());
                    $("#altidtreino").val($("#treino").val())
                    $("#altidexerc").val(this.getAttribute("value"))

                    console.log($(this).parent().parent().children("td:eq(1)").text());                    
                    console.log($("#altidtreino").val());
                    console.log(this.getAttribute("value"));
        });
        }
    }, 500);
});



//Alterar a lista de exercicios conforme o treino selecionado.
$('select').on('change', function() {
    consultarPorTreino();
    setTimeout(function(){
        var trs = document.querySelectorAll("#tabelaexerc tr");
        //alert($(trs[0]).text());
        for(var i = 0; i < trs.length; i++){
            $(trs[i]).children("td:eq(2)").on("click", function () {   
                var local = this;       
                $("#apagarsim").on("click", function(){
                    //alert($(local).closest("tr").children("td:eq(0)").text());
                    deletar($(local).closest("tr").children("td:eq(0)").text());
                });
            });

            $(trs[i]).children("td:eq(3)").children("button").on("click", function () {              
                
                    $("#altnome").val($(this).parent().parent().children("td:eq(1)").text());
                    $("#altidtreino").val($("#treino").val())
                    $("#altidexerc").val(this.getAttribute("value"))

                    console.log($(this).parent().parent().children("td:eq(1)").text());                    
                    console.log($("#altidtreino").val());
                    console.log(this.getAttribute("value"));
            });
        }

    }, 500);
});


//Resgatar número do treino quando for adicionar um novo exercício.
$("#novoexerc").on("click", function(){
    $("#idtreino").val($("#treino").val());
});

$("#atualizarexerc").on("click", function(){
    var novonome = $("#altnome").val();
    var idexercicio = $("#altidexerc").val();
    var novoidtreino = $("#altidtreino").val();
    
   // console.log(novonome);
    atualizar(idexercicio, novonome, novoidtreino);

    consultarPorTreino();
    
});