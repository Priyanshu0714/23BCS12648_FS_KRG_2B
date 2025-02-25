const slidesContainer = document.querySelector(".glide__slides");

slidesContainer.addEventListener("mouseover", (event) => {
  const hoverDiv = event.target.closest(".glide__slide")?.querySelector("div");
  if (hoverDiv) {
    hoverDiv.classList.remove("hidden");
  }
});

slidesContainer.addEventListener("mouseout", (event) => {
  const hoverDiv = event.target.closest(".glide__slide")?.querySelector("div");
  if (hoverDiv) {
    hoverDiv.classList.add("hidden");
  }
});

slidesContainer.addEventListener("click", (event) => {
  const hoverDiv = event.target.closest(".glide__slide")?.querySelector("div");
  if (hoverDiv) {
    hoverDiv.classList.toggle("hidden");
  }
});

async function fetchprojectfolder() {
  const response = await fetch("projects/");
  const data = await response.json();
  const div = document.querySelector(".glide__slides");

  // Create array of promises for parallel execution
  const promises = data
    .filter((e) => !e.includes("."))
    .map(async (e) => {
      const fetchingfolder = await fetch(`projects/${e}/info.json`);
      const fetcheddata = await fetchingfolder.json();

      const li = document.createElement("li");
      li.classList.add("glide__slide", "relative");

      li.innerHTML = `
                <div class="hidden absolute bottom-0 h-auto w-full bg-white opacity-80 rounded-lg z-10 items-center justify-center flex-col space-y-2 overflow-y-scroll p-2 border-t-2 border-gray-400">
                    <div class="text-2xl font-bold">${fetcheddata.title}</div>
                    <div class="text-sm">${fetcheddata.description}</div>
                    <a class="text-white bg-black h-8 flex items-center justify-center p-2 rounded-lg w-[30%]" href="${fetcheddata.link}" target="_blank">Visit</a>
                </div>
                <img src="projects/${e}/image.png" alt="image" onerror="this.onerror=null; this.src='projects/${e}/image.avif';">
            `;

      div.appendChild(li);
    });

  // Wait for all fetches to complete
  await Promise.all(promises);

  // Initialize Glide after all slides are loaded
  new Glide(".glide-trending", {
    type: "carousel",
    perView: 3,
    autoplay: 3000,
    gap: 10,
    breakpoints: {
      1024: { perView: 2 },
      768: { perView: 1 },
    },
  }).mount();
}

fetchprojectfolder();

document.getElementById("about").addEventListener("click", () => {
  document.getElementById("aboutmescroll").scrollIntoView({
    behavior: "smooth",
  });
});
document.getElementById("Projects").addEventListener("click", () => {
  document.getElementById("projectscroll").scrollIntoView({
    behavior: "smooth",
  });
});
document.getElementById("contactme").addEventListener("click", () => {
  document.getElementById("contactmescroll").scrollIntoView({
    behavior: "smooth",
  });
});

// for the typing effect
const texts = ["Hi, I am Priyanshu", "Hi, I am a Developer."];
let textIndex = 0;
let charIndex = 0;
let typingSpeed = 200;
let erasingSpeed = 50;
let delayBetweenTexts = 1000;

function typeEffect() {
  document.getElementById("typewriter").style.animation = "blink 0.5s infinite";
  if (charIndex < texts[textIndex].length) {
    document.getElementById("typewriter").innerHTML +=
      texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(eraseEffect, delayBetweenTexts);
  }
}

function eraseEffect() {
  document.getElementById("typewriter").style.animation = "blink 0.5s infinite";
  if (charIndex > 0) {
    document.getElementById("typewriter").innerHTML = texts[
      textIndex
    ].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeEffect, typingSpeed);
  }
}

typeEffect();

const hamburgerMenu = document.getElementById("hamburgermenu");
const closeButton = document.getElementById("closebutton");
const hamburgerScroll = document.getElementById("hamburgerScroll");

hamburgerMenu.addEventListener("click", () => {
  document.querySelector("body").classList.replace("relative", "fixed");

  hamburgerScroll.classList.remove(
    "translate-x-full",
    "opacity-0",
    "pointer-events-none",
  );
  hamburgerScroll.classList.add("translate-x-0", "opacity-100");
});

closeButton.addEventListener("click", () => {
  hamburgerScroll.classList.remove("translate-x-0", "opacity-100");
  hamburgerScroll.classList.add("translate-x-full", "opacity-0");

  setTimeout(() => {
    hamburgerScroll.classList.add("pointer-events-none");
    document.querySelector("body").classList.replace("fixed", "relative");
  }, 500);
});

document.getElementById("aboutpart").addEventListener("click", () => {
  hamburgerScroll.classList.remove("translate-x-0", "opacity-100");
  hamburgerScroll.classList.add("translate-x-full", "opacity-0");

  setTimeout(() => {
    hamburgerScroll.classList.add("pointer-events-none");
    document.querySelector("body").classList.replace("fixed", "relative");

    document.getElementById("aboutmescroll").scrollIntoView({
      behavior: "smooth",
    });
  }, 500);
});

document.getElementById("projectpart").addEventListener("click", () => {
  hamburgerScroll.classList.remove("translate-x-0", "opacity-100");
  hamburgerScroll.classList.add("translate-x-full", "opacity-0");

  setTimeout(() => {
    hamburgerScroll.classList.add("pointer-events-none");
    document.querySelector("body").classList.replace("fixed", "relative");

    document.getElementById("projectscroll").scrollIntoView({
      behavior: "smooth",
    });
  }, 500);
});
