const clientId = "d2ebe00d88294ea5b97520d6a94a5aa7";
const clientSecret = "f3e263f37ea34996a736e964181b2243";
const tokenUrl = "https://accounts.spotify.com/api/token";
const categoryUrl = "https://api.spotify.com/v1/browse/categories";

let token = "";

const start = async () => {
  const getToken = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await getToken.json();
  token = data.access_token;

  const getGenres = async (token) => {
    const result = await fetch(categoryUrl, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const categories = await result.json();

    async function catMenuHandler() {
      categories.categories.items.forEach(async (el, index) => {
        let result = await fetch(
          `https://api.spotify.com/v1/browse/categories/${el.id}/playlists`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
          }
        );
        result = await result.json();
        let playlists = result;
        const catContainer = document.querySelector(".categories");
        catContainer.innerHTML += `<div id="${el.id}" class="option">
              <button
              class="cat flex items-center rounded-xl justify-between w-full text-white py-2 px-5 cursor-pointer"
              type="button"
              >
               <div class="flex items-center justify-between text-xs">
                 <span>${index + 1}</span>
                 <img
                 class="w-16 h-16 object-cover ml-5"
                 src="${el.icons[0].url}"
               />
               <span class="flex pl-3 pr-1.5">
               <p class="flex items-center justify-center gap-2 text-lg"><span class="text-base material-symbols-outlined">
               category
               </span>${el.name}</p>
               </span>
               </div>
               <span class="material-symbols-outlined text-2xl pr-3">
               keyboard_arrow_down
               </span>
               </button>
               <div
               class="dropdown z-10 hidden rounded-lg shadow w-11/12 mx-auto"
               >
               <ul
               class="py-2 text-sm text-gray-700 dark:text-gray-200"
               >
               ${playlists.playlists.items
                 .map((el) => {
                   if (el) {
                     return `
                    <li id="${el.id}" class="playlist">
                    <a
                    href="/pages/play.html"
                    class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    ><span class="text-lg material-symbols-outlined">
                    playlist_play
                    </span> ${el.name}</a
                    >
                    </li>`;
                   }
                 })
                 .join("")}
                </ul></div></div>`;
        crucial();
      });

      function crucial() {
        let cats = document.querySelectorAll(".cat");
        let dropdown = document.querySelectorAll(".dropdown");
        cats.forEach((item, i) => {
          item.addEventListener("click", () => {
            if (Array.from(dropdown[i].classList).includes("hidden")) {
              dropdown.forEach((el) => el.classList.add("hidden"));
              dropdown[i].classList.remove("hidden");
            } else {
              dropdown[i].classList.add("hidden");
            }
          });
        });

        let playlists = document.querySelectorAll(".playlist");
        playlists.forEach((item) => {
          item.addEventListener("click", () => {
            let playlist_id = item.id;
            console.log(playlist_id);
            window.localStorage.setItem("playlist_id", playlist_id);
          });
        });
      }
    }

    catMenuHandler();
  };
  getGenres(token);

  return data.access_token;
};
start();

// slider -------------------------------
const slider = document.querySelectorAll(".slider");
let backs = document.querySelectorAll(".back");

slider.forEach((item, i) => {
  item.addEventListener("click", () => {
    backs.forEach((el) => el.classList.add("hide"));
    let back = document.querySelector(`.p-background${i}`);
    back.classList.remove("hide");
    back.classList.add("show");
  });
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 7000); // Change image every 2 seconds
}

// end slider ----------------------------------

//------------hamburger menu-------------------------
//---------------------------------------------------
const menu = document.querySelector(".menu");
const menu_btn = document.querySelector(".hambergur");

menu.addEventListener("click", menu_open);

function menu_open(event) {
  event.stopPropagation();
  menu_btn.classList.toggle("is-active");
}

document.addEventListener("click", menu_close);
function menu_close() {
  menu_btn.classList.remove("is-active");
}

let header = document.querySelector(".p-header");
window.onscroll = function () {
  if (window.pageYOffset > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
