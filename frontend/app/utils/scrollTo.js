const scrollTo = (target = document, wOffset = true) => {
    const offset = window.innerWidth < 992 && wOffset ? 100 : 0,
    modal = document.querySelector('.modal'),
    element = modal === null ? window : modal
    if(typeof window.scrollTo !== 'undefined'){
        element.scrollTo({
            top: target.offsetTop + offset,
            behavior: "smooth"
        });
    }else {
        element.scrollTo(target.offsetTop + offset);
    }
   // console.log(offset)
}

export default scrollTo