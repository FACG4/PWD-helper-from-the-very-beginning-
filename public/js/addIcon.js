const fade = document.getElementById('Fade');
const nextToB = document.getElementById('nextToB');
const nextToD = document.getElementById('nextToD');
const nextToC = document.getElementById('nextToC');
const previousToA = document.getElementById('previousToA');
const previousToB = document.getElementById('previousToB');
const previousToD = document.getElementById('previousToD');
const previousToC = document.getElementById('previousToC');
const allForm = document.getElementById('allForm');
const analysis = document.getElementById('analysis');

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

// // const next=[];
// next.push(nextToB);
// next.push(nextToD);
// next.push(nextToC);

// // for(var i=0 ; i<=next.length ; i++){
// //     next[i].addEventListener("click", function(e){ 
// //         e.preventDefault();
// //     });

// // }