const select = element => document.querySelector(element);

select('#submit').addEventListener('click', () => {
  window.location.assign('/form.docx');
});
