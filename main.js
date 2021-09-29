const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'VIK_PLAYER';
const DURATION_STORAGE_KEY = 'VIK_DURATION';




const player = $('.player');
const cdThumb = $('.player__song-thumb');
const songTitle = $('.player__song-title');
const author = $('.player__song-author');
const audio = $('#audio');
const progress = $('#progress');
const progressBlock = $('.progress-block');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const optionBtn = $('.option');
const volumeBtn = $('.volume .option-icon')
const volume = $('.volume__range');
const trackTime = $('#tracktime');
const durationTime = $('#durationtime');
const slideImgs = $$('.container__slide-item');
const playBtns = Array.from($$('.btn-toggle-play'));
const playLists = Array.from($$('.playlist__list'));
const navbarItems = Array.from($$('.content__navbar-item'));
const containerTabs = $$('.container__tab')




const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isSeeking: false,
    indexArray: [],
    
    songs: JSON.parse(localStorage.getItem(MUSIC_STORAGE_KEY) || '[]'),

    durationList: JSON.parse(localStorage.getItem(DURATION_STORAGE_KEY) || '["03:28","04:45","02:38","03:28","03:48","03:32","03:04","03:37","03:31","03:11","03:28","03:21","03:17","02:37"]'),

    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) || '{}'),


    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    
    render : function() {
        const htmls = this.songs.map(function(song,index){
            return `
                <div class="playlist__list-song ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
                    <div class="playlist__song-info mr-10">
                        <div class="playlist__song-thumb mr-10" style="background: url('${song.image}') no-repeat center center / cover"></div>
                        <div class="playlist__song-body">
                            <span class="playlist__song-title">${song.name}</span>
                            <p class="playlist__song-author">${song.singer}</p>
                        </div>
                    </div>
                    <span class="playlist__song-time">${app.durationList[index]}</span>
                    <div class="playlist__song-option">
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-mic-fill"></i>
                        </div>
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-heart-fill primary"></i>
                        </div>
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            `;
        })

        const htmlTabSecond = this.songs.map(function(song,index){
            return `
                <div class="playlist__list-song ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
                    <div class="playlist__song-info mr-10">
                        <div class="playlist__song-check">
                            <input type="checkbox" name="" id="playlist__check-${index}" class="mr-10" style="display: none">
                            <label for="playlist__check-${index}"></label>
                        </div>
                        <i class="bi bi-music-note-beamed mr-10"></i>
                        <div class="playlist__song-thumb mr-10" style="background: url('${song.image}') no-repeat center center / cover"></div>
                        <div class="playlist__song-body">
                            <span class="playlist__song-title">${song.name}</span>
                            <p class="playlist__song-author">${song.singer}</p>
                        </div>
                    </div>
                    <span class="playlist__song-time">${app.durationList[index]}</span>
                    <div class="playlist__song-option">
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-mic-fill"></i>
                        </div>
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-heart-fill primary"></i>
                        </div>
                        <div class="playlist__song-btn">
                            <i class="option-icon bi bi-three-dots"></i>
                        </div>
                    </div>
                </div>
            `;
        })
        
        playLists.forEach((playList, index) => {
            if(index === 1) {
                playList.innerHTML = htmlTabSecond.join('');
            } else {
                playList.innerHTML = htmls.join('');
            }
        })
        // this.scrollToActiveSong();
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },



    handleEvents: function() {
        const _this = this;


        // Handle when click play
        playBtns.forEach(playBtn => {
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
        })

        // When the song is played
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        
        // When the song is paused
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Handle next song when audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
            } else {
                nextBtn.click();
            }
            audio.play();
        }


        // When the song progress changes
        audio.ontimeupdate = function(e) {
            if (!_this.isSeeking && audio.duration) {
                const listDurationTime = $('.playlist__list-song.active .playlist__song-time')
                trackTime.innerHTML = _this.audioCalTime(audio.currentTime);
                progress.value = Math.floor(audio.currentTime / audio.duration * 100);
                if(listDurationTime.innerText === '--/--') {
                    _this.durationList.splice(_this.currentIndex, 1, _this.audioCalTime(audio.duration))
                    localStorage.setItem(DURATION_STORAGE_KEY, JSON.stringify(_this.durationList));
                    listDurationTime.innerHTML = _this.durationList[_this.currentIndex];
                    durationTime.innerHTML = _this.durationList[_this.currentIndex];
                }
            } else {
                // Handling when seek
                progress.onchange = function(e) {
                    const seekTime = e.target.value * audio.duration / 100;
                    audio.currentTime = seekTime;
                    trackTime.innerHTML = _this.audioCalTime(audio.currentTime);
                    _this.isSeeking = false;
                }
            }
        }
        
        function currentTime() {
            const seekTime = progress.value * audio.duration / 100;
            if(audio.duration) {
                trackTime.innerText = _this.audioCalTime(seekTime);
            }
        }

        progress.addEventListener('touchmove', currentTime);
        progress.addEventListener('mousemove', currentTime);

        function seekStart() {
            _this.isSeeking = true;
        }

        progressBlock.addEventListener('touchstart', seekStart);


        progressBlock.onmousedown = seekStart;

        

        //  Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 10000 seconds
            iterations: Infinity,
        })
        cdThumbAnimate.pause()



        // When next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render()
            // _this.scrollToActiveSong();
        }

        // When prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render()
            // _this.scrollToActiveSong();
        };

        // Handling on / off random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom)
            this.classList.toggle('active', _this.isRandom)
        }

        // Single-parallel repeat processing
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat)
            this.classList.toggle('active', _this.isRepeat)
        }

        // Listen to playlist clicks
        playLists.forEach(playList => {
            playList.onclick = function(e) {
                const checkNode = e.target.closest('.playlist__song-check')
                const songNode = e.target.closest('.playlist__list-song:not(.active)');
                const optionNode = e.target.closest('.option')
                const activeOption = $('.option.active');
                if( songNode || optionNode || checkNode) {
                    // Handle when clicking on the song
                    if(songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        const songActives = $$(`.playlist__list-song[data-index="${_this.currentIndex}"]`)
                        _this.loadCurrentSong();
                        Array.from($$('.playlist__list-song.active')).forEach(songActive => {
                            songActive.classList.remove('active');
                        })
                        Array.from(songActives).forEach(songActive => {
                            songActive.classList.add('active');
                        })
                        audio.play();
                    }

                    //Handle when click on song checkbox
                    if(checkNode) {
                        checkNode.onclick = function(e) {
                            e.stopPropagation()
                        }
                    }
    
                    // Handle when clicking on the song option
                    if(optionNode) {
                        optionNode.classList.add('active');
                    }
                }
    
                if(activeOption && !e.target.closest('.option__block')) {
                    activeOption.classList.remove('active');
                }
            }
        })

        //Handle adjust volume change
        function changeVolume() {
            if(audio.volume * 100 != volume.value) {
                audio.volume = volume.value / 100;
                _this.setConfig('currentVolume', volume.value)
                if (!audio.volume) {
                    volumeBtn.classList.remove('bi-volume-up');
                    volumeBtn.classList.add('bi-volume-mute')
                } else {
                    volumeBtn.classList.add('bi-volume-up');
                    volumeBtn.classList.remove('bi-volume-mute')
                }
            }
        }
        
        volume.onchange = function(e) {
            changeVolume();
        }
        volume.onmousemove = function(e) {
            e.stopPropagation();
            changeVolume();
        }
        //Use addEventListener to fix the bug in the first loading
        volume.addEventListener('touchmove', function(e) {
            e.stopPropagation();
            changeVolume();
        })


        //Handle slide show
        let imgIndex = 2;
        function slideShow() {
            const slideImgFirst = $('.container__slide-item.first')
            const slideImgSecond = $('.container__slide-item.second')
            const slideImgThird = slideImgs[imgIndex]
            const slideImgFourth = slideImgs[imgIndex === slideImgs.length -1 ?  0 : imgIndex + 1]
            slideImgFourth.classList.replace('fourth', 'third')
            slideImgThird.classList.replace('third', 'second')
            slideImgSecond.classList.replace('second', 'first')
            slideImgFirst.classList.replace('first', 'fourth')
            imgIndex++;
            if(imgIndex >= slideImgs.length) { //imgIndex: 0-7, slideImgs.length: 8
                imgIndex = 0;
            }
            setTimeout(slideShow, 2000)
        }

        slideShow();


        
        // Handle when click on navbar
        navbarItems.forEach((navbarItem, index) => {
            navbarItem.onclick = function() {
                $('.content__navbar-item.active').classList.remove('active')
                navbarItem.classList.add('active')
                
                $('.container__tab.active').classList.remove('active')
                containerTabs[index].classList.add('active')
            }
        })


    },


    loadCurrentSong: function() {
        songTitle.textContent = this.currentSong.name;
        author.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = `${this.currentSong.path}`;
        durationTime.innerHTML = this.durationList[this.currentIndex];
        this.setConfig('currentIndex', this.currentIndex);
    },

    
    audioCalTime: function(time) {
        const minute = Math.floor(time / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const second = Math.floor(time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        return `${minute}:${second}`;
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom || false;
        this.isRepeat = this.config.isRepeat || false;
        this.currentIndex = this.config.currentIndex || 0;
        audio.volume = this.config.currentVolume == 0 ? 0 : this.config.currentVolume / 100 || 1;
        volume.value = this.config.currentVolume || 100;
        durationTime.textContent = this.audioCalTime(this.durationList[this.currentIndex]);
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRandom);
    },

    setUpRender: function() {
        if(this.durationList.length === 0) {
            this.songs.forEach((song, index) => this.durationList.push('--/--'))
        }
    },

    nextSong: function() {
        this.currentIndex++;
            if(this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let newIndex
    
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex || this.indexArray.includes(newIndex))
        this.indexArray.push(newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        if(this.indexArray.length === this.songs.length) {
            this.indexArray = [];
        }
    },

    // scrollToActiveSong: function() {
    //     setTimeout(function() {
    //         if(app.currentIndex <= 6) {
    //             $('.playlist__list-song.active').scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'end'
    //             })
    //         } else {
    //             $('.playlist__list-song.active').scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'nearest'
    //             })
    //         }
    //     }, 200)
    // },

    start: function() {
        //Setup duration time to render
        this.setUpRender()

        // Assign configuration from config to application
        this.loadConfig();
        
        
        // Define properties for the object
        this.defineProperties();
        
        // Render playlist
        this.render();

        
        // Listening / handling events (DOM events)
        this.handleEvents();
        
        
        
        // Load the first song information into the UI when running the app
        this.loadCurrentSong();
        
    }

}


app.start();
