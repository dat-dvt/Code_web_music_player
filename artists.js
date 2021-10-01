var listArtist = [
    {
        name: "Binz",
        folowers: "265K",
        image: "./assets/img/artists/artist1.jpg"
    },
    {
        name: "Phương Ly",
        folowers: "77K",
        image: "./assets/img/artists/artist2.jpg"
    },
    {
        name: "AMEE",
        folowers: "317K",
        image: "./assets/img/artists/artist3.jpg"
    },
    {
        name: "MCK",
        folowers: "52K",
        image: "./assets/img/artists/artist4.jpg"
    },
    {
        name: "Sơn Tùng M-TP",
        folowers: "2.1M",
        image: "./assets/img/artists/artist5.jpg"
    },

    {
        name: "Mr. Siro",
        folowers: "735K",
        image: "./assets/img/artists/artist6.jpg"
    },
    {
        name: "Han Sara",
        folowers: "158K",
        image: "./assets/img/artists/artist7.jpg"
    },
    {
        name: "Bích Phương",
        folowers: "368K",
        image: "./assets/img/artists/artist8.jpg"
    },
    {
        name: "Soobin",
        folowers: "435K",
        image: "./assets/img/artists/artist9.jpg"
    },
    {
        name: "Chi Dân",
        folowers: "516K",
        image: "./assets/img/artists/artist10.jpg"
    },
];

const ARTIST_STORAGE_KEY = 'VIK_ARTIST';

localStorage.setItem(ARTIST_STORAGE_KEY, JSON.stringify(listArtist));
