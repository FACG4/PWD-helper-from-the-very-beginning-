let preventdef = document.getElementsByClassName('prevent');

for (var i = 0; i < preventdef.length; i++) {
    preventdef[i].addEventListener("click", function (e) {
        e.preventDefault();
    });
}