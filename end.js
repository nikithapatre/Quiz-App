const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;   // cos localstorage stores onl;y string, convert into JS object
// console.log(highScores);

const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
})

function saveHighScore(event) { // onclick event on end html page
  console.log("Saved");
  event.preventDefault();

  const score = {                // keyValue
    score: Math.floor( Math.random() * 100), 
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a,b) => {
    return b.score - a.score; //sort from higheest to lowest. to get highest score, if b score is greater than a score, return b score as highest
  });
  highScores.splice(5);   // shows only top 5 scores, deletes after 5th number
 
 localStorage.setItem("highScores", JSON.stringify("highScores"));
 window.location.assign("/"); 
 // console.log(score);
}
