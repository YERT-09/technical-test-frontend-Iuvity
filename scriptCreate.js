const urlbase = "http://localhost:8080/api";
const createRequest = "/create";

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

//POST
function createProduct(data){
    console.log(data)
    $.ajax({
        type: "POST",
        url: urlbase + createRequest,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:function(){
            window.open("index.html","_self")
        }
        
    });
}
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    let jsonData = $.parseJSON(JSON.stringify(value))
    jsonData['productCode'] = parseInt(jsonData['productCode'])
    jsonData['productPrice'] = parseInt(jsonData['productPrice'])
    jsonData['productQuantity'] = parseInt(jsonData['productQuantity'])
    createProduct(jsonData)
}
