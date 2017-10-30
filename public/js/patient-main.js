//Delete all Assets and Participants

$(document).ready(function() {
    $.get("http://localhost:3000/api/Patient", function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: 'http://localhost:3000/api/Patient/' + data[i].patientId,
                type: 'DELETE',
                success: function(result) {}
            });

        }
    });

    $.get("http://localhost:3000/api/Doctor", function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: 'http://localhost:3000/api/Doctor/' + data[i].doctorId,
                type: 'DELETE',
                success: function(result) {}
            });

        }
    });

    $.get("http://localhost:3000/api/Pharmacist", function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: 'http://localhost:3000/api/Pharmacist/' + data[i].pharmacistId,
                type: 'DELETE',
                success: function(result) {}
            });

        }
    });

    $.get("http://localhost:3000/api/Drug", function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: 'http://localhost:3000/api/Drug/' + data[i].drugId,
                type: 'DELETE',
                success: function(result) {}
            });

        }
    });

    $.get("http://localhost:3000/api/Disease", function(data, status) {
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
        for (var i = 0; i < data.length; i++) {
            $.ajax({
                url: 'http://localhost:3000/api/Disease/' + data[i].diseaseId,
                type: 'DELETE',
                success: function(result) {}
            });

        }
    });


});