// 아코디언 관련 변수
let accordionBtn = document.querySelectorAll('.gnb__title');
let allTexts = document.querySelectorAll('.menu__2depth');
let arrowBtn = document.querySelectorAll('.arrowBtn');

// 프로그레스 바 관련 변수
let mainSlide = document.querySelectorAll('.slide__content');
let slideBtn = document.querySelectorAll('.progress__btn');


//  아코디언 메뉴(네비게이션) 이벤트 등록
accordionBtn.forEach(function (el) {
    el.addEventListener('click', toggleAccordion)
});

function toggleAccordion(el) {
    var targetText = el.currentTarget.nextElementSibling.classList;
    var targetIcon = el.currentTarget.children[1];
    var target = el.currentTarget;

    if(targetText.contains('show')) {
        targetText.remove('show');
        target.classList.remove('line__active');
        target.classList.remove('active');
        targetIcon.classList.remove('down');
        target.nextElementSibling.style.borderTop = `none`;
    }
    else {
        accordionBtn.forEach(function (el) {
            el.classList.remove('line__active');
            el.classList.remove('active');
            allTexts.forEach(function (el) {
                el.classList.remove('show');
            })
            arrowBtn.forEach(function (el) {
                el.classList.remove('down');
            })
        })
        targetText.add('show');
        target.classList.add('line__active');
        target.classList.add('active');
        targetIcon.classList.add('down');
    }
};

// 프로그레스 바 이미지 슬라이드 이벤트
let i = 0;
let slideIndex = 0;
let currentBtn = slideBtn[slideIndex];
let currentMainSlide = mainSlide[slideIndex];

let progressInterval = setInterval(progress, 70);
function progress() {
    if ( i === 100 ) {
        i = -5;
        //프로그레스 바 리셋
        currentBtn.querySelector('.progress-bar__fill').style.width = 0;
        currentBtn.classList.remove('btn--active');

        slideIndex++;

        currentMainSlide.classList.add('slide--active-X');
        currentMainSlide.classList.remove('slide--active');

        // 다 돌면 slideIndex 리셋 시키기
        if (slideIndex === slideBtn.length) {
            slideIndex = 0;
        }

        currentBtn = slideBtn[slideIndex];
        currentMainSlide = mainSlide[slideIndex];
    } else {
        i++;
        // 차징 부분
        // 템플릿 문자열(`${}`) 사용. 왜냐하면 동적으로 움직여야 차오르는 걸 보여줄 수 있기에.
        // % 는 나머지 연산자. 
        currentBtn.querySelector('.progress-bar__fill').style.width = `${i}%`;
        // 버튼 활성화 스타일 넘기기
        currentBtn.classList.add('btn--active');
        currentMainSlide.classList.add('slide--active');
        currentMainSlide.classList.remove("slide--active-X");
    }
}

// 섹션2 - 닌텐도 설명 슬라이드
// 닌텐도 설명 슬라이드 관련 변수
let curPos = 0;
let postion = 0;
const IMAGE_WIDTH = 1000;
const nextBtn = document.querySelector('.slide__btn--next');
const prevBtn = document.querySelector('.slide__btn--prev');
const images = document.querySelector(".slide__list");
const startNum = 0; // initial slide index (0 ~ 4)
const pagination = document.querySelector('.slide_pagination');
const slideNumber = document.querySelector('.slide__number--bold');

// // 숫자 번호 넣기
// let number = slideNumber.innerText;
// //  숫자 앞에 0 추가하기
// function pad(n, width) {
//     n = n + '';
//     return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
//   }

function prev(){
  if(curPos > 0){
    nextBtn.removeAttribute("disabled")
    console.log(document.querySelector(".slide__box").offsetWidth)
    // postion += IMAGE_WIDTH;
    postion += document.querySelector(".slide__box").offsetWidth;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
    slideNumber.innerHTML = '02';
  }
  if(curPos == 0){
    prevBtn.setAttribute('disabled', 'true')
    slideNumber.innerHTML = '01';
  }
}
function next(){
  if(curPos < 1){
    prevBtn.removeAttribute("disabled")
    console.log(document.querySelector(".slide__box").offsetWidth)
    // postion += IMAGE_WIDTH;
    postion -= document.querySelector(".slide__box").offsetWidth;
    images.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
    slideNumber.innerHTML = '01';
  }
  if(curPos == 1){
    nextBtn.setAttribute('disabled', 'true')
    slideNumber.innerHTML = '02';
  }
}

let start_x, end_x;

function touch_start(event) {
  start_x = event.touches[0].pageX
}

function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
    slideNumber.innerHTML = '02';
  }else{
    prev();
    slideNumber.innerHTML = '01';
  }
}
 
function init(){
  prevBtn.setAttribute('disabled', 'true')
  prevBtn.addEventListener("click", prev)
  nextBtn.addEventListener("click", next)
  
  images.addEventListener('touchstart', touch_start);
  images.addEventListener('touchend', touch_end);
}
 
init();
// const slideList = document.querySelector('.slide__list');
// const slideContents = document.querySelectorAll('.slide__section');
// const slideBtnNext = document.querySelector('.slide__btn--next');
// const slideBtnPrev = document.querySelector('.slide__btn--prev');
// const slideLength = slideContents.length;
// const slideWidth = document.querySelector(".slide__section").offsetWidth;
// const slideSpeed = 300; // slide speed
// const startNum = 0; // initial slide index (0 ~ 4)
// const pagination = document.querySelector('.slide_pagination');
// const slideNumber = document.querySelector('.slide__number--bold');



// // 첫번째와 마지막 슬라이드 복제
// let firstChild = slideList.firstElementChild;
// let lastChild = slideList.lastElementChild;
// let clonedFirst = firstChild.cloneNode(true);
// let clonedLast = lastChild.cloneNode(true);

// // 복제한 슬라이드 추가
// slideList.appendChild(clonedFirst);
// slideList.insertBefore(clonedLast, slideList.firstElementChild);

// slideList.style.transform =
//     'translate3d(-' + slideWidth * (startNum + 1) + 'px, 0px, 0px)';

// let curIndex = startNum; // current slide index (except copied slide)
// let curSlide = slideContents[curIndex]; // current slide dom
// curSlide.classList.add('slide_active');

// // 숫자 번호 넣기
// let number = slideNumber.innerText;
// //  숫자 앞에 0 추가하기
// function pad(n, width) {
//     n = n + '';
//     return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
//   }
// /** Next Button Event */
// slideBtnNext.addEventListener('click', () => {
//     // curIndex = 현재 인덱스 / cur = 현재 값
//     if (curIndex <= slideLength - 1) {
//         slideList.style.transition = slideSpeed + 'ms';
//         slideList.style.transform =
//           'translate3d(-' + slideWidth * (curIndex + 2) + 'px, 0px, 0px)';
//           number = pad(curIndex + 2,2);
//       }
//       if (curIndex === slideLength - 1) {
//         setTimeout(function () {
//           slideList.style.transition = '0ms';
//           slideList.style.transform =
//             'translate3d(-' + slideWidth + 'px, 0px, 0px)';
//         }, slideSpeed);
//         curIndex = -1;
//         number = pad(curIndex + 2,2);
//       }
//       curSlide.classList.remove('slide_active');
//       curSlide = slideContents[++curIndex];
//       curSlide.classList.add('slide_active');
//       slideNumber.innerText = number;
//       console.log(slideWidth);
// });
//  /** Prev Button Event */
// slideBtnPrev.addEventListener('click', () => {
//     // curIndex = 현재 인덱스 / cur = 현재 값
//     if (curIndex >= 0) {
//         slideList.style.transition = slideSpeed + 'ms';
//         slideList.style.transform =
//         'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)';
//         number = pad(curIndex,2);
//     }
//     if (curIndex === 0) {
//         setTimeout(function () {
//           slideList.style.transition = '0ms';
//           slideList.style.transform =
//             'translate3d(-' + slideWidth * slideLength + 'px, 0px, 0px)';
//         }, slideSpeed);
//         curIndex = slideLength;
//         number = pad(curIndex,2);
//     }
//     curSlide.classList.remove('slide_active');
//     curSlide = slideContents[--curIndex];
//     curSlide.classList.add('slide_active');
//     slideNumber.innerText = number;
// });
// 섹션3 - 주요 소프트웨어

const bgImg = document.querySelector('#img__background');
const boxBtn = document.querySelectorAll('.software__box');
const boxes = document.querySelector('.software__boxes');

boxBtn.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        const dataId = el.getAttribute("data-id");
        const bg = bgImg.querySelector(`.id-${dataId}`);

        bgImg.querySelectorAll('img').forEach((img) => {
            img.style.display = "none";
            img.style.animation = "";
        });
        el.style.backgroundColor = "#ed1c24";
        bg.style.display = "block";
        bg.style.animation = "transition 1s ease forwards";
    });
    el.addEventListener("mouseout", () => {
        el.style.backgroundColor = "";
    });
});