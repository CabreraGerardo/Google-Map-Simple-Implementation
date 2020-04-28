$('#btnDropdownPracticas').click(function() {
    if($("#collapseBtn").is(":visible"))
    {
        document.getElementById('dropdownPracticas').style.left = 'auto';
        document.getElementById('dropdownPracticas').style.right = 'auto';
    }
    else
    {
        document.getElementById('dropdownPracticas').style.left = 'auto';
        document.getElementById('dropdownPracticas').style.right = '0px';
    }
});