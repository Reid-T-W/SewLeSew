export const currencyFormat = (num) => {
    // if (num) {
    if (num != null) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Birr'
    }
    
}
