/*
-get some songs --> ok
-render songs (css song) --> ok
-get currentSong and render it imgs and audio -->ok
-play/ pasue/ seek
  +play: 
    .click on top songs some song and play this song, the button will be change(both button) [medium]
    .get music bar run follow the music [hard]
    .at the button listen now change stop now and box-shadown to it [easy]
  +pasue (reverse of play).
  +seek (I don't know ...)
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "web_Music_player";
let songScreen = $(".screen-song");
let imgSong = $(".Best-Art");
let audio = $("#audio");
let btnPlay = $(".btn-play-pause");
let btnIcon = $(".btn-icon");
let btnText = $(".btn-text");
let process = $("#process");
let btnNext = $(".fa-next");
let btnprev = $(".fa-prev");
let repeatSong = $(".fa-repeat");
let randomeSong = $(".fa-shuffle");
let timeStart = $(".time-start");
let timeEnd = $(".time-end");
const app = {
  currentIndex: 0,
  isPlay: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Anh đã ổn hơn",
      singer: "RPT MCK",
      path: "music/Anh đã ổn hơn.mp3",
      image: "image/img-audio/Anh đã ổn hơn.jpg",
    },
    {
      name: "Chìm Sâu",
      singer: "RPT MCK",
      path: "music/Chìm Sâu - RPT MCK (feat. Trung Trần) - Official Lyrics Video.mp3",
      image: "image/img-audio/Chìm sâu.jpg",
    },
    {
      name: "Lối Nhỏ",
      singer: "Đen",
      path: "music/Đen - Lối Nhỏ ft. Phương Anh Đào (M-V).mp3",
      image: "image/img-audio/Lối nhỏ.jpg",
    },
    {
      name: "Không Thể Say",
      singer: "HIEUTHUHAI",
      path: "music/HIEUTHUHAI - Không Thể Say (prod. by Kewtiie) l Official Video.mp3",
      image: "image/img-audio/Không thể say.jpg",
    },
    {
      name: "Những Lời Hứa Bỏ Quên",
      singer: "Vũ",
      path: "music/Nhưng Lơi Hưa Bo Quên - Vu. (Xmas Live Session).mp3",
      image: "image/img-audio/Những lời hứa bỏ quên.jpg",
    },
    {
      name: "Nụ Hôn Bisou",
      singer: "Lãng",
      path: "music/Nụ hôn Bisou.mp3",
      image: "image/img-audio/Nụ hôn Bisou.jpg",
    },
    {
      name: "ĐỪNG LÀM TRÁI TIM ANH ĐAU",
      singer: "SƠN TÙNG M-TP",
      path: "music/SƠN TÙNG M-TP - ĐỪNG LÀM TRÁI TIM ANH ĐAU - OFFICIAL MUSIC VIDEO.mp3",
      image: "image/img-audio/Đừng làm trái tim anh đau.webp",
    },
    {
      name: "Trái Đất Ôm Mặt Trời",
      singer: "KAI ĐINH x GREY D x HOÀNG THUỲ LINH",
      path: "music/Trái đất ôm Mặt trời - KAI ĐINH x GREY D x HOÀNG THUỲ LINH - performance video.mp3",
      image: "image/img-audio/Trái đất ôm mặt trời.jpg",
    },
    {
      name: "id 072019",
      singer: "W-n",
      path: "music/W-n - id 072019 - 3107 ft 267.mp3",
      image: "image/img-audio/id 072019.jpg",
    },
    {
      name: "TỪNG QUEN ",
      singer: "WREN EVANS",
      path: "music/WREN EVANS - TỪNG QUEN - OFFICIAL AUDIO.mp3",
      image: "image/img-audio/Từng quen.jpg",
    },
    {
      name: "RPT Groovie ft TLinh x RPT MCK (Prod. by fat_benn & RPT LT)",
      singer: "Xích Thêm Chút - XTC Remix ",
      path: "music/Xích Thêm Chút - XTC Remix - RPT Groovie ft TLinh x RPT MCK (Prod. by fat_benn & RPT LT)- RAPITALOVE.mp3",
      image: "image/img-audio/Xích thêm chút - XTC.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  //define attribute currentSong
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
      },
    });
  },

  render: function () {
    let playList = this.songs.map((song) => {
      return `<li class="song-item">
                  <div class="song-item-left">
                    <img
                      src="${song.image}"
                      alt="${song.name}"
                    />
                    <div class="song-item-left-info">
                      <span>${song.name}</span> 
                      <p>${song.singer}</p>
                    </div>
                  </div>
                  <div class="song-item-right">
                    <i class="fa-solid fa-play fa-play-pause-item" style="color: #0c7bcf"></i>
                    <i class="fa-solid fa-square-plus"></i>
                  </div>
                </li>`;
    });
    $(".songs-body").innerHTML = playList.join(" ");
  },

  handleEvent() {
    //do the song play, pause and the button change
    let itemSong = this.getElementPlayList();
    let btnPlayItem = $$(".fa-play-pause-item");
    function hadlePlay() {
      if (app.isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
      audio.onplay = function () {
        app.isPlay = true;
        btnPlay.classList.replace("fa-play", "fa-pause");
        btnPlayItem[app.currentIndex].classList.replace("fa-play", "fa-pause");
        btnIcon.classList.add("btn-icon-active");
        btnText.textContent = "Stop Now";
      };
      audio.onpause = function () {
        app.isPlay = false;
        btnPlay.classList.replace("fa-pause", "fa-play");
        btnPlayItem[app.currentIndex].classList.replace("fa-pause", "fa-play");
        btnIcon.classList.remove("btn-icon-active");
        btnText.textContent = "Listen Now";
      };
    }
    btnPlay.onclick = hadlePlay;
    btnIcon.onclick = hadlePlay;
    btnPlayItem.forEach((e) => {
      e.onclick = hadlePlay;
    });
    app.handleSeekSong();
    //do change the button and the song will focus
    btnNext.addEventListener("click", (e) => {
      app.nextSong();
      app.forcusSong();
    });
    btnprev.addEventListener("click", (e) => {
      app.prevSong();
      app.forcusSong();
    });

    app.repeatSong();
    app.randomeSong();
    app.handleFocusSong();
    audio.onended = function () {
      btnNext.click();
      audio.play();
    };
  },
  //do the music bar move (seek the song)
  handleSeekSong() {
    let processPercent;
    audio.ontimeupdate = (e) => {
      //move the scroll thumb every music in progress
      processPercent = Math.round((audio.currentTime / audio.duration) * 100);
      process.value = processPercent;
      //set the background follow the timeupdate
      process.style.background = `linear-gradient(to right, #5773ff ${
        processPercent + "%"
      }, #fff ${processPercent + "%"}`;
      //set the time follow the timeupdate
      app.setTimeSong();
    };
    //move background and time of music bar every scroll thumb move
    process.oninput = () => {
      let processPercent1 = process.value;
      //dragging music bar will change the background accordingly
      process.style.background = `linear-gradient(to right, #5773ff ${
        processPercent1 + "%"
      }, #fff ${processPercent1 + "%"}`;
      //dragging music bar will change the time accordingly
      audio.currentTime = (processPercent1 * audio.duration) / 100;
      app.setTimeSong();
    };
    //on click in the music bar then the music play at that section
    process.onchange = (e) => {
      let seektime = e.target.value * (audio.duration / 100);
      audio.currentTime = seektime;
    };
  },
  //get length of play list
  getElementPlayList() {
    let playList = $$(".song-item"); //this playList must be define after render to get the element
    return playList;
  },
  // do the button next
  nextSong() {
    app.currentIndex++;
    if (app.currentIndex >= this.getElementPlayList().length) {
      app.currentIndex = 0;
    }
    app.handleloadCurrent();
  },
  //do the button previous
  prevSong() {
    app.currentIndex--;
    if (app.currentIndex < 0) {
      app.currentIndex = this.getElementPlayList().length - 1;
    }
    app.handleloadCurrent();
  },
  //repeat songs are playing when it end
  repeatSong() {
    let countClick = 0;
    //đoạn này sài classList.toggle thì hay hơn ( Mà lười quá :)) )
    repeatSong.onclick = () => {
      if (countClick % 2 == 0) {
        repeatSong.style.color = "#d63e9e";
        audio.onended = () => {
          audio.play();
        };
      } else {
        repeatSong.style.color = "#fff";
        audio.onended = () => {};
      }
      countClick++;
    };
  },
  //
  randomeSong() {
    let number = this.currentIndex;
    let countClick = 0;
    randomeSong.onclick = () => {
      if (countClick % 2 == 0) {
        randomeSong.style.color = "#d63e9e";
        //make a array has no duplicate elements
        let array = [];
        let random;
        function randome() {
          while (array.length < 10) {
            random = Math.round(
              Math.random() * app.getElementPlayList().length
            );
            if (!array.includes(random) && random !== number) {
              array.push(random);
            }
          }
          console.log(array);
        }
        randome();
        audio.onended = () => {
          if (array.length == 0) {
            randome();
          }
          this.currentIndex = array.shift();
          app.forcusSong();
          this.handleloadCurrent();
          audio.play();
        };
      } else {
        randomeSong.style.color = "#fff";
        audio.onended = () => {};
      }
      countClick++;
    };
  },
  handleFocusSong() {
    let itemSong = this.getElementPlayList();
    let btnPlayItem = $$(".fa-play-pause-item");
    let playlist = $$(".song-item");
    playlist[app.currentIndex].classList.add("song-item-active");
    itemSong.forEach((element, index) => {
      element.onclick = function () {
        //de xoa tk active
        itemSong.forEach((e, i) => {
          if (e.classList.contains("song-item-active"))
            btnPlayItem[i].classList.replace("fa-pause", "fa-play");
        });
        $(".song-item-active")?.classList.remove("song-item-active");
        element.classList.add("song-item-active");
        app.currentIndex = index;
        app.handleloadCurrent();
      };
    });
  },
  forcusSong() {
    let itemSong = this.getElementPlayList();
    let btnPlayItem = $$(".fa-play-pause-item");
    let playlist = $$(".song-item");
    itemSong.forEach((e, i) => {
      if (e.classList.contains("song-item-active"))
        btnPlayItem[i].classList.replace("fa-pause", "fa-play");
    });
    $(".song-item-active")?.classList.remove("song-item-active");
    playlist[app.currentIndex].classList.add("song-item-active");
  },
  scrollIntoActiveSong() {
    setTimeout(() => {
      let activeSong = $(".song-item-active");
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 300);
  },
  setTimeSong() {
    function formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.round(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    timeStart.innerHTML = formatTime(audio.currentTime);
    let timeRemaining = Math.round(audio.duration - audio.currentTime);
    timeEnd.innerHTML = `-${formatTime(timeRemaining)}`;
  },
  loadConfig() {
    if (this.config.currentIndex) {
      this.currentIndex = this.config.currentIndex;
    }
  },
  handleloadCurrent() {
    //Set song information
    songScreen.innerHTML = `<img src="${this.currentSong.image}" alt="Best Art" />
      <span class="name-of-song">${this.currentSong.name} - ${this.currentSong.singer}</span>`;
    imgSong.src = this.currentSong.image;
    //set audio song
    audio.setAttribute("src", `${this.currentSong.path}`);
    //If a song is playing, play the new song automatically
    if (this.isPlay) {
      audio.play();
    }
    //Reset progress bar
    process.style.background = `linear-gradient(to right, #5773ff ${
      audio.currentTime + "%"
    }, #fff ${audio.currentTime + "%"}`;
    process.value = 0;
    //set the time for song
    app.setTimeSong();
    //scroll to active song
    app.scrollIntoActiveSong();
    //save the currentSong
    // localStorage.clear();
    this.setConfig("currentIndex", this.currentIndex);
  },

  start: function () {
    //load config
    this.loadConfig();
    //define properties
    this.defineProperties();
    //render play list
    this.render();
    //handle the feature
    this.handleEvent();
    //render infor of current song in UI
    this.handleloadCurrent();
  },
};

app.start();
