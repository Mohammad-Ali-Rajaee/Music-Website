let music = new Audio();
music.id = "faded";
music.volume = 0.4;
music.autoplay = false;
currentPlaying = null;

let playlist_id = window.localStorage.getItem("playlist_id");

const start = async () => {
  // clieny id and client secret--------------
  const clientId = "d2ebe00d88294ea5b97520d6a94a5aa7";
  const clientSecret = "f3e263f37ea34996a736e964181b2243";

  //  get access token ---------------------

  const getToken = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  let token = await getToken.json();
  token = token.access_token;
  // ------------------------------------------------)

  let catMain = document.querySelector(".cat-main");

  const content = document.querySelector(".art-main");
  let artistIds = [];

  // get tracks by token and playlist id--------------
  const getTracks = async (playlistId) => {
    let result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const tracks = await result.json();
    let trackIds = [];
    let trackIndex = 0;
    tracks.items.forEach((item) => {
      if (item.track.preview_url) {
        trackIndex++;
        trackIds.push(item.track.id);
        songSide(
          item.track.name,
          item.track.album.images[1].url,
          item.track.artists.map((el) => el.name),
          item.track.id,
          trackIndex
        );

        if (trackIndex < 25 && !artistIds.includes(item.track.artists[0].id)) {
          getAndShowArtists(item.track.artists[0].id);
          artistIds.push(item.track.artists[0].id);
        }

        if (item.track.popularity > 80) {
          showPopularSong(
            item.track.name,
            item.track.album.images[1].url,
            item.track.artists.map((el) => el.name),
            item.track.id
          );
        }
      }
    });

    async function getAndShowArtists(artistId) {
      const result = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );

      const artist = await result.json();
      showArtist(artist.name, artist.images[1].url);
      function showArtist(name, img) {
        content.innerHTML += `<li title="${name}">
              <img src="${img}" />
            </li>`;
      }
    }

    let art_scroll_back = document.querySelector(".art-scroll_back");
    art_scroll_back.addEventListener("click", () => {
      content.scrollLeft -= 330;
    });
    let art_scroll_forward = document.querySelector(".art-scroll_forward");
    art_scroll_forward.addEventListener("click", () => {
      content.scrollLeft += 330;
    });

    let song = document.querySelectorAll(".song");
    let playSign = document.querySelectorAll(".play-sign");
    let pauseSign = document.querySelectorAll(".pause-sign");
    let popSong = document.querySelectorAll(".pop-song");
    const play_btn = document.querySelector("#play_music");
    const wave = document.querySelector(".wave");

    const makeAllPause = () => {
      play_btn.innerHTML = "play_arrow";
      wave.classList.remove("wave-active");
      music.pause();

      playSign.forEach((el) => el.classList.add("hidden"));
      pauseSign.forEach((el) => el.classList.remove("hidden"));
      song.forEach((el) => (el.style.backgroundColor = "#111727"));
      popSong.forEach((el) => (el.style.backgroundColor = "#0b1320"));
    };

    async function getTrack(musicId) {
      return new Promise((resolve, reject) => {
        fetch(`https://api.spotify.com/v1/tracks/${musicId}`, {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        })
          .then((data) => {
            const track = data.json();
            resolve(track);
          })
          .catch((err) => reject(err));
      });
    }

    function styleCurrentPlaying() {
      currentPlaying.style.backgroundColor = "rgb(105,105,170,0.1)";
      if (
        Array.from(currentPlaying.parentElement.classList).includes("songs")
      ) {
        let index = Array.from(currentPlaying.parentElement.children).indexOf(
          currentPlaying
        );
        playSign[index].classList.toggle("hidden");
        pauseSign[index].classList.toggle("hidden");
      }
    }

    function playNow(musicId) {
      return new Promise((resolve) => {
        if (musicId === "faded") {
          let faded = { name: "Faded", artist: ["Alan Walker"] };
          playingBox("/src/ImgandAudio/img/1.jpg", faded.name, faded.artist);
          music.src = "/src/ImgandAudio/audio/1.mp3";
          music.id = "faded";
          music.play();
          resolve();
        } else {
          return getTrack(musicId)
            .then((track) => {
              playingBox(
                track.album.images[1].url,
                track.name,
                track.artists.map((el) => el.name)
              );
              music.id = musicId;
              music.src = track.preview_url;
              music.play();
              resolve();
            })
            .catch((error) => {
              console.log("failed to fetch " + error);
            });
        }
      });
      function playingBox(img, name, artistsNames) {
        makeAllPause();
        wave.classList.add("wave-active");
        play_btn.innerHTML = "pause";
        const playingNow = document.querySelector(".playingNow");
        playingNow.innerHTML = `<img class="w-10 h-10 mr-5" src="${img}" />
          <div class="detail">
            <h5 class="text-white text-sm w-full line-clamp-1">${name}</h5>
            <p class="text-xs w-full line-clamp-1">${artistsNames.map(
              (el) => el + " "
            )}</p>
          </div>`;
      }
    }

    song.forEach((el) => {
      el.addEventListener("click", () => {
        playNow(el.id).then(() => {
          currentPlaying = el;
          styleCurrentPlaying();
        });
      });
    });

    popSong.forEach((el) => {
      el.addEventListener("click", () => {
        playNow(el.id).then(() => {
          currentPlaying = el;
          styleCurrentPlaying();
        });
      });
    });

    let play_fade = document.querySelector(".play_fade");
    play_fade.addEventListener("click", () => {
      playNow("faded").then();
    });

    function previous() {
      if (!currentPlaying.previousElementSibling) {
        currentPlaying = currentPlaying.parentElement.lastChild;
        let id = currentPlaying.id;
        playNow(id).then(() => {
          styleCurrentPlaying();
        });
      } else {
        currentPlaying = currentPlaying.previousElementSibling;
        let id = currentPlaying.id;
        playNow(id).then(() => {
          styleCurrentPlaying();
        });
      }
    }

    function next() {
      if (!currentPlaying.nextElementSibling) {
        currentPlaying = currentPlaying.parentElement.firstChild;
        playNow(currentPlaying.id).then(() => {
          styleCurrentPlaying();
        });
      } else {
        let id = currentPlaying.nextElementSibling.id;
        playNow(id).then(() => {
          currentPlaying = currentPlaying.nextElementSibling;
          styleCurrentPlaying();
        });
      }
    }

    music.addEventListener("ended", () => {
      next();
    });

    play_btn.addEventListener("click", () => {
      let currentMusic = music.id;
      if (music.paused) {
        playNow(currentMusic).then(() => styleCurrentPlaying());
      } else {
        makeAllPause();
      }
    });

    document.body.onkeydown = function (e) {
      if (e.key == " " || e.code == "Space") {
        e.preventDefault();
        play_btn.click();
      }
    };

    let previous_music = document.getElementById("previous_music");
    previous_music.addEventListener("click", previous);
    let next_music = document.getElementById("next_music");
    next_music.addEventListener("click", next);

    function songSide(name, img, artistsNames, id, i) {
      const songs = document.querySelector(".songs");
      songs.innerHTML += `<div id="${id}"
          class="song flex items-center justify-between w-full text-white py-3 px-5 cursor-pointer"
        >
          <div class="flex items-center justify-between text-xs">
            <span>${i}</span>
            <img
              class="w-10 h-10 object-cover ml-5"
              src="${img}"
            />
            <span class="flex flex-col items-start pl-3 pr-1.5">
              <p class="text-white line-clamp-1">${name}</p>
              <p class="sub line-clamp-1">${artistsNames.map(
                (el) => el + " "
              )}</p>
            </span>
          </div>
          <span class="material-symbols-outlined text-xl pause-sign"> play_circle </span>
          <span class="material-symbols-outlined hidden text-xl play-sign"> pause </span>
        </div>`;
    }

    /* showing popular songs -------------- */
    function showPopularSong(name, img, artistsNames, id) {
      catMain.innerHTML += `<div id="${id}" class="pop-song flex flex-col items-center px-2 gap-2">
      <img
        class="w-32 h-28 object-cover"
        src="${img}"
      />
      <span class="material-symbols-outlined pause"> play_circle </span>
      <h5 class="text-sm line-clamp-1">${name}</h5>
      <p class="text-xs line-clamp-1">${artistsNames.map((el) => el + " ")}</p>
    </div>`;
    }

    let cat_scroll_back = document.querySelector(".cat-scroll_back");
    cat_scroll_back.addEventListener("click", () => {
      catMain.scrollLeft -= 330;
    });
    let cat_scroll_forward = document.querySelector(".cat-scroll_forward");
    cat_scroll_forward.addEventListener("click", () => {
      catMain.scrollLeft += 330;
    });

    let range = document.getElementById("range");
    let barProgress = document.querySelector(".show-progress");
    let dot = document.querySelector(".bar_dot");

    music.addEventListener("timeupdate", () => {
      let curr_time = document.querySelector(".currTime");
      let end_time = document.querySelector(".endTime");

      let music_cur = music.currentTime;
      let music_dur = music.duration;

      let min = music_dur ? Math.floor(music_dur / 60) : 0;
      let sec = music_dur ? Math.floor(music_dur % 60) : 00;

      let min_cur = Math.floor(music_cur / 60);
      let sec_cur = Math.floor(music_cur % 60);

      curr_time.innerHTML = `${min_cur}:${(sec_cur =
        sec_cur < 10 ? "0" + sec_cur : sec_cur)}`;
      end_time.innerHTML = `${min}:${(sec = sec < 10 ? "0" + sec : sec)}`;

      let realProgress = parseInt((music_cur / music_dur) * 100);

      range.value = realProgress;
      let temp = range.value;
      barProgress.style.width = `${temp}%`;
      dot.style.left = `${temp}%`;
    });

    range.addEventListener("change", () => {
      music.currentTime = (range.value * music.duration) / 100;
    });

    let musicVolume = document.getElementById("volume");
    let volSign = document.querySelector(".vol-sign");
    let vol = document.querySelector(".vol");
    let sound_dot = document.querySelector(".sound_dot");

    musicVolume.addEventListener("change", () => {
      if (musicVolume.value == 0) {
        volSign.innerHTML = "volume_off";
      } else if (musicVolume.value < 50) {
        volSign.innerHTML = "volume_down";
      } else if (musicVolume.value > 50) {
        volSign.innerHTML = "volume_up";
      }
      vol.style.width = `${musicVolume.value}%`;
      sound_dot.style.left = `${musicVolume.value}%`;
      music.volume = musicVolume.value / 100;
    });
  };
  getTracks(playlist_id);
};
start();

// let header = document.querySelector(".p-header");
// if (window.pageYOffset > 0) {
//   header.classList.add("scrolled");
// } else {
//   header.classList.remove("scrolled");
// }
