const submitMcq = document.getElementById("submit-mcq");
const inputMcq = document.getElementById("input-mcq");
const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const submitAnswer = document.getElementById("submit-answer");
const next = document.getElementById("next");
const radio1 = document.getElementById("option-radio1")
const radio2 = document.getElementById("option-radio2")
const radio3 = document.getElementById("option-radio3")
const radio4 = document.getElementById("option-radio4")
const answerDiv = document.getElementById("answer-div");
const answer = document.getElementById("answer");
const summaryAndMcq = document.getElementById("summaryAndMcq")
const spinner = document.getElementById('spinner-mcq');

console.log("working..")
var i = 0;
var max = 0;
var datas = null;
answerDiv.style.display="none";

if (datas === null) {
    radio1.style.display = 'none';
    radio2.style.display = 'none';
    radio3.style.display = 'none';
    radio4.style.display = 'none';
    submitAnswer.style.display = 'none';
    next.style.display = 'none';
} else {

}

submitMcq.addEventListener("click", () => {

    console.log("clicked mcq...");
    const text = inputMcq.value;
    var url="/predict-mcq";

    if(summaryAndMcq.checked){
        url="/predict-summary-mcq"
    }

    spinner.style.display = 'block';

    axios.post(url, { text: text })
        .then((res) => {
            console.log(res)
            datas = res.data.keyphrases
            max = datas.length
            const data = datas[i]
            question.innerHTML = data.question;
            option1.innerHTML = data.options[0];
            option2.innerHTML = data.options[1];
            option3.innerHTML = data.options[2];
            option4.innerHTML = data.options[3];
            i++;

            radio1.style.display = 'block';
            radio2.style.display = 'block';
            radio3.style.display = 'block';
            radio4.style.display = 'block';
            submitAnswer.style.display = 'inline-block';
            next.style.display = 'inline-block';
            spinner.style.display = 'none';
        })
        .catch((err) => {
            console.log(err)
            spinner.style.display = 'none';
        })
});

next.addEventListener("click", () => {
    console.log("clicked next..")
    answerDiv.style.display="none";
    if (datas != null && i < max) {
        const data = datas[i]
        console.log("now on question number " + i + " total questions are " + max)
        question.innerHTML = data.question;
        option1.innerHTML = data.options[0];
        option2.innerHTML = data.options[1];
        option3.innerHTML = data.options[2];
        option4.innerHTML = data.options[3];
        i++;
    }
    else if (i >= max) {
        alert("Finshed every questions for this input")
    }
});

submitAnswer.addEventListener("click",()=>{
    const data=datas[i-1];
    answer.innerHTML = data.answer;
    answerDiv.style.display = 'block';
    answerDiv.style.color = 'yellow';
})