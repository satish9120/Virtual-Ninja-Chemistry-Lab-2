/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////

questions": [
    {
      "question": "Which test is used as a general test for all carbohydrates?",
      "answers": {
        "a": "Benedict’s test",
        "b": "Molisch’s test",
        "c": "Iodine test",
        "d": "Barfoed’s test"
      },
      "explanations": {
        "a": "Benedict’s test is specific for reducing sugars, not all carbohydrates.",
        "b": "Correct! Molisch’s test is a general test for carbohydrates, where concentrated sulfuric acid reacts to form a purple ring.",
        "c": "Iodine test is specific for polysaccharides like starch.",
        "d": "Barfoed’s test distinguishes monosaccharides from disaccharides."
      },
  {
    question: "2. A positive iodine test gives which color with starch?", 
    answers: {
      a: "Red", 
      b: "Blue-black", 
      c: "Green", 
      d: "Yellow"
    },
    correctAnswer: "b"
  },
  {
    question: "3. Which of the following tests distinguishes between reducing and non-reducing sugars?", 
    answers: {
      a: "Molisch’s test", 
      b: "Barfoed’s test", 
      c: "Benedict’s test", 
      d: "Iodine test"
    },
    correctAnswer: "c"
  },
  {
    question: "4. What is the principle behind Benedict’s and Fehling’s tests?", 
    answers: {
      a: "Oxidation of ketones", 
      b: "Reduction of copper(II) to copper(I)", 
      c: "Complex formation", 
      d: "Hydrolysis of polysaccharides"
    },
    correctAnswer: "b"
  },
  {
    question: "5. Which test would you perform to confirm the presence of monosaccharides specifically?", 
    answers: {
      a: "Barfoed’s test", 
      b: "Molisch’s test", 
      c: "Iodine test", 
      d: "Benedict’s test"
    },
    correctAnswer: "a"
  }

              ///// To add more questions, copy the section below 
    									                  ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
