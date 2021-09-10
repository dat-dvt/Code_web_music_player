const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);


        const player = $('.player');
        const playList = $('.playlist');
        const cd = $('.cd');
        const cdThumb = $('.cd-thumb');
        const heading = $('header h2');
        const audio = $('#audio');
        const playBtn = $('.btn-toggle-play')
        const progress = $('#progress');

        const app = {

            currentIndex: 10,
            isPlaying: false,



            songs: [
                {
                name: "Nevada",
                singer: "Vicetone",
                path: "./assets/music/song1.mp3",
                image: "https://i1.sndcdn.com/artworks-000174788935-d1hrl9-t500x500.jpg"
                },
                {
                name: "SummerTime",
                singer: "K-391",
                path: "./assets/music/song2.mp3",
                image:
                    "https://i1.sndcdn.com/artworks-000198712766-0jvlju-t500x500.jpg"
                },
                {
                name: "Reality",
                singer: "Lost Frequencies ft. Janieck Devy",
                path:
                    "./assets/music/song3.mp3",
                image: "https://cdn.promodj.com/afs/5e10e1420585780ebed656f20dd1d80f11:resize:640x480:fill:ffffff:51aed2"
                },
                {
                name: "Attention",
                singer: "Charlie Puth",
                path:
                    "./assets/music/song4.mp3",
                image: "https://i.ytimg.com/vi/Oz5JDtkf1as/maxresdefault.jpg"
                },
                {
                name: "Monster",
                singer: "Katie Sky",
                path:
                    "./assets/music/song5.mp3",
                image: "https://i.ytimg.com/vi/FmQutmPBfq0/maxresdefault.jpg"
                },
                
                {
                name: "Faded",
                singer: "Alan Walker",
                path:
                    "./assets/music/song6.mp3",
                image: "https://i.ytimg.com/vi/qdpXxGPqW-Y/maxresdefault.jpg"
                },
                {
                name: "Save Me",
                singer: "DEAMN",
                path:
                    "./assets/music/song7.mp3",
                image: "https://i.vdoc.vn/data/image/2017/12/08/loi-bai-hat-save-me-deamn-600-size-640x335-znd.jpg"
                },
                {
                name: "Havana",
                singer: "Camila Cabello ft. Young Thug",
                path:
                    "./assets/music/song8.mp3",
                image: "https://i1.sndcdn.com/artworks-000299546733-z6ati1-t500x500.jpg"
                },
                {
                name: "The River",
                singer: "Axel Johansson",
                path:
                    "./assets/music/song9.mp3",
                image: "https://i.pinimg.com/564x/78/07/58/7807588b3a2e1ec91046d7af15e127c4.jpg"
                },
                {
                name: "Rendezvous",
                singer: "Deamn",
                path:
                    "./assets/music/song10.mp3",
                image: "https://i.ytimg.com/vi/WcP6uxqDQHY/mqdefault.jpg"
                },
                {
                name: "Way Back",
                singer: "Vicetone ft. Cozi Zuehlsdorff",
                path:
                    "./assets/music/song11.mp3",
                image: "https://i1.sndcdn.com/artworks-000313122243-4hxho9-t500x500.jpg"
                },
            ],
            
            render : function() {
                const htmls = this.songs.map(function(song,index){
                    return `
                    <div class="song">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `;
                })
                
                playList.innerHTML = htmls.join('');

            },

            defineProperties: function() {
                Object.defineProperty(this, 'currentSong', {
                    get: function() {
                        return this.songs[this.currentIndex];
                    }
                })
            },

            loadCurrentSong: function() {
                heading.textContent = this.currentSong.name;
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
                audio.src = `${this.currentSong.path}`;
            },

            handleEvents: function() {
                const _this = this;
                //Handle scroll top
                document.onscroll = function() {
                    const cdWidth = 200;
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    newCdWidth = cdWidth - scrollTop;
                    Object.assign(cd.style,  {
                            width: newCdWidth > 0 ? newCdWidth + 'px' : 0,
                            opacity: newCdWidth / cdWidth
                        });
                }


                //Handle Play/Pause song
                playBtn.onclick = function() {
                    if(_this.isPlaying) {
                        audio.pause();
                    } else {
                        audio.play();
                    }
                }

                //When song is played
                audio.onplay = function() {
                    _this.isPlaying = true;
                    player.classList.add('playing');
                    cdThumbAnimate.play();
                }

                //When song is paused
                audio.onpause = function() {
                    _this.isPlaying = false;
                    player.classList.remove('playing');
                    cdThumbAnimate.pause();
                }


                //Khi tiến độ bài hát thay đổi
                audio.ontimeupdate = function() {
                    if(audio.duration){
                        progress.value = Math.floor(audio.currentTime / audio.duration * 100);
                    }
                    
                    //Xử lí khi tua
                    progress.onchange = function(e) {
                        const seekTime = e.target.value * audio.duration / 100;
                        audio.currentTime = seekTime;
                    }
                }


                //Xử lí CD quay/dừng
                const cdThumbAnimate = cdThumb.animate([
                    { transform: 'rotate(360deg)'}
                ], {
                    duration: 10000, //10000 seconds
                    iterations: Infinity
                })
                cdThumbAnimate.pause()
            },

            start: function() {

                //Define properties for the object
                this.defineProperties();
                //Xử lí event
                this.handleEvents();


                //Render songs
                this.render();

                //Load songs
                this.loadCurrentSong();
                

            }

        }


        app.start();