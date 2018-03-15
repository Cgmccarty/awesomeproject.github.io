/* Javascript Page */
document.getElementById('start').addEventListener('click', getData);

dataFile = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"

function createQuestion(question){
  let answers = [
    {text: question.correct_answer, correct: true},
    {text: question.incorrect_answers[0], correct: false},
    {text: question.incorrect_answers[1], correct: false},
    {text: question.incorrect_answers[2], correct: false}
  ];
  var randomAnswers = shuffle(answers);
  let answerbuttons = randomAnswers.map(function(answer){
    if (answer.correct === true){
      return `<p class="options"> <input class="correct" name="${question.question}" type="radio">${answer.text}</input> </p>
      `
    }
    return `<p class="options"> <input class="incorrect" name="${question.question}" type="radio">${answer.text}</input> </p>`
  })
    let template = ` <p class="question"> ${question.question} </p> <br/> ${answerbuttons.join(' ')}`;
    return template;
}

function getData(){
  fetch(dataFile)
    .then(function(response){
      return(response.json());
    })
    .then(function(data){
      console.log(data);
      let answerhtml = data.results.map(createQuestion);
      let template = answerhtml.join(`<br/> <br/>`);
      template += `<button type="button" id="submit">Submit</button>`
      document.getElementById('content').innerHTML = template;
      console.log(data);
      document.getElementById('submit').addEventListener('click', submitAnswers)
    })
}

function submitAnswers(){
  let guesses = document.querySelectorAll(".options input");
  let correct = 0;
  for (var i= 0; i < guesses.length; i++) {
    if (guesses[i].className === "correct" && guesses[i].checked) {
      correct++;
    }
  }
  let score = (correct/10)*100;
  console.log(score);
  document.getElementById('content').innerHTML = document.getElementById('content').innerHTML
  + ` <br/> <br/> <p> Your score is ${score}%! <br/> <p> <button type="button" onclick="getData()">Try Another!</button> </p> </p>
  <br/> <p> <button type ="button" onclick="restart()">Home</button> </p>`;
}

function restart(){
  location.reload();
}

function shuffle(answers){
  var index = answers.length, temporaryValue, randomIndex;
  while (0 !== index){
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;
    temporaryValue = answers[index];
    answers[index] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }
  return answers;
}
