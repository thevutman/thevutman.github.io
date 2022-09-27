// *** GETTER *** //

function getter(respuesta, pop_ups){
    var keys = Object.keys(respuesta.items[0])

    //items

            
    for(i=respuesta.items.length-1;i>-1;i--){
        var item = respuesta.items[i]
        var k = 0
        var pop_up = document.getElementById(pop_ups).insertRow(k)
        while (true) {
            key = keys[k]
            if (k < keys.length){
                var cell = pop_up.insertCell(k)
                cell.innerHTML = item[key]
                k++
                }
            else {
                break;
                }
        }
               
    }

    //keys

    var pop_up = document.getElementById(pop_ups).insertRow(0)
    for(i=0;i<keys.length;i++){
        key=keys[i]
        var cell = pop_up.insertCell(i)
        cell.innerHTML = "<h4>"+key+"</h4>"
    }
}

function get_message() {
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            var pop_ups = "pop-up_message"
            var pop_up = document.getElementById("pop-up_me")
            var message = document.getElementById("message")
            message.style.display = "none"
            pop_up.style.display = "flex"

            getter(respuesta,pop_ups)
        }
    })
}

function get_moto() {
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

            var pop_up = document.getElementById("pop-up_m")
            var message = document.getElementById("motos")
            message.style.display = "none"
            pop_up.style.display = "flex"

            var pop_ups = "pop-up_moto"
            getter(respuesta,pop_ups)
        }
    })
}

function get_client() {
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(1)
            console.log(respuesta)

            var pop_up = document.getElementById("pop-up_c")
            var message = document.getElementById("client")
            message.style.display = "none"
            pop_up.style.display = "flex"

            var pop_ups = "pop-up_client"
            getter(respuesta,pop_ups)
        }
    })
}

// *** post *** //

function post_moto() {
    let myData= {
        id:$("#id_m").val(),
        brand:$("#brand_m").val(),
        model:$("#model_m").val(),
        category_id:$("#categoryid_m").val(),
        name:$("#name_m").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            alert("Guardado")
            var clear= {
                id:$("#id_m").val(""),
                brand:$("#brand_m").val(""),
                model:$("#model_m").val(""),
                category_id:$("#categoryid_m").val(""),
                name:$("#name_m").val(""),
            }
        }
    })
}

function post_client() {
    let myData= {
        id:$("#id_c").val(),
        name:$("#name_c").val(),
        email:$("#email_c").val(),
        age:$("#age_c").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            alert("guardado")
        }
    })
}

function post_message() {
    let myData= {
        id:$("#id_me").val(),
        messagetext:$("#message_me").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            alert("Guardado")
        }
    })
}

// ** PUT ** //

function put_moto() {
    let myData= {
        id:$("#id_m").val(),
        brand:$("#brand_m").val(),
        model:$("#model_m").val(),
        category_id:$("#categoryid_m").val(),
        name:$("#name_m").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("ACTUALIZADO")
        }
    })
}

function put_client() {
    let myData= {
        id:$("#id_c").val(),
        name:$("#name_c").val(),
        email:$("#email_c").val(),
        age:$("#age_c").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("ACTUALIZADO")
        }
    })
}

function put_message() {
    let myData= {
        id:$("#id_me").val(),
        messagetext:$("#message_me").val(),
    }

    let dataToSend = JSON.stringify(myData)

    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("ACTUALIZADO")
        }
    })
}

//i=respuesta.items.length-1;i>-1;i--

function popUp_mClosed(){
    var pop_up = document.getElementById("pop-up_m")
    var message = document.getElementById("motos")
    message.style.display = "block"
    pop_up.style.display = "none"
    var delet = document.getElementById("pop-up_moto").innerHTML = ""
}

function popUp_cClosed(){
    var pop_up = document.getElementById("pop-up_c")
    var message = document.getElementById("client")
    message.style.display = "block"
    pop_up.style.display = "none"
    document.getElementById("pop-up_client").innerHTML = ""
}

function popUp_meClosed(){
    var pop_up = document.getElementById("pop-up_me")
    var message = document.getElementById("message")
    message.style.display = "block"
    pop_up.style.display = "none"
    document.getElementById("pop-up_message").innerHTML = ""
}

var m = document.getElementById("pop-up_moto")
var c = document.getElementById("pop-up_client") 
var me = document.getElementById("pop-up_message") 
var id = {}


m.addEventListener('click', function (item) {
  table(item)
});
c.addEventListener('click', function (item) {
    table(item)
  });
me.addEventListener('click', function (item) {
  table(item)
});



var delete_m = document.getElementById("delete_m")
delete_m.addEventListener('click', function(){
    let dataToSend = JSON.stringify(id)
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/moto/moto",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("BORRADO")
        }
    })
    popUp_mClosed()
    get_moto()

})

var delete_c = document.getElementById("delete_c")
delete_c.addEventListener('click', function(){
    console.log(10)
    let dataToSend = JSON.stringify(id)
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("BORRADO")
        }
    })
    popUp_cClosed()
    get_client()

})

var delete_me = document.getElementById("delete_me")
delete_me.addEventListener('click', function(){
    let dataToSend = JSON.stringify(id)
    $.ajax({
        url:"https://g9dc4cb308f2ee1-q9fl39ghuzydiw07.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("BORRADO")
        }
    })
    popUp_meClosed()
    get_message()

})

function table(item){
  
    var row = item.path[1];

    var row_value = "";

    for (var j = 0; j < row.cells.length; j++) {

        row_value += row.cells[j].innerHTML;
        row_value += " | ";
    }

    i

    id = {id:parseInt(row.cells[0].innerHTML)}

}