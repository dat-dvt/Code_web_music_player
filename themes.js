const Themes = [
    [
        './assets/img/themeBgs/listTheme1/theme1.jpg',
        
        './assets/img/themeBgs/listTheme1/theme2.jpg',
        
        './assets/img/themeBgs/listTheme1/theme3.jpg',
        
        './assets/img/themeBgs/listTheme1/theme4.jpg',
        
        './assets/img/themeBgs/listTheme1/theme5.jpg',
        
        './assets/img/themeBgs/listTheme1/theme6.jpg',
    ],
    [
        './assets/img/themeBgs/listTheme2/theme1.svg',
        
        './assets/img/themeBgs/listTheme2/theme2.jpg',
    ],
    
    
    
    // ["#170f23", "#231b2e", "#170f23", "#7200a1", "#432275", "#c662ef"],
    // ["#101f3f", "#101f3f", "#101f3f", "#3460f5", "#274a78", "#6e8ffb"],
]


const THEME_STORAGE_KEY = 'VIK_THEME';

localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(Themes))