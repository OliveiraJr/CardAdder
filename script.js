const numero = document.getElementById('numero')
const nome = document.getElementById('nome')
const validade = document.getElementById('validade')
const cvv = document.getElementById('cvv')
const cpf = document.getElementById('cpf')
const telefone = document.getElementById('telefone')

const numeroDisplay = document.getElementById('displayCardNumber')
const nomeDisplay = document.getElementById('displayCardName')
const validadeDisplay = document.getElementById('displayCardDate')
const cvvDisplay = document.getElementById('displayCardCvv')

numero.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '')

    let amexPattern = /^3[47]/; // American Express começa com 34 ou 37
    if (amexPattern.test(value)) {
        event.target.maxLength = 17
        cvv.maxLength = 4
        value = value.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    } else {
        event.target.maxLength = 19
        cvv.maxLength = 3
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
    }
    numeroDisplay.textContent = value || '0000 0000 0000 0000'
    event.target.value = value
})

nome.addEventListener('input', (event) => {
    let value = event.target.value
    nomeDisplay.textContent = value || 'Nome impresso no cartão'
})

validade.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2')


    validadeDisplay.textContent = value || 'MM/AA'
    event.target.value = value
})

cvv.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '')

    flipCard(true)
    cvvDisplay.textContent = value || '000'
    event.target.value = value
})

cvv.addEventListener('blur', () => {
    flipCard(false)
})

cvv.addEventListener('focus', () => {
    flipCard(true)
})

cpf.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '')

    if (value.length <= 11) { // Máscara para CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else { // Máscara para CNPJ
        value = value.replace(/(\d{2})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1/$2')
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    }

    event.target.value = value
})

telefone.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')


    event.target.value = value
})

function flipCard(isFlipped) {
    const cardContainer = document.getElementById('card-container')

    if (isFlipped) {
        cardContainer.classList.add('flip')
    } else {
        cardContainer.classList.remove('flip')
    }
}
