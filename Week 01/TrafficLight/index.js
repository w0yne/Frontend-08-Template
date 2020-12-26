function toggleLight(color) {
  const lights = document.getElementsByClassName("traffic-light");
  Array.from(lights).forEach((element) => {
    if (element.classList.contains(color)) {
      element.classList.add("light-on");
    } else {
      element.classList.remove("light-on");
    }
  });
}

async function sleep(t) {
  return new Promise((resolve, reject) => setTimeout(resolve, t));
}

(async function go() {
  while (true) {
    toggleLight("green");
    await sleep(1000);
    toggleLight("yellow");
    await sleep(200);
    toggleLight("red");
    await sleep(500);
  }
})();