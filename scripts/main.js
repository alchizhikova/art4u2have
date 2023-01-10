// перезагрузка страницы после изменения ширины окна, чтобы js код отрабатывал при необходимых изменениях

let oldWidth = window.innerWidth;
window.onresize = function () {
    let newWidth = window.innerWidth;
    if (newWidth !== oldWidth) {
        oldWidth = newWidth;
        location.reload();
    }
};


// меняем фото

if (window.innerWidth > 1290) {
    document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_1.png");
// } else if (window.innerWidth <= 1290 && window.innerWidth > 1015) {
//     document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_2.png");
} else if (window.innerWidth <= 1015) {
    document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_3.png");
}


// подчеркиваем эл-т меню в хедере, который соответствует открытой секции

let currentBlocks = document.querySelectorAll("section");
let menuItems = document.querySelectorAll(".header-menu-link");
window.addEventListener("scroll", () => {
    let current = "";
    currentBlocks.forEach((currentBlock) => {
        let sectionTop = currentBlock.offsetTop;
        // let sectionHeight = currentBlock.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = currentBlock.getAttribute("id");
        }
    });

    menuItems.forEach((menuItem) => {
        menuItem.classList.remove("menu-link-active");
        if (menuItem.classList.contains(current)) {
            menuItem.classList.add("menu-link-active");
        }
    });
});


// открываем больше текста при нажатии на кнопку в секции about-me

let moreButton = document.getElementById("about-me-more");
let lessButton = document.getElementById("about-me-less");
let extraText = document.getElementsByClassName("extra");
let moreImage = document.getElementById("about-me-more-image");
let lessImage = document.getElementById("about-me-less-image");

moreButton.onclick = function () {
    for (let i = 0; i < extraText.length; i++) {
        extraText[i].style.display = "block";
    }
    moreButton.style.display = "none";
    lessButton.style.display = "flex";
    moreImage.style.display = "none";
    lessImage.style.display = "block";
}

lessButton.onclick = function () {
    for (let m = 0; m < extraText.length; m++) {
        extraText[m].style.display = "none";
    }
    moreButton.style.display = "block";
    lessButton.style.display = "none";
    moreImage.style.display = "block";
    lessImage.style.display = "none";
}


// меню мобилки

if (window.innerWidth < 769) {
    // перемешаем кнопку внутрь меню
    document.querySelector(".header-menu-list").append(document.getElementById("header-link"));

    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
        document.getElementById("burger").style.display = "none";
        document.getElementById("exit").style.display = "block";
    }

    document.getElementById("exit").onclick = () => {
        document.getElementById('menu').classList.remove('open');
        document.getElementById("exit").style.display = "none";
        document.getElementById("burger").style.display = "block";
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
            // мб дублирование в некоторых случаях, но это нужно, чтобы все ок было после нажатия на кнопку:
            document.getElementById("exit").style.display = "none";
            document.getElementById("burger").style.display = "block";
        }
    })
} else if (window.innerWidth >= 769) {
    document.getElementById("exit").style.display = "none";
    document.getElementById("burger").style.display = "none";
}

