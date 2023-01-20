

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

if ((window.innerWidth > 1290) || ((window.innerWidth > 600) && (window.innerWidth <= 758))) {
    document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_1.png");
} else if ((window.innerWidth <= 1290) && (window.innerWidth > 1015)) {
    document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_2.png");
} else if (((window.innerWidth <= 1015) && (window.innerWidth > 758)) || (window.innerWidth <= 600)) {
    document.getElementById("about-me-more-image").setAttribute("src", "images/about_me_less.png");
}




// подчеркиваем эл-т меню в хедере, который соответствует открытой секции

let currentBlocks = document.querySelectorAll("section");
let menuItems = document.querySelectorAll(".header-menu-link");
let topScroll = document.getElementsByClassName("top-outside")[0];
window.addEventListener("scroll", () => {
    let current = "";
    currentBlocks.forEach((currentBlock) => {
        let sectionTop = currentBlock.offsetTop;
        // let sectionHeight = currentBlock.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = currentBlock.getAttribute("id");
            if (current !== "artist") {
                topScroll.classList.replace('hide', 'show');
            } else {
                topScroll.classList.replace('show', 'hide');
            }
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

let moreInfo = document.getElementById("about-me-more");
let lessInfo = document.getElementById("about-me-less");
let extraText = document.getElementsByClassName("extra");
let moreImage = document.getElementById("about-me-more-image");
let lessImage = document.getElementById("about-me-less-image");

moreInfo.onclick = function () {
    for (let i = 0; i < extraText.length; i++) {
        extraText[i].style.display = "block";
    }
    moreInfo.style.display = "none";
    lessInfo.style.display = "flex";
    moreImage.style.display = "none";
    lessImage.style.display = "block";
}

lessInfo.onclick = function () {
    for (let m = 0; m < extraText.length; m++) {
        extraText[m].style.display = "none";
    }
    moreInfo.style.display = "block";
    lessInfo.style.display = "none";
    moreImage.style.display = "block";
    lessImage.style.display = "none";
}




// открываем больше картин при нажатии на кнопку в секции paintings

let morePaint = document.getElementById("morePaint");
let galleryMobile = document.querySelectorAll(".gallery-mobile .painting-items .painting-item");

morePaint.onclick = function () {
    for (let n = 0; n < galleryMobile.length; n++) {
        galleryMobile[n].style.display = "block";
    }
    morePaint.style.display = "none";
}




// меню мобилки

let burger = document.getElementById('burger');
let menu = document.getElementById('menu');
let exit = document.getElementById("exit");
let body = document.querySelector("body");

if (window.innerWidth < 769) {
    // перемешаем кнопку внутрь меню
    document.querySelector(".header-menu-list").append(document.getElementById("header-link"));

    burger.onclick = function () {
        menu.classList.add('open');
        burger.style.display = "none";
        exit.style.display = "block";
        body.style.overflow = "hidden";
    }

    exit.onclick = () => {
        menu.classList.remove('open');
        exit.style.display = "none";
        burger.style.display = "block";
        body.style.overflow = "visible";
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            menu.classList.remove('open');
            // мб дублирование в некоторых случаях, но это нужно, чтобы все ок было после нажатия на кнопку:
            exit.style.display = "none";
            burger.style.display = "block";
            body.style.overflow = "visible";
        }
    })
} else if (window.innerWidth >= 769) {
    exit.style.display = "none";
    burger.style.display = "none";
}




// получение данные для размещения в попапе

let currentPaint = "";
let currentElement = "";
let currentElParent = "";
let currentElParentParent = "";
let currentTitle = "";
let currentImageSrc = "";
let currentImage = "";
let currentSize = "";
let k = 0;


document.onclick = function (e) {
    currentElement = e.target;
    currentElParent = currentElement.parentNode;
    currentElParentParent = currentElParent.parentNode;
    if ((currentElement.className === "painting-item") || (currentElParent.className === "painting-item") || (currentElParentParent.className === "painting-item")) {
        if (currentElement.className === "painting-item") {
            currentPaint = currentElement;
        } else if (currentElParent.className === "painting-item") {
            currentPaint = currentElParent;
        } else if (currentElParentParent.className === "painting-item") {
            currentPaint = currentElParentParent;
        }
        for (let s = 0; s < currentPaint.childNodes.length; s++) {
            if (currentPaint.childNodes[s].className === "painting-item-title") {
                currentTitle = currentPaint.childNodes[s].innerHTML;
            } else if (currentPaint.childNodes[s].className === "painting-item-img") {
                currentImage = currentPaint.childNodes[s].childNodes[1];
                currentImageSrc = currentImage.getAttribute("src");
            } else if (currentPaint.childNodes[s].className === "painting-item-info") {
                currentSize = currentPaint.childNodes[s].innerHTML;
            }
        }
        document.getElementsByClassName("popup-title")[0].innerHTML = currentTitle;
        document.getElementsByClassName("popup-size")[0].innerHTML = currentSize;
        document.getElementsByClassName("popup-image")[0].childNodes[1].setAttribute("src", currentImageSrc);
        document.getElementById("popup").style.display = "block";
        body.style.overflow = "hidden";
        if (window.innerWidth <= 600) {
            document.querySelector(".popup-exit img").setAttribute("src", "images/exit-mobile.png");
        // } else if (window.innerWidth > 600) {
        //     if (currentImage.width > currentImage.height) {
        //         popupImage.style.height = "calc(80vh - 80px)";
        //     }
        }
        k = currentImage.width / currentImage.height;
        console.log(k);
        if (k > 0.73) {} else if (k > 1.1) {} else if ((k > 0.9) && (k < 1.1)) {} else if ((k > 0.73) && (k < 0.9)) {}
        document.getElementById("popup-exit").onclick = () => {
            document.getElementById("popup").style.display = "none";
            body.style.overflow = "visible";
        }
    }
}


