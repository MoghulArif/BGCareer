    function fileUpload() {

        console.log("File upload called"); 
        //var con = confirm("Do you really want to submit the form?");

        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;


        //var fileUpload = $("#FileUpload1").get(0);
        //var files = fileUpload.files;
        if (files.length > 0)
        {
        $('#fileuploaderror').hide();

        // Create FormData object  
        var fileData = new FormData();

            // Looping over all files and add it to FormData object
            for (var i = 0; i < files.length; i++) {
                     fileData.append(files[i].name, files[i]);
            }
            // Adding one more key to FormData object
            fileData.append('Name', $("#cName").val());
            fileData.append('PhoneNumber', $("#cPhoneNumber").val());
            fileData.append('Email', $("#cEmail").val()); 
            fileData.append('Position', $("#cPosition").val());



            


        // Create FormData object
        //    var fileData = new FormData();
        //    $.each(files, function (value, key) {
        //        fileData.append(key, value);
        //    });
        //    fileData.append("emailId", $('#txtemail').val());

            //var request = {
        //    method: 'POST',
        //    url: '/Home/Uploadattachment',
        //    data: fileData,
        //    headers: {
        //        'Content-Type': undefined
        //    }
        //};
        //$http(request).success(function (d) {
        //    debugger
        //}).error(function () {
        //});

        $.ajax({
            method: 'POST',
            type: 'GET',
            url: '/Home/Uploadattachment',

            data: fileData,
            processData: false,
            contentType: false,
            
            success: function (e) {
                alert("Submitted Successfully" + e);
                $('input[type="text"],textarea').val(''); 
                $('input[type="tel"],textarea').val('');
                $('input[type="email"],textarea').val(''); 
                $('input[type="file"],textarea').val('');

            },
            error: function (e) {
                
            }
        });
    }
    else
        {
            //alert("Please enter your occupation");
        alert("Please fill all the details!");
        $('#fileuploaderror').show();
    }
};




// Only PDF files must be accepted
function FileSelected(sender) {
    if (check(sender.value)) //check is you function to check extension 
    { /*alert('Thank you')*/ }
    else
    { alert('Only PDF files are accepted') }
};

function check(a) {
    return a.indexOf('pdf') > -1
};




// Name Validation (Only alphabets allowed)
function alphaOnly(event) {
    var key = event.keyCode;
    //return ((key >= 65 && key <= 90) || key == 8);
    return ((key >= 65 && key <= 90) || key >= 8 && key <=46);

};


function numOnly(e) {
    
    var key = e.keyCode;
    //return ((key >= 65 && key <= 90) || key == 8);
    return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));

};






//Position (DropDown) Validation
$("#careersForm").validate({
    messages: {
        cPosition: {
            required: "Please select an option from the list, if none are appropriate please select 'Other'",
        },
    }
});






function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    var $result = $("#result");
    var email = $("#cEmail").val();
    $result.text("");

    if (validateEmail(email)) {
        $result.text(email + " is valid :)");
        $result.css("color", "green");
    } else {
        $result.text(email + " is not valid :(");
        $result.css("color", "red");
    }
    return false;
}

$("#cSubmit").on("click", validate);

//function isEmail(email) {
//    var regex = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
//    return regex.test(email);
//};

//Email Validation
//$(document).ready(function (e) {
//    $('#cSubmit').click(function () {
//        var sEmail = $('#cEmail').val();
//        // Checking Empty Fields
//        if ($.trim(sEmail).length == "") {
//            alert('Email is mandatory');
//            e.preventDefault();
//        }
//        if (validateEmail(sEmail)) {
//            alert('Nice!! your Email is valid, now you can continue..');
//        }
//        else {
//            alert('Invalid Email Address');
//            e.preventDefault();
//        }
//    });
//});


// Function that validates email address through a regular expression.
//function validateEmail(sEmail) {
//    var filter = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
//    if (filter.test(sEmail)) {
//        return true;
//    }
//    else {
//        return false;
//    }
//};





