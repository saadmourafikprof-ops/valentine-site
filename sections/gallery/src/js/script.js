// Folders and images (replace with your actual paths)
const folders = [
    {
        name: "Miss Universe",
        images: [
            "/Miss Universe/1.jpg",
            "/Miss Universe/2.jpg",
            "/Miss Universe/3.jpg",
            "/Miss Universe/4.jpg",
            "/Miss Universe/5.jpg",
            "/Miss Universe/6.jpg",
            "/Miss Universe/7.jpg",
            "/Miss Universe/8.jpg",
            "/Miss Universe/9.jpg",
            "/Miss Universe/10.jpg",
            "/Miss Universe/11.jpg",
            "/Miss Universe/12.jpg",
            "/Miss Universe/13.jpg",
            "/Miss Universe/14.jpg"
        ]
    },
    {
        name: "Two Little Buddies",
        images: [
            "/Two Little Buddies/1.jpg",
            "/Two Little Buddies/2.jpg",
            "/Two Little Buddies/3.jpg",
            "/Two Little Buddies/4.jpg",
            "/Two Little Buddies/5.jpg",
            "/Two Little Buddies/6.jpg",
            "/Two Little Buddies/7.jpg",
            "/Two Little Buddies/8.jpg",
            "/Two Little Buddies/9.jpg",
            "/Two Little Buddies/10.jpg",
            "/Two Little Buddies/11.jpg",
            "/Two Little Buddies/12.jpg",
            "/Two Little Buddies/13.jpg",
            "/Two Little Buddies/14.jpg",
            "/Two Little Buddies/15.jpg",
            "/Two Little Buddies/16.jpg",
            "/Two Little Buddies/17.jpg",
            "/Two Little Buddies/18.jpg",
            "/Two Little Buddies/19.jpg",
            "/Two Little Buddies/20.jpg",
            "/Two Little Buddies/21.jpg",
            "/Two Little Buddies/22.jpg",
            "/Two Little Buddies/23.jpg",
            "/Two Little Buddies/24.jpg",
            "/Two Little Buddies/25.jpg"
        ]
    },
    {
        name: "Little Sunshine",
        images: [
            "/Little Sunshine/1.jpg",
            "/Little Sunshine/2.jpg",
            "/Little Sunshine/3.jpg",
            "/Little Sunshine/4.jpg",
            "/Little Sunshine/5.jpg",
            "/Little Sunshine/6.jpg",
            "/Little Sunshine/7.jpg",
            "/Little Sunshine/8.jpg",
            "/Little Sunshine/9.jpg",
            "/Little Sunshine/10.jpg",
            "/Little Sunshine/11.jpg",
            "/Little Sunshine/12.jpg",
            "/Little Sunshine/13.jpg",
            "/Little Sunshine/14.jpg"
        ]
    }
];


let currentFolder = 0;
let currentImg = 0;
const interval = 4000;

const slider = document.querySelector('.slider');
const navButtonsContainer = document.getElementById('navButtons');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
// const folderLabel = document.getElementById('folderLabel');
const folderButtonsContainer = document.getElementById('folderButtons');


let imgs = []; // will hold current folder images
let timer;

// Load folder images dynamically
function loadFolder() {
    slider.innerHTML = "";
    navButtonsContainer.innerHTML = "";
    folderButtonsContainer.innerHTML = ""; // NEW
    //folderLabel.textContent = folders[currentFolder].name;

    // Create folder buttons (CLICKABLE)
    folders.forEach((folder, index) => {
        const btn = document.createElement('button');
        btn.textContent = folder.name;
        btn.classList.add('folder-btn');

        if (index === currentFolder) {
            btn.classList.add('active-folder');
        }

        btn.addEventListener('click', () => {
            currentFolder = index;
            currentImg = 0;
            loadFolder();
            resetTimer();
        });

        folderButtonsContainer.appendChild(btn);
    });

    // Load images of current folder
    imgs = folders[currentFolder].images.map((src, index) => {
        const img = document.createElement('img');
        img.src = src;

        img.onerror = () => {
            console.error("Image not found:", src);
        };

        if (index === currentImg) img.classList.add('active');
        slider.appendChild(img);

        // Create nav dot
        const dot = document.createElement('span');
        dot.classList.add('line');
        dot.addEventListener('click', () => changeSlide(index));
        navButtonsContainer.appendChild(dot);

        return img;
    });

    if (navButtonsContainer.children[currentImg]) {
        navButtonsContainer.children[currentImg].classList.add('active');
    }
}


// Change slide within folder
function changeSlide(n) {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove('active', 'previous');
        navButtonsContainer.children[i].classList.remove('active');
    }

    let previousImg = currentImg;
    currentImg = (n + imgs.length) % imgs.length;

    imgs[currentImg].classList.add('active');
    imgs[previousImg].classList.add('previous');
    navButtonsContainer.children[currentImg].classList.add('active');
}

// Automatic slideshow
function startTimer() {
    timer = setInterval(() => {
        changeSlide(currentImg + 1);
    }, interval);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// Prev/Next buttons
prevButton.addEventListener('click', () => { changeSlide(currentImg - 1); resetTimer(); });
nextButton.addEventListener('click', () => { changeSlide(currentImg + 1); resetTimer(); });

// Arrow keys: Left/Right = images, Up/Down = folders
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        changeSlide(currentImg - 1);
        resetTimer();
    } else if (e.key === "ArrowRight") {
        changeSlide(currentImg + 1);
        resetTimer();
    } else if (e.key === "ArrowUp") {
        currentFolder = (currentFolder - 1 + folders.length) % folders.length;
        currentImg = 0;
        loadFolder();
        resetTimer();
    } else if (e.key === "ArrowDown") {
        currentFolder = (currentFolder + 1) % folders.length;
        currentImg = 0;
        loadFolder();
        resetTimer();
    }
});

// Initial load
loadFolder();
startTimer();
