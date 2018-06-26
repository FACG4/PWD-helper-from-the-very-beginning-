const select = element => document.getElementById(element);
const nextToB = select('nextToB');
const nextToD = select('nextToD');
const nextToC = select('nextToC');
const previousToA = select('previousToA');
const previousToB = select('previousToB');
const previousToD = select('previousToD');
const previousToC = select('previousToC');

previousToA.addEventListener("click", function (e) {
    e.preventDefault();
});

previousToB.addEventListener("click", function (e) {
    e.preventDefault();
});
previousToD.addEventListener("click", function (e) {
    e.preventDefault();
});
previousToC.addEventListener("click", function (e) {
    e.preventDefault();
});

nextToB.addEventListener("click", function (e) {
    e.preventDefault();
});

nextToD.addEventListener("click", function (e) {
    e.preventDefault();
});

nextToC.addEventListener("click", function (e) {
    e.preventDefault();
});

const nextToE = document.getElementById('nextToE');
nextToE.addEventListener("click", function (e) {
    e.preventDefault();
});