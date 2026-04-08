
const modules = [
  {title:"RepairDot Basics", content:[
    "Use Queue → filter Unassigned → sort by Appt Date",
    "Move to Tech Review only after estimate is received",
    "Pre-order parts depends on correct status"
  ]},
  {title:"Pre-Appointment", content:[
    "Collect insurance estimate before drop-off",
    "Set rental expectations (Enterprise Dedham)",
    "Use key tags to qualify appointments"
  ]},
  {title:"Check-In", content:[
    "Review photos & parts",
    "Walk vehicle with customer",
    "Capture full photo set (CYA)"
  ]},
  {title:"Estimating Standards", content:[
    "Follow Tesla labor ops",
    "Itemize teardown time",
    "Avoid prohibited charges"
  ]},
  {title:"Customer Communication", content:[
    "Set expectations early",
    "Always get approvals",
    "Provide proactive updates"
  ]},
  {title:"Production Flow", content:[
    "Use Dog Tags",
    "Track SUPP/POP/G2G",
    "Set ETC correctly"
  ]},
  {title:"QC & Delivery", content:[
    "Check paint quality",
    "Verify repairs",
    "Explain value to customer"
  ]},
  {title:"Daily Workflow", content:[
    "Respond quickly",
    "Update ETCs",
    "Close tickets properly"
  ]}
];

const quizzes = [
  {q:"What must you verify before dispatch?", a:["Key tag & insurance","Nothing","Send invoice"], c:0},
  {q:"When should QC be done?", a:["Before delivery","After","Never"], c:0},
  {q:"Why collect insurance estimate early?", a:["Reduce delays","No reason","For fun"], c:0}
];

let state = JSON.parse(localStorage.getItem("ali_training")||"{"i":0,"score":0}");
let i = state.i || 0;
let score = state.score || 0;

const nav = document.getElementById("nav");
const slide = document.getElementById("slide");
const title = document.getElementById("title");
const progressBar = document.getElementById("progressBar");

modules.forEach((m,idx)=>{
  const a = document.createElement("a");
  a.innerText = m.title;
  a.onclick=()=>{i=idx;render();save();}
  nav.appendChild(a);
});

function render(){
  title.innerText = modules[i].title;
  slide.innerHTML = `
    <div class="card hero">${modules[i].title}</div>
    <div class="grid">
      ${modules[i].content.map(x=>`<div class="card">${x}</div>`).join("")}
    </div>
    <div class="grid">
      ${getImages().slice(0,6).map(src=>`<div class="imgCard"><img src="images/${src}" onclick="openImg('images/${src}')"/></div>`).join("")}
    </div>
  `;
  document.querySelectorAll("nav a").forEach((el,idx)=>el.classList.toggle("active", idx===i));
  progressBar.style.width = ((i+1)/modules.length*100)+"%";
  if(i===modules.length-1){showQuiz();}
}

function getImages(){
  return ["image1.png","image2.png","image3.png","image4.png","image5.png","image6.png","image7.png","image8.png","image9.jpeg"];
}

function showQuiz(){
  const qc = document.getElementById("qContainer");
  qc.innerHTML="";
  quizzes.forEach((q,qi)=>{
    const div = document.createElement("div");
    div.className="q";
    div.innerHTML = `<p>${q.q}</p>` + q.a.map((x,ai)=>`<button onclick="answer(${qi},${ai},this)">${x}</button>`).join("");
    qc.appendChild(div);
  });
  document.getElementById("quiz").classList.remove("hidden");
}

function answer(qi,ai,btn){
  const q = quizzes[qi];
  if(ai===q.c){btn.classList.add("correct"); score++;} else {btn.classList.add("wrong");}
  save();
}

document.getElementById("nextQ").onclick = ()=>{
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("complete").classList.remove("hidden");
  document.getElementById("finalScore").innerText = "Score: "+score+"/"+quizzes.length;
};

document.getElementById("certBtn").onclick = ()=>{
  const name = document.getElementById("nameInput").value || "Estimator";
  const cert = document.getElementById("certificate");
  cert.innerHTML = `<h3>Certificate of Completion</h3><p>${name}</p><p>Completed Tesla Estimator Training</p><p>Score: ${score}/${quizzes.length}</p><p>Built by Ali Meliani</p>`;
  cert.classList.remove("hidden");
};

function openImg(src){
  document.getElementById("lightbox").classList.remove("hidden");
  document.getElementById("lightboxImg").src=src;
}
document.getElementById("closeLightbox").onclick=()=>document.getElementById("lightbox").classList.add("hidden");

function save(){
  localStorage.setItem("ali_training", JSON.stringify({i,score}));
}

document.getElementById("resetBtn").onclick=()=>{
  localStorage.removeItem("ali_training");
  location.reload();
};

render();
