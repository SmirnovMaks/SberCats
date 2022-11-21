import {
    animate
} from './helpers';
const modal = () => {
    const addBtn = document.querySelector('.cats__add')
    const modalWindow = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');

    modalWindow.addEventListener('click', (e) => {
        const isModal = e.target.closest('.modal__inner');
        if (!isModal) {
            modalWindow.style.display = 'none';
            document.querySelector('main').style.filter = ''
        }
    });

    modalClose.addEventListener('click', () => {
        modalWindow.style.display = 'none';
        document.querySelector('main').style.filter = ''
    });

    addBtn.addEventListener('click', e => {
        modalWindow.style.display = 'flex'
        document.querySelector('main').style.filter = 'blur(3px)'
        animate({
            duration: 300,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                modalWindow.style.opacity = progress;
            }
        })
    })
}

export default modal