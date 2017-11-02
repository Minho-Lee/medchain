 $(document).ready(function() {
     $.get("http://localhost:3000/api/system/historian", {},
         function(data, status) {
             console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
             document.getElementById("results").appendChild(renderjson(data));
         });
 });