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

        }
    });

    modalClose.addEventListener('click', () => {
        modalWindow.style.display = 'none';
    });

    addBtn.addEventListener('click', e => {
        modalWindow.style.display = 'block'
        animate({
            duration: 500,
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