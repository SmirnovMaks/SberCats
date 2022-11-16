const modal = () => {
    const modal = document.querySelector('.modal')
    const addBtn = document.querySelector('.cats__add')

    addBtn.addEventListener('click', e => {
        modal.style.display = 'block'
    })
}

export default modal