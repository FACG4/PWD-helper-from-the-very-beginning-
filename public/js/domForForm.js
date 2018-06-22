const selectorById = id => document.getElementById(id);

function openLink(evt, animName) {
  let i;
  let x;
  const tabLinks = document.getElementsByClassName('tablink');
  x = document.getElementsByClassName('city');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace('w3-red', '');
  }
  document.getElementById(animName).style.display = 'block';
  evt.currentTarget.className += 'w3-red';
}
