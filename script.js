const urlbase = "http://localhost:8080/api";
const getRequest = "/findAll";
const putRequest = "/update";
const deleteRequest = "/delete/";
const createRequest = "/create";
var products;


$("#AddProduct").click(
    function(){
        window.open("addProduct.html","_self")
    }
    
)

$(document).ready(function() {
    getProducts();
});


//GET
function getProducts(){
    $.ajax({
        url: urlbase + getRequest
    }).then(function(data) {
       products = Object.assign({}, data);
       regestTable(products);
    });
}
//PUT
function updateProducts(data){
    console.log(data)
    $.ajax({
        type: "PUT",
        url: urlbase + putRequest,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:function(){
            getProducts();
        }
    });
}
//DELETE
function deleteProducts(id){
    $.ajax({
        type: "DELETE",
        url: urlbase + deleteRequest+id,
        success:function(data){
            products = Object.assign({}, data);
            regestTable(products);
        }
    });
}

function regestTable(products) {
    $('#table-products').empty();
    $.each(products, function(i, item) {
        var $tr = $('<tr>').append(
            $('<td>').text(Number(i)+1),
            $('<td>').text(item.productCode),
            $('<td>').text(item.productName),
            $('<td>').text(item.productPrice),
            $('<td>').text(item.productQuantity),
            $('<td>').append(
                $('<i/>',
                {
                    class: "fa fa-shopping-cart",
                    'aria-hidden': "true",
                    click: function () { 
                        if(item.productQuantity > 0){
                            sell(Number(i)+1); 
                        } else {
                            $(this).prop('disabled', true)
                        }
                    }
                })
            ),
            $('<td>').append(
                $('<i/>',
                {
                    class: "fa fa-plus",
                    'aria-hidden': "true",
                    click: function () { addUnits(Number(i)+1); }
                })
            ),
            $('<td>').append(
                $('<i/>',
                {
                    class: "fa fa-ban",
                    'aria-hidden': "true",
                    click: function () { eraseProduct(Number(i)+1); }
                })
            )
        ).appendTo('#table-products');
    });
}

function sell(id) {
    let quantity = window.prompt("How many did you sell?", 1)
    if (quantity != null) {
        let newQuantity = products[id-1].productQuantity - quantity;
        alert("You sold: " +  quantity + " "+ products[id-1].productName)
        products[id-1].productQuantity = newQuantity;
        if(newQuantity >= 0) {
            updateProducts(products[id-1]);
        }else {
            alert('There is not enough quantity');
        }
    }
    
}

function addUnits(id) {
    let quantityAdd = window.prompt("How many are you going to add?", 1)
    if (quantityAdd != null) {
        let newQuantityAdd = -products[id-1].productQuantity - quantityAdd;
        alert("You added: " +  quantityAdd + " "+ products[id-1].productName)
        products[id-1].productQuantity = Math.abs(newQuantityAdd);
        updateProducts(products[id-1]);
    }
    
}

function eraseProduct(id) {
    if (confirm("Are you sure you want to delete " + products[id-1].productName +"?") == true) {
        deleteProducts(products[id-1].id);
    }
}
