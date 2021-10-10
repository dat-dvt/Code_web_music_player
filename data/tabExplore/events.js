var listEvent = [
    {
        name: "Sinh Nhật Sao x B Ray",
        time: "00:00 Thứ Hai, 11 tháng 10",
        fans: [
            "./assets/img/tabExplore/events/fans/fan1.jpg",
            "./assets/img/tabExplore/events/fans/fan2.jpg",
            "./assets/img/tabExplore/events/fans/fan3.jpg",
            "./assets/img/tabExplore/events/fans/fan4.jpg",
            "./assets/img/tabExplore/events/fans/fan5.jpg",
        ],
        fanAmount: "1K",
        image: "./assets/img/tabExplore/events/event1.jpg"
    },
];

const EVENT_STORAGE_KEY = 'VIK_EVENT';

localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(listEvent));
