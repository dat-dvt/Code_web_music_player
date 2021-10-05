var listAlbum = [
    {
        name: "Hospital Playlist Piano Covers",
        image: "../assets/img/albums/album1.jpg"
    },
    {
        name: "Boycold (Mini Album)",
        image: "../assets/img/albums/album2.jpg"
    },
    {
        name: "Love & Letter (Repackage Album)",
        image: "../assets/img/albums/album3.jpg"
    },
    {
        name: "Người Yêu Cũ (Gửi Cho Anh 2) (Mini Album)",
        image: "../assets/img/albums/album4.jpg"
    },
    {
        name: "The Red Summer (Mini Album)",
        image: "../assets/img/albums/album5.jpg"
    },

    {
        name: "Kwon Ji Yong (Mini Album)",
        image: "../assets/img/albums/album6.jpg"
    },
    {
        name: "Khác Biệt (Mini Album)",
        image: "../assets/img/albums/album7.jpg"
    },
    {
        name: "LOTTO - The 3rd Album Repackage",
        image: "../assets/img/albums/album8.jpg"
    },
    {
        name: "OBSESSION - The 6th Album",
        image: "../assets/img/albums/album9.jpg"
    },
    {
        name: "IU [Japanese Album]",
        image: "../assets/img/albums/album10.jpg"
    },
    {
        name: "Follow Me (Album 2.0)",
        image: "../assets/img/albums/album11.jpg"
    },
    {
        name: "Album Khắc Việt Remix 2018",
        image: "../assets/img/albums/album12.png"},
     {
         name: "Highlight (3rd Album)",
        image: "../assets/img/albums/album13.jpg"
    },
    {
        name: "2nd Live Concert Album",
        image: "../assets/img/albums/album14.jpg"
    },
    {
        name: "Day By Day (6th Mini Album)",
        image: "../assets/img/albums/album15.jpg"
    },
    {
        name: "Em (The Mini Album)",
        image: "../assets/img/albums/album16.jpg"
    },{
        name: "Time (Mini Album Vol.7)",
        image: "../assets/img/albums/album17.jpg"
    },
];

const ALBUM_STORAGE_KEY = 'VIK_ALBUM';

localStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(listAlbum));
