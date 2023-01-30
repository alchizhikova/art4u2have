

// перезагрузка страницы после изменения ширины окна, чтобы js код отрабатывал при необходимых изменениях

let oldWidth = window.innerWidth;
window.onresize = function () {
    let newWidth = window.innerWidth;
    if (newWidth !== oldWidth) {
        oldWidth = newWidth;
        location.reload();
    }
};




// подчеркиваем эл-т меню в хедере, который соответствует открытой секции

let currentBlocks = document.querySelectorAll("section"),
    menuItems = document.querySelectorAll(".header-menu-link"),
    topScroll = document.getElementsByClassName("top-outside")[0];

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

let moreInfo = document.getElementById("about-me-more"),
    lessInfo = document.getElementById("about-me-less"),
    extraText = document.getElementsByClassName("extra"),
    moreImage = document.getElementById("about-me-more-image"),
    lessImage = document.getElementById("about-me-less-image");

moreInfo.onclick = function () {
    for (let i = 0; i < extraText.length; i++) {
        extraText[i].style.display = "block";
    }
    moreInfo.style.display = "none";
    lessInfo.style.display = "flex";
    if (window.innerWidth >= 1016) {
        moreImage.style.display = "none";
        lessImage.style.display = "block";
    }
}

lessInfo.onclick = function () {
    for (let m = 0; m < extraText.length; m++) {
        extraText[m].style.display = "none";
    }
    moreInfo.style.display = "block";
    lessInfo.style.display = "none";
    if (window.innerWidth >= 1016) {
        moreImage.style.display = "block";
        lessImage.style.display = "none";
    }
}




// меняем фото

if (window.innerWidth > 1290) {
    moreImage.setAttribute("src", "images/about_me_1.png");
    lessImage.setAttribute("src", "images/about_me_less.png");
} else if ((window.innerWidth > 1015) && (window.innerWidth <= 1290)) {
    moreImage.setAttribute("src", "images/about_me_2.png");
    lessImage.setAttribute("src", "images/about_me_less.png");
} else if ((window.innerWidth > 758) && (window.innerWidth <= 1015)) {
    moreImage.setAttribute("src", "images/about_me_less.png");
    lessImage.setAttribute("src", "images/about_me_less.png");
} else if ((window.innerWidth > 600) && (window.innerWidth <= 758)) {
    moreImage.setAttribute("src", "images/about_me_1.png");
    lessImage.setAttribute("src", "images/about_me_1.png");
} else if (window.innerWidth <= 600) {
    moreImage.setAttribute("src", "images/about_me_less.png");
    lessImage.setAttribute("src", "images/about_me_less.png");
}




// открываем больше картин при нажатии на кнопку в секции paintings

let morePaint = document.getElementById("morePaint"),
    galleryMobile = document.querySelectorAll(".gallery-mobile .painting-items .painting-item");

morePaint.onclick = function () {
    for (let n = 0; n < galleryMobile.length; n++) {
        galleryMobile[n].style.display = "block";
    }
    morePaint.style.display = "none";
}




// меню мобилки

let burger = document.getElementById('burger'),
    menu = document.getElementById('menu'),
    exit = document.getElementById("exit"),
    body = document.querySelector("body");

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

let currentPaint = "",
    popup = document.getElementById("popup"),
    currentElement = "",
    currentElParent = "",
    currentElParentParent = "",
    currentTitle = "",
    popupTitle = document.getElementsByClassName("popup-title")[0],
    currentImageSrc = "",
    currentImage = "",
    popupImage = document.getElementsByClassName("popup-image")[0],
    currentSize = "",
    popupSize = document.getElementsByClassName("popup-size")[0],
    k = 0;


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
        popupTitle.innerHTML = currentTitle;
        popupSize.innerHTML = currentSize;
        popupImage.childNodes[1].setAttribute("src", currentImageSrc);
        popup.style.display = "flex";
        body.style.overflow = "hidden";

        // вычисляем размер изображения в попапе
        k = currentImage.width / currentImage.height;
        if (window.innerWidth > 1290) {
            if (k > 1.1) {
                popupImage.style.width = '786px';
            } else if ((k > 0.9) && (k < 1.1)) {
                popupImage.style.width = '590px';
            } else if ((k < 0.9)) {
                popupImage.style.width = '492px';
            }
        } else if ((window.innerWidth <= 1290) && (window.innerWidth > 1025)) {
            if (k > 1.1) {
                popupImage.style.width = '663px';
            } else if ((k > 0.9) && (k < 1.1)) {
                popupImage.style.width = '497px';
            } else if ((k < 0.9)) {
                popupImage.style.width = '414px';
            }
        } else if ((window.innerWidth <= 1025) && (window.innerWidth > 1015)) {
            if (k > 1.1) {
                popupImage.style.width = '636px';
            } else if ((k > 0.9) && (k < 1.1)) {
                popupImage.style.width = '477px';
            } else if ((k < 0.9)) {
                popupImage.style.width = '398px';
            }
        } else if ((window.innerWidth <= 1015) && (window.innerWidth > 758)) {
            if (k > 1.1) {
                popupImage.style.width = '505px';
            } else if ((k > 0.9) && (k < 1.1)) {
                popupImage.style.width = '379px';
            } else if ((k < 0.9)) {
                popupImage.style.width = '315px';
            }
        } else if ((window.innerWidth <= 758) && (window.innerWidth > 600)) {
            popupImage.style.width = '300px';
        } else if (window.innerWidth <= 600) {
            document.querySelector(".popup-exit img").setAttribute("src", "images/exit-mobile.png");
        }


        document.getElementById("popup-exit").onclick = () => {
            popup.style.display = "none";
            body.style.overflow = "visible";
        }
    }
}


