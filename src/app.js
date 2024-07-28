const circle = document.querySelector("#circle");
const $score = document.querySelector("#score");
const img = circle.querySelector("img");

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem("score", score)
    $score.textContent = score
}

function setImage() {
    if(getScore() >= 100) {
        img.setAttribute("src", "./assets/kitten2.jpeg")
    }
}

function getScore() {
    return Number(localStorage.getItem("score")) ?? 0
}

function addOne(score) {
    setScore(getScore() + 1) 
    setImage()
}

function handleClickOrTouch(e) {
  const rect = circle.getBoundingClientRect();

  const offsetX = e.clientX - rect.left - rect.width / 2;
  const offsetY = e.clientY - rect.top - rect.height / 2;

  const DEG = 50;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;

  circle.style.setProperty("--tiltX", `${tiltX}deg`);
  circle.style.setProperty("--tiltY", `${tiltY}deg`);

  setTimeout(() => {
    circle.style.setProperty("--tiltX", `0deg`);
    circle.style.setProperty("--tiltY", `0deg`);
  }, 300);

  const plusOne = document.createElement("div")
  plusOne.classList.add("plus-one")
  plusOne.textContent = "+1"
  plusOne.style.left = `${e.clientX - rect.left}px`
  plusOne.style.top = `${e.clientY - rect.top}px`

  circle.parentElement.appendChild(plusOne)

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
}

circle.addEventListener("click", handleClickOrTouch);
circle.addEventListener('touchstart',(e) => {
  for (let i = 0; i < e.touches.length; i++) {
    handleClickOrTouch(e.touches[i]);
  }
});

start()