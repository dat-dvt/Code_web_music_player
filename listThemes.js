const listThemes = [
    {
        type: 'Nghệ Sĩ',
        themes: [
            {
                name: 'Rosé',
                image: './assets/img/modalThemes/modalTheme1/theme1.jpg'
            },
            {
                name: 'IU',
                image: './assets/img/modalThemes/modalTheme1/theme2.jpg'
            },
            {
                name: 'Ji Chang Wook',
                image: './assets/img/modalThemes/modalTheme1/theme3.jpg'
            },
            {
                name: 'Lisa',
                image: './assets/img/modalThemes/modalTheme1/theme4.jpg'
            },
            {
                name: 'Jennie Kim',
                image: './assets/img/modalThemes/modalTheme1/theme5.jpg'
            },
            {
                name: 'Jisoo',
                image: './assets/img/modalThemes/modalTheme1/theme6.jpg'
            },
        ]
    },
    {
        type: 'Chủ đề',
        themes: [
            {
                name: 'Zing Music Awards',
                image: './assets/img/modalThemes/modalTheme2/theme1.jpg'
            },
            {
                name: 'Tháp Eiffel',
                image: './assets/img/modalThemes/modalTheme2/theme2.jpg'
            },
        ]
    },
    
    
    // ["#170f23", "#231b2e", "#170f23", "#7200a1", "#432275", "#c662ef"],
    // ["#101f3f", "#101f3f", "#101f3f", "#3460f5", "#274a78", "#6e8ffb"],
]


const THEME_LIST_STORAGE_KEY = 'VIK_THEME_LIST';

localStorage.setItem(THEME_LIST_STORAGE_KEY, JSON.stringify(listThemes))