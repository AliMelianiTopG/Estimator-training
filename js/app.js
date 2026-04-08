let current = 0;
let score = 0;

const data = [
  {
    q: "What should you verify before dispatch?",
    a: ["Key tag & insurance", "Nothing", "Send invoice"],
    c: 0
  },
  {
    q: "When should QC be done?",
    a: ["Before delivery", "After delivery", "Never"],
    c: 0
  }
];

function loadQuestion() {
  const q = data[current];
  document.getElementById("slide").innerHTML = `
    <h2>${q.q}</h2>
    ${q.a.map((answer, index) =>
      `<button onclick="selectAnswer(${index})">${answer}</button>`
    ).join("")}
  `;
}

function selectAnswer(index) {
  if (index === data[current].c) {
    score++;
    alert("✅ Correct");
  } else {
    alert("❌ Incorrect");
  }
}

function nextQuestion() {
  current++;
  if (current < data.length) {
    loadQuestion();
  } else {
    document.getElementById("slide").innerHTML =
      "<h2>Training Complete</h2><p>Score: " + score + "/" + data.length + "</p><p>Built by Ali Meliani</p>";
  }
}

loadQuestion();
