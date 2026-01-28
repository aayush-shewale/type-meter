// Texts for each level
const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "Learn JavaScript step by step.",
    "I love learning new things every day.",
    "Coding is fun when you practice regularly.",
    "Small steps lead to big achievements.",
    "Always stay focused and never give up.",
    "Reading improves your knowledge and skills.",
    "Keep typing to improve your speed.",
    "A journey of learning starts with curiosity.",
    "Practice makes perfect in every task."
  ],
  moderate: [
    "Typing speed improves with regular practice and concentration.",
    "Frontend development is both creative and logical.",
    "Always focus on accuracy first, speed comes later.",
    "Consistency in practice will make you a faster typist.",
    "JavaScript allows you to create interactive websites easily.",
    "Understanding the basics is key to mastering coding.",
    "Focus on accuracy before trying to increase speed.",
    "Learning to debug your code improves problem-solving skills.",
    "Practice daily to build muscle memory for typing.",
    "Writing clean code is as important as making it work.",
    "Challenging exercises help improve logical thinking."
  ],
  hard: [
    "In programming, attention to detail is crucial, and errors can propagate quickly if unchecked.",
    "Consistent practice, patience, and logical thinking are essential to mastering JavaScript and other coding languages.",
    "Challenging exercises help strengthen mental agility and problem-solving skills over time.",
    "Typing speed and accuracy are enhanced through deliberate and consistent practice.",
    "The efficiency of coding depends not only on knowledge but also on patience and logical thinking.",
    "Attention to detail ensures fewer errors and better performance in programming.",
    "Developing problem-solving skills is crucial for tackling complex coding challenges.",
    "Practicing challenging texts improves mental agility and typing precision.",
    "Learning advanced JavaScript concepts requires persistence and experimentation.",
    "Writing efficient and readable code is a skill developed over time.",
    "Regular testing and debugging reinforce understanding and mastery of coding principles."
  ]
};


// Function to pick random text
function getRandomText(level) {
  const arr = texts[level];
  return arr[Math.floor(Math.random() * arr.length)];
}

// Handle switching between sections
const homeSection = document.getElementById("home");
const levelSections = document.querySelectorAll(".level-section");

document.querySelectorAll(".level-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const level = btn.dataset.level;
    homeSection.classList.remove("active");
    levelSections.forEach(s => s.id === level ? s.classList.add("active") : s.classList.remove("active"));
  });
});

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    levelSections.forEach(s => s.classList.remove("active"));
    homeSection.classList.add("active");
  });
});

// Typing test logic
document.querySelectorAll(".start-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const level = btn.dataset.level;
    const textDisplay = document.getElementById(`text-display-${level}`);
    const inputArea = document.getElementById(`input-${level}`);
    const stats = document.getElementById(`stats-${level}`);

    inputArea.value = "";
    stats.innerHTML = "";
    inputArea.disabled = false;

    textDisplay.textContent = getRandomText(level);
    inputArea.focus();

    const startTime = new Date();

    function endTest() {
      const typedText = inputArea.value.trim();
      const originalText = textDisplay.textContent.trim();
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      const words = typedText.split(" ").length;
      const wpm = Math.round((words / timeTaken) * 60);

      let correctChars = 0;
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) correctChars++;
      }
      const accuracy = Math.round((correctChars / originalText.length) * 100);

      stats.innerHTML = `
        <p><span class="highlight">Time:</span> ${timeTaken.toFixed(2)}s</p>
        <p><span class="highlight">WPM:</span> ${wpm}</p>
        <p><span class="highlight">Accuracy:</span> ${accuracy}%</p>
      `;
    }

    inputArea.oninput = () => {
      if (inputArea.value.trim() === textDisplay.textContent.trim()) {
        inputArea.disabled = true;
        endTest();
      }
    };
  });
});
