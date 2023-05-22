export const currencyFormat = (num) => {
    if (num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Birr'
    }
    
}
