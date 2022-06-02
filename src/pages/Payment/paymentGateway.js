const MAIN_PATH = 'http://localhost:3000'
const payButton = document.getElementById('pay')
const cancelButton = document.getElementById('cancel')

payButton.addEventListener('click', (e) => {
    console.log('pay')
    window.open(MAIN_PATH)
})
cancelButton.addEventListener('click', (e) => {
    console.log('cancel')
    window.open(MAIN_PATH)


})