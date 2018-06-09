 function fileUpload() {

        console.log("File upload called"); 
        //var con = confirm("Do you really want to submit the form?");

        var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;


        //var fileUpload = $("#FileUpload1").get(0);
        //var files = fileUpload.files;

        if (validateForm(files) == true)
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
                   
                                
        $.ajax({
            method: 'POST',
            //type: 'GET',
            url: '/Home/Uploadattachment',

            data: filedata,
            //data: { 'Name': 'Arif', 'Email': 'a@a.com', 'PhoneNumber': '0525220365', 'Position': 'Software' },
            dataType: "json",

            processData: false,
            contentType: 'application/json',
            
            success: function (e) {
                alert('success ' + e.messages);
                $('input[type="text"],textarea').val(''); 
                $('input[type="number"],textarea').val('');
                $('input[type="email"],textarea').val(''); 
                $('input[type="file"],textarea').val('');

            },
            error: function (e) {
                alert('error' + e.messages);
            }
        });
    }
    else
        {
        //alert("Please enter your occupation");
        alert("Please fill all the details!"); // Validation is only working for UploadAttachment
        $('#fileuploaderror').show();// When the same PDF is used, this works
    }
};

function validateForm(allfiles) {

    if (allfiles.length > 0 && $('#cPosition').val() && is_valid_email($('#cEmail').val()) && $('#cPhoneNumber').val() && $('#cName').val()) {
        return true;
    }
    return false;

}

//========= Validation for ATTACH CV (Only PDF files must be accepted) ==========//

function FileSelected(sender) {
    if (check(sender.value)) //check is you function to check extension 
    { /*alert('Thank you')*/ }
    else
    { alert('Only PDF files are accepted') }
};

function check(a) {
    return a.indexOf('pdf') > -1
};

//=========== Validation for NAME (Only alphabets allowed) ============//

function alphaOnly(event) {
    var key = event.keyCode;
    //return ((key >= 65 && key <= 90) || key == 8);
    return ((key >= 65 && key <= 90) || key >= 8 && key <=46);

};

//================== Validation for EMAIL =========================//

function emailValidate() {
    //example@gmail.com
    
    //var is_valid_email = function () {
    //    return /^.+@.+\..+$/.test($('#cEmail').val());
    //}(); // Self evealuationg functions

    if (!is_valid_email($('#cEmail').val())) {
        $('#cEmail').addClass('red-border');
        //$('#cEmail').attr('style', 'border: 1px solid red');
        alert("Please enter a valid email address");
    }
    else {
        $('#cEmail').removeClass('red-border');
    }
   
}

var is_valid_email = function (email) {
    
    return /^.+@.+\..+$/.test(email);
};










