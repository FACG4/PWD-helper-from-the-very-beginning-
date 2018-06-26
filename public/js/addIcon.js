const select = element => document.getElementById(element);
const nextToB = select('nextToB');
const nextToD = select('nextToD');
const nextToC = select('nextToC');
const previousToA = selectd('previousToA');
const previousToB = select('previousToB');
const previousToD = select('previousToD');
const previousToC = select('previousToC');


const next = [];
next.push(nextToB);
next.push(nextToD);
next.push(nextToC);
next.push(nextToE);
next.push(previousToA);
next.push(previousToB);
next.push(previousToD)
next.push(previousToC)

for (var i = 0; i <= next.length; i++) {
    next[i].addEventListener("click", function (e) {
        e.preventDefault();
    });

}