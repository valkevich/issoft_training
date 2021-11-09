const navigation = document.querySelector('.layout__navigation')
const modalWindowCloseButtons = document.querySelectorAll('.modal-window__close')

navigation.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
            document.querySelector(`.${e.target.id}`).classList.remove('not-active')
        }
})

modalWindowCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closeButton.parentElement.parentElement.classList.add('not-active')
    })
})
