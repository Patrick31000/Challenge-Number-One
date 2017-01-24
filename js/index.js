$(document).ready(function() {
    var getHttpRequest = function() {
        var httpRequest = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!httpRequest) {
            alert('Abandon :( Impossible de créer une instance XMLHTTP');
            return false;
        }
        return httpRequest;
    };

    var x;
    var nom;
    var tabnum = [];



    $.ajax({
        type: "GET",
        url: "Challenge.xml",
        dataType: "xml",
        success: xmlFunction


    });


    function xmlFunction(xml) {

        $(xml).find('contact').each(function() {
            x = $(this).attr('id');
            tabnum.push(x);
            nom = $(this).find('name').text();

            console.log(x);

            $("#dropdown").append($('<option>', { value: x, text: nom }));
        });


        $('select').change(function() {
            value = this.value;
            var y = tabnum.indexOf(value);
            name = xml.getElementsByTagName('name')[y].firstChild.nodeValue;
            var company = xml.getElementsByTagName('company')[y].firstChild.nodeValue;
            var phone = xml.getElementsByTagName('phone')[y].firstChild.nodeValue;
            document.forms[0].elements[0].value = name;
            document.forms[0].elements[1].value = company;
            document.forms[0].elements[2].value = phone;
        });

    };
});