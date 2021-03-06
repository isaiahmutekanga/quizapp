// Client facing scripts here

const createElement = function (questionNumber) {
  return `
        <div class= "question question-${questionNumber}">

        <label for="question">Question #${1 + questionNumber}</label>
        <input type="text" name="question${questionNumber}[]" required/>
        <br />
        <label for="question">Option A</label>
        <input type="text" name="choices${questionNumber}[]" required/>
        <br />
        <label for="question">Option B</label>
        <input type="text" name="choices${questionNumber}[]" required/>
        <br />
        <label for="question">Option C</label>
        <input type="text" name="choices${questionNumber}[]" required/>
        <br />
        <label for="question">Option D</label>
        <input type="text" name="choices${questionNumber}[]" required/>
        <br />
        <label for="options">Choose the correct answer:</label>
        <select name="answer_index${questionNumber}[]" id="correct-ans">
          <option value="0">Option A</option>
          <option value="1">Option B</option>
          <option value="2">Option C</option>
          <option value="3">Option D</option>
        </select>

      </div>
      `;
};

$(document).ready(function () {
  const deletequestion = ".deletequestion";

  $(".addquestion").on("click", function () {
    const questionNumber = $(".question").length;

    $("#myform").append(createElement(questionNumber));
  });
  $(".deletequestion").on("click", () => {
    const questionNumber = $(".question").length;
    $(`.question-${questionNumber - 1}`).remove();
  });
  // $(".deletequestion").on("click", function (e) {
  //   e.preventDefault();
  //   //debugger;
  //   e.target.parentElement.childNodes[3].value = "";
  //   e.target.parentElement.childNodes[9].value = "";
  //   e.target.parentElement.childNodes[15].value = "";
  //   e.target.parentElement.childNodes[21].value = "";
  //   e.target.parentElement.childNodes[27].value = "";
  //   e.target.parentElement.remove();
  //   $(".question").each((i, element) => {
  //     console.log(element, i);
  //     element.setAttribute("class", `question question-${i}`);
  //     element.firstElementChild.innerText = `Question #${1 + i}`;
  //     element.children[1].name = `question${i}[]`;
  //     element.children[4].name = `choices${i}[]`;
  //     element.children[7].name = `choices${i}[]`;
  //     element.children[10].name = `choices${i}[]`;
  //     element.children[13].name = `choices${i}[]`;
  //     element.children[16].name = `choices${i}[]`;
  //   });
  //   return false;
  // });
  // });
  $(".postquiz").on("click", function (e) {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  });
});
