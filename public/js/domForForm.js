function openLink(evt, animName) {
  let i;
  let x;
  const tablinks = document.getElementsByClassName('tablink');
  x = document.getElementsByClassName('city');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace('w3-red', '');
  }
  document.getElementById(animName).style.display = 'block';
  evt.currentTarget.className += ' w3-red';
}
