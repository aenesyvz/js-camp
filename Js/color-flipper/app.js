const colors = ["green","red","rgba(133,122,200)","#f15025"];

const color = document.querySelector(".color");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const randomNumber = RandomNumber.getRandomNumber(colors);

    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
});