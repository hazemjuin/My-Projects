/**
 * 
 */
/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

function goProfile() {
	window.location.replace("/users/profile");
}

function goLogOut() {
	window.location.replace("/logout");
}

$(document).ready(function() {
	//change event for input:file
    $('#imageURL').change(function() {
    	showImageThumbnail(this);
	});
    
});
    
function showImageThumbnail(fileInput) {
	file = fileInput.files[0];
    reader = new FileReader();
        
    reader.onload = function(e) {
    	$('#thumbnail').attr('src', e.target.result);
    };
    
    reader.readAsDataURL(file);
}