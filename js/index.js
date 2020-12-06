import data from './data.js';
import introHero from './introHero.js';

introHero();

const navBar = document.querySelector('nav');
const btnControllers = [document.querySelector('#back'), document.querySelector('#front')];
const changeElem = document.querySelectorAll('.changeElem');
const photoElem = document.querySelector('img');

let currentIndex = 'p0';
let started = true;

function removeClassName(elem, className){
    elem.classList.remove(className);
}
function addClassName(elem, className){
    elem.classList.add(className);
}

function toggleClassName(elem, customClassName, remove) {
    let className = customClassName || elem.dataset.cssanim;

    if(remove){
        removeClassName(elem, className);
        return;
    }
    addClassName(elem, className);
}

function callClassNames(arr = changeElem) {
    arr.forEach(elem => {
        toggleClassName(elem);
    })
}
function toggleDisableBtnControllers(p) {
    let pInt = +p.slice(1, p.length);
    const toggleDisable = i => {
        let btnIsDisable = btnControllers[i].classList.contains('disable');
        toggleClassName(btnControllers[i], 'disable', btnIsDisable);
    }
    if (pInt === 0) {
        toggleDisable(0);
    } else if (pInt === data.length - 1) {
        toggleDisable(1);
    }
}
function setData(obj, indexes, arrowBtn) {
    photoElem.style.opacity = '0';
    indexes.forEach(p => {
        if (p === null) return;
        document.querySelector('#' + p).classList.toggle('active');
        if(started){
            started = !started;
            return;
        }
        toggleDisableBtnControllers(p);
    });
    for (let key in obj) {
        document.querySelector('.' + key).innerText = obj[key];
    }
    if (arrowBtn) callClassNames([arrowBtn]);
    photoElem.setAttribute('src', `img/${indexes[0].slice(1, indexes[0].length)}.jpg`);
}

function clickBtnAnim(btn) {
    let arrow = btn.getAttribute('id');
    let tempN = arrow === 'back' ? -1 : 1;
    let tempI = +currentIndex.slice(1, currentIndex.length) + tempN;

    if (tempI < 0 || tempI >= data.length) return;

    btn.setAttribute('disable', 'true');

    setData(data[tempI], ['p' + tempI, currentIndex], btn);

    currentIndex = 'p' + tempI;
    setTimeout(() => {
        btn.setAttribute('disable', 'false');
    }, 800);
}
function clickButtonArrow(e) {
    clickBtnAnim(this);
}

photoElem.addEventListener('load', e => {
    photoElem.style.opacity = '1';
    callClassNames();
})

document.addEventListener('keydown', ({ code }) => {
    if (code == 'KeyA' || code == 'ArrowLeft') {
        clickBtnAnim(btnControllers[0]);
    }
    else if (code == 'KeyD' || code == 'ArrowRight') {
        clickBtnAnim(btnControllers[1]);
    }
});

for (let i = 0; i < data.length; i++) {
    let navPoint = document.createElement('button');
    navPoint.classList.add('nav-point');
    navPoint.setAttribute('id', 'p' + i);

    navPoint.addEventListener('click', e => {
        let idPointStr = e.target.getAttribute('id');
        setData(data[+idPointStr.slice(1, idPointStr.length)], [idPointStr, currentIndex]);
        currentIndex = idPointStr;
    })

    navBar.appendChild(navPoint);
}
changeElem.forEach(elem => {
    elem.addEventListener('animationend', e => {
        toggleClassName(e.target, '', true);
    })
})
btnControllers.forEach(btn => {
    btn.addEventListener('click', clickButtonArrow);
    btn.addEventListener('transitionend', e => {
        toggleClassName(e.target, '', true);
    })
});
document.querySelector('.info').addEventListener('transitionend', e => {
    toggleClassName(e.target, '', true);
})

setData(data[0], [currentIndex, null]);