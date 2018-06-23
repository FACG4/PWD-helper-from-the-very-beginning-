const select = element => document.querySelector(element);

function postData(inputs) {
  console.log(inputs);
  fetch('/formToDocx', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  })
    .then(response => response.json())
    .then((result) => {
      if (result.status === true) {
        window.location.assign('/form.docx');
      }
    })
    .catch(err => alert(err.message));
}

function submit() {
  const inputs = document.querySelectorAll('input');
  const comments = document.querySelectorAll('textarea');
  const formValues = {};
  inputs.forEach((input) => {
    let inputName;
    if (input.attributes.name) {
      inputName = input.attributes.name.nodeValue;
    }
    formValues[inputName] = input.value;
  });
  comments.forEach((comment) => {
    let commentId;
    if (comment) {
      commentId = comment.id;
    }
    formValues[commentId] = comment.value;
  });
  postData(formValues);
}

select('#submit').addEventListener('click', () => {
  submit();
});
