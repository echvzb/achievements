export default () => {
    const introHeroElem = document.createElement("div");
    const logo = document.createElement("div");

    introHeroElem.classList.add("intro-hero");
    logo.classList.add("logo");
    logo.classList.add("enter");

    introHeroElem.appendChild(logo);

    setTimeout(() => {
        logo.classList.remove("enter");
        logo.classList.add("exit");
        setTimeout(() => {
            introHeroElem.classList.add("exit");
            setTimeout(() => {
                document.body.removeChild(introHeroElem);
            }, 100);
        }, 600);
    }, 1000);

    document.body.appendChild(introHeroElem);
}