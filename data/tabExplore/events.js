var listEvent = [
    {
        name: "Sinh Nhật Sao x B Ray",
        time: "00:00 Thứ Hai, 11 tháng 10",
        fans: [
            "./assets/img/tabExplore/events/fans/singer1/fan1.jpg",
            "./assets/img/tabExplore/events/fans/singer1/fan2.jpg",
            "./assets/img/tabExplore/events/fans/singer1/fan3.jpg",
            "./assets/img/tabExplore/events/fans/singer1/fan4.jpg",
            "./assets/img/tabExplore/events/fans/singer1/fan5.jpg",
        ],
        fanAmount: "1K",
        image: "./assets/img/tabExplore/events/event1.jpg",
        action: "Mở RADIO"
    },
    {
        name: "Sinh Nhật Sao x ERIK",
        time: "00:00 Thứ Tư, 13 tháng 10",
        fans: [
            "./assets/img/tabExplore/events/fans/singer2/fan1.jpg",
            "./assets/img/tabExplore/events/fans/singer2/fan2.jpg",
            "./assets/img/tabExplore/events/fans/singer2/fan3.jpg",
        ],
        fanAmount: "330",
        image: "./assets/img/tabExplore/events/event2.jpg",
        action: "Chúc Mừng"
    },
];

const EVENT_STORAGE_KEY = 'VIK_EVENT';

localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(listEvent));
