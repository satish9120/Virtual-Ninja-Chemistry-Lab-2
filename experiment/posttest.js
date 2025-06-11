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
 explanations": {
        "a": "Benedict’s test is specific for reducing sugars, not all carbohydrates.",
        "b": "Correct! Molisch’s test is a general test for carbohydrates, where concentrated sulfuric acid reacts to form a purple ring.",
        "c": "Iodine test is specific for polysaccharides like starch.",
        "d": "Barfoed’s test distinguishes monosaccharides from disaccharides."
      },
      "correctAnswer": "b",
      "difficulty": "beginner"
    },
    {
      "question": "Which carbohydrate gives a positive iodine test (blue-black color)?",
      "answers": {
        "a": "Glucose",
        "b": "Sucrose",
        "c": "Starch",
        "d": "Fructose"
      },
      "explanations": {
        "a": "Glucose is a monosaccharide and does not react with iodine.",
        "b": "Sucrose is a disaccharide and does not give a positive iodine test.",
        "c": "Correct! Starch, a polysaccharide, forms a blue-black complex with iodine.",
        "d": "Fructose is a monosaccharide and does not react with iodine."
      },
      "correctAnswer": "c",
      "difficulty": "beginner"
    },
    {
      "question": "Benedict’s test is used to detect:",
      "answers": {
        "a": "Reducing sugars only",
        "b": "Non-reducing sugars only",
        "c": "All carbohydrates",
        "d": "Proteins"
      },
      "explanations": {
        "a": "Correct! Benedict’s test detects reducing sugars (e.g., glucose, fructose) that form a brick-red precipitate.",
        "b": "Non-reducing sugars (e.g., sucrose) require hydrolysis first.",
        "c": "Benedict’s test is not for all carbohydrates, only reducing sugars.",
        "d": "Proteins are detected by Biuret test, not Benedict’s."
      },
      "correctAnswer": "a",
      "difficulty": "intermediate"
    },
    {
      "question": "Which test distinguishes between monosaccharides and disaccharides?",
      "answers": {
        "a": "Fehling’s test",
        "b": "Barfoed’s test",
        "c": "Seliwanoff’s test",
        "d": "Molisch’s test"
      },
      "explanations": {
        "a": "Fehling’s test is similar to Benedict’s and detects reducing sugars.",
        "b": "Correct! Barfoed’s test differentiates monosaccharides (fast reaction) from disaccharides.",
        "c": "Seliwanoff’s test is specific for ketoses (e.g., fructose).",
        "d": "Molisch’s test is a general test for all carbohydrates."
      },
      "correctAnswer": "b",
      "difficulty": "intermediate"
    },
    {
      "question": "Seliwanoff’s test is specific for:",
      "answers": {
        "a": "Glucose",
        "b": "Fructose",
        "c": "Ketoses (e.g., fructose)",
        "d": "Starch"
      },
      "explanations": {
        "a": "Glucose is an aldose, not detected by Seliwanoff’s test.",
        "b": "Fructose is a ketose, but the broader answer is (c).",
        "c": "Correct! Seliwanoff’s test detects ketoses (like fructose) with a cherry-red color.",
        "d": "Starch is detected by the iodine test."
      },
      "correctAnswer": "c",
      "difficulty": "intermediate"
    }
  ]
}



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
