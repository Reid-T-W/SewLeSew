export const dateTime = (datetime) => {
    const now = new Date()
    const date = new Date(datetime)

    const diffInMs = now - date

    // Return datetime in milliseconds if less than a second
    if (diffInMs < 1000) {
        return diffInMs
    }
    // Return datetime In seconds if less than a minute
    else if (diffInMs < (60 * 1000)) {
        const formatted_datetime = Math.floor(diffInMs / 1000)
        if (formatted_datetime == 1) {
            return (`${formatted_datetime} second ago`)
        }
        return(`${formatted_datetime} seconds ago`)
    }
    // Return datetime In minutes if less than an hour
    else if (diffInMs < (60 * 60 * 1000)) {
        const formatted_datetime = Math.floor(diffInMs / (60 * 1000))
        if (formatted_datetime == 1) {
            return (`${formatted_datetime} minutes ago`)
        }
        return(`${formatted_datetime} minutes ago`)
    }
    // Return datetime In hours if less than a day
    else if (diffInMs < (24 * 60 * 60 * 1000)) {
        const formatted_datetime = Math.floor(diffInMs / (60 * 60 * 1000))
        if (formatted_datetime == 1) {
            return (`${formatted_datetime} hour ago`)
        }
        return(`${formatted_datetime} hours ago`)
    }
    // Return date and time in day if less than a week
    else if(diffInMs < (7 * 24 * 60 * 60 * 1000)) {
        const formatted_datetime = Math.floor(diffInMs / (24 * 60 * 60 * 1000))
        if (formatted_datetime == 1) {
            return (`${formatted_datetime} day ago`)
        }
        return(`${formatted_datetime} days ago`)
    }
    // Retunr date and time if more than a week
    else {
       const print_time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
       const print_date = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
       return `${print_time} | ${print_date}`
    }
}