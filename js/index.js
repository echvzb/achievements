import data from './data.js';

const navBar = document.querySelector('nav');
const btnControllers = document.querySelectorAll('.btn');
const fadeTextClass = 'fade-text-';
const changeElem = [
    [document.querySelector('.img-container'), 'enter-img-container'],
    [document.querySelector('img'), 'enter-img'],
    [document.querySelector('.info'), 'enter-info'],
    [document.querySelector('.title'), fadeTextClass + 'title'],
    [document.querySelector('.description'), fadeTextClass + 'description'],
    [document.querySelector('.date'), fadeTextClass + 'date']
];

let currentIndex = 'p0';

function toggleClassNames(arr) {
    arr.forEach(subArr => {
        subArr[0].classList.toggle(subArr[1]);
    })
}
function callClassNames(arrowBtn) {
    let tempArr = arrowBtn ? [...changeElem, arrowBtn] : changeElem;
    toggleClassNames(tempArr);

    setTimeout(() => {
        toggleClassNames(tempArr);
    }, 800);
}
function setData(obj, indexes, arrowBtn) {
    indexes.forEach(p => {
        if (p == null) {
            return;
        };
        document.querySelector('#' + p).classList.toggle('active');
    });
    for (let key in obj) {
        document.querySelector('.' + key).innerText = obj[key];
    }
    document.querySelector('img').setAttribute('src', `img/${indexes[0].slice(1,indexes[0].length)}.jpg`);
    callClassNames(arrowBtn);
}

for (let i = 0; i < data.length; i++) {
    let navPoint = document.createElement('button');
    navPoint.classList.add('nav-point');
    navPoint.setAttribute('id', 'p' + i);

    navPoint.addEventListener('click', e => {
        let idPointStr = e.target.getAttribute('id');
        setData(data[+idPointStr.slice(1,idPointStr.length)], [idPointStr, currentIndex]);
        currentIndex = idPointStr;
    })

    navBar.appendChild(navPoint);
}

setData(data[0], [currentIndex, null]);

function clickBtnAnim(btn) {

    let arrow = btn.getAttribute('id');
    let tempN = arrow == 'back' ? -1 : 1;
    let tempI = +currentIndex.slice(1,currentIndex.length) + tempN; 

    if(tempI < 0 || tempI >= data.length) return;

    setData(data[tempI], ['p'+tempI,currentIndex], [btn, 'clicked']);

    currentIndex = 'p'+tempI;
    setTimeout(() => {
        btn.setAttribute('disable', 'false');
    }, 800);
}
function clickButtonArrow (e){
    clickBtnAnim(this);
}

btnControllers.forEach(btn => {
    btn.addEventListener('click', clickButtonArrow);
})

document.addEventListener('keydown', ({code}) => {
    if(code == 'KeyA' || code  == 'ArrowLeft'){
        clickBtnAnim(document.querySelector('#back'));
    }
    else if(code == 'KeyD' || code == 'ArrowRight'){
        clickBtnAnim(document.querySelector('#front'));
    }
});