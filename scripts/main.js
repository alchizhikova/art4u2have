

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




// получение данные для размещения в попапе

let currentPaint = "";
let currentElement = "";
let currentElParent = "";
let currentElParentParent = "";
let currentTitle = "";
let currentImage = "";
let currentSize = "";
let currentPrice = "";
let currentSold = 0;


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
                currentImage = currentPaint.childNodes[s].childNodes[1].getAttribute("src");
            } else if (currentPaint.childNodes[s].className === "painting-item-info") {
                currentSize = currentPaint.childNodes[s].innerHTML;
            } else if (currentPaint.childNodes[s].className === "painting-item-price") {
                currentPrice = currentPaint.childNodes[s].innerHTML;
            } else if (currentPaint.childNodes[s].className === "painting-item-sold") {
                currentSold = 1;
            }
        }
        console.log(currentSold);
        document.getElementsByClassName("popup-title")[0].innerHTML = currentTitle;
        document.getElementsByClassName("popup-size")[0].innerHTML = currentSize;
        document.getElementsByClassName("popup-price")[0].innerHTML = currentPrice;
        document.getElementsByClassName("popup-image")[0].childNodes[1].setAttribute("src", currentImage);
        document.getElementById("popup").style.display = "block";
        // if (currentSold !== 0) {
        //     document.getElementsByClassName("popup-sold")[0].style.display = "block";
        // }
        if (window.innerWidth <= 600) {
            document.querySelector(".popup-exit img").setAttribute("src", "images/exit-mobile.png");
        }
        document.getElementById("popup-exit").onclick = () => {
            document.getElementById("popup").style.display = "none";
            // document.getElementsByClassName("popup-sold")[0].style.display = "none";
        }
    }
}