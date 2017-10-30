$(document).ready(function() {

    $.post("http://localhost:3000/api/Patient", {
            "$class": "org.acme.medchain.Patient",
            "patientId": doc[0].name,
            "name": doc[0].name
        },
        function(data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        });

    $('#submitToDoctor').click(function(e) {
        var diseaseElement = document.getElementById("diseases");
        var diseaseToAdd = diseaseElement.options[diseaseElement.selectedIndex].value;

        console.log(diseaseToAdd);

        $.post("http://localhost:3000/api/Disease", {
                "$class": "org.acme.medchain.Disease",
                "diseaseId": diseaseToAdd,
                "description": diseaseToAdd,
                "patient": "none"
            },
            function(data, status) {
                console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

                $.post("http://localhost:3000/api/AddDiseaseToPatient", {
                        "$class": "org.acme.medchain.AddDiseaseToPatient",
                        "disease": diseaseToAdd,
                        "newPatient": doc[0].name
                    },
                    function(data, status) {
                        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
                    });
            });
    });

});