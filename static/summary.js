
const submitButton = document.getElementById("submit");
const inputArea = document.getElementById("input-area");
const outputArea = document.getElementById("summary-right");
const summaryHead = document.getElementById("summary-heading");
const spinner = document.getElementById('spinner');

summaryHead.style.display='none';

submitButton.addEventListener("click", () => {
  console.log('clicked..')
  outputArea.innerHTML=null;
  summaryHead.style.display = 'none';
  const text = inputArea.value;

  // Show the spinner before making the axios request
  spinner.style.display = 'block';


  axios.post("/predict-summary", { text: text})
    .then((response) => {
      summaryHead.style.display = 'block';
      outputArea.innerHTML = response.data.message;
      spinner.style.display = 'none';
    })
    .catch((error) => {
      console.log(error);
      spinner.style.display = 'none';
    });

});




