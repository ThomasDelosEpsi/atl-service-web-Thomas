const soap = require("soap");
const fs = require("node:fs");
const http = require("http");


const service = {
    ProductsService : {
        ProductsPort :{
            CreateProduct: function (args, callback) {
                console.log("Args : ", args);

                callback({...args, id: "myid"});
            }
        }
    }
}

const server = http.createServer(function(request , response){
    response.end("404: Not Found" + request.url);
});

server.listen(8000);

const xml = fs.readFileSync("productsService.wsdl", "utf-8");
soap.listen(server,"/products", service, xml, function(){
    console.log("SOAP server running at http://localhost:8000/products?wsdl");
} );