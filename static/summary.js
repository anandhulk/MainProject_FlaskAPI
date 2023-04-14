
const submitButton = document.getElementById("submit");
const inputArea = document.getElementById("input-area");
const outputArea = document.getElementById("summary-right");
const scaleInput = document.getElementById("scale");
console.log("the out"+outputArea);
submitButton.addEventListener("click", () => {
  console.log('clicked..')
  outputArea.innerHTML=null;
  const text = inputArea.value;
  const spinner = document.getElementById('spinner');

  // Show the spinner before making the axios request
  spinner.style.display = 'block';


  axios.post("/predict", { text: text})
    .then((response) => {
      outputArea.innerHTML = response.data.message;
      spinner.style.display = 'none';
    })
    .catch((error) => {
      console.log(error);
      spinner.style.display = 'none';
    });

  // query({"inputs": text}).then((response) => {
  //   // console.log(JSON.stringify(response));
  //   console.log(response[0]['generated_text'])
  //   outputArea.innerHTML=response[0]['generated_text'];
  // });
});

// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/Anandhulk/pegasus-scientific_lay",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
//   console.log("requested....")
// 	const result = await response.json();
// 	return result;
// }

// query({"inputs": "The answer to the universe is"}).then((response) => {
// 	console.log(JSON.stringify(response));
// });
