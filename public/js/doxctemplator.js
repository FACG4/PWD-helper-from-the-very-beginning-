const select = (element) => document.querySelector(element);

function postData(inputs){
  console.log(inputs);
    fetch('/formToDocx', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.status === true){
        window.location.assign('/form.docx');
      }
    })
    .catch((err) => alert(err.message));
  }

function submit(){
  const inputs = document.querySelectorAll('input');
  let inputsValues = {}
  inputs.forEach((input) => {
    if(input.checked){
    let inputName;
    if (input.attributes.name) {
      inputName = input.attributes.name.nodeValue;
    }
      return inputsValues[inputName] = input.value;
    }
  });
  postData(inputsValues);

};

select('#submit').addEventListener("click", function(){
  submit();
});
