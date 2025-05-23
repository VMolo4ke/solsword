const video = document.querySelector('.bg-video');
const video_btn = document.querySelector('.button__start');
const video_dark = document.querySelector('.dark__start');
const first_lvl = document.querySelector('.first__lvl');
const first_boss = document.querySelector('.first__boss');
const first_smith = document.querySelector('.first__smith');
const first_music = document.querySelector('.first__music');
const smith = document.querySelector('.smith');
const back = document.querySelector('.back');
const hrust = document.querySelector('.hrust');
const point = document.querySelector('.points');
const buy1 = document.getElementById('buy1');
const buy2 = document.getElementById('buy2');
const buy3 = document.getElementById('buy3');
const slaw = document.querySelector('.slaw');

function playVideo() {
    video_dark.classList.add('active');
    video.play()
}

video_btn.addEventListener('click', playVideo);

video.addEventListener('ended', function() {
    video.classList.add('ended');
    first_lvl.classList.add('active');
    first_music.play();
});

back.addEventListener('click', function() {
    smith.classList.remove('active');
});

first_smith.addEventListener('click', function() {
    smith.classList.add('active');
});

const userData = {
    damage: 1,
    points: 0
};

// Функции для работы с хранилищем Telegram
async function initUserData() {
    try {
        // Пытаемся получить данные из Cloud Storage
        const storedData = await Telegram.WebApp.CloudStorage.getItem('userData');
        if (storedData) {
        Object.assign(userData, JSON.parse(storedData));
        }
    } catch (e) {
        // Если Cloud Storage недоступен, используем localStorage
        const localData = localStorage.getItem('userData');
        if (localData) {
        Object.assign(userData, JSON.parse(localData));
        }
    }
    updateUI();
}

async function saveUserData() {
    const data = JSON.stringify(userData);
    try {
        await Telegram.WebApp.CloudStorage.setItem('userData', data);
    } catch (e) {
        localStorage.setItem('userData', data);
    }
    updateUI();
}

function updateUI() {
    
  // Другие обновления интерфейса...
}

// Инициализация данных при загрузке
initUserData();

// Модифицируем обработчик клика
first_lvl.addEventListener('click', function() {
    userData.points += userData.damage;
    point.innerHTML = userData.points;
    saveUserData();
    
    hrust.play();
    slaw.classList.add('active');
    first_boss.classList.add('active');
    setTimeout(() => first_boss.classList.remove('active'), 100);
    setTimeout(() => slaw.classList.remove('active'), 400);
});

// Модифицируем обработчик покупки
buy1.addEventListener('click', function() {
    if (userData.points >= 10) {
        userData.damage = 2;
        userData.points -= 10;
        saveUserData();
        return;
    }
    alert('Не хватка бабла');
});
