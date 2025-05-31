document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li a");
  const body = document.querySelector("body");

  burger.addEventListener("click", () => {
    body.classList.toggle("nav-active");
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-active");
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    });
  });

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mensagem enviada com sucesso!");
      this.reset();
    });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skills = document.querySelectorAll(".progress-bar");
          skills.forEach((skill) => {
            const value = skill.textContent.trim();
            const percent = parseInt(value.replace("%", ""));
            skill.textContent = "0%";
            skill.style.width = "0%";
            let count = 0;
            const interval = setInterval(() => {
              count++;
              skill.textContent = `${count}%`;
              skill.style.width = `${count}%`;
              if (count >= percent) clearInterval(interval);
            }, 15);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(document.querySelector("#skills"));

  let currentIndex = 0;
  const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".portfolio-item");
  const itemWidth = items[0].offsetWidth + 20;

  function moveCarousel(direction) {
    const visibleItems = Math.min(3, Math.floor(window.innerWidth / itemWidth));
    const maxIndex = items.length - visibleItems;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  window.addEventListener("resize", () => {
    moveCarousel(0);
  });

  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeIcons = document.querySelectorAll(".dark-mode-icon");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    darkModeIcons[0].style.display = "none";
    darkModeIcons[1].style.display = "inline";
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeIcons[0].style.display = isDarkMode ? "none" : "inline";
    darkModeIcons[1].style.display = isDarkMode ? "inline" : "none";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});
