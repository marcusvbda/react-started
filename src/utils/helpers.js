export const isJSON = item => {
    item = (typeof item !== "string") ? JSON.stringify(item) : item
    try {
        item = JSON.parse(item)
    } catch (e) {
        return false
    }
    if (typeof item === "object" && item !== null) return true
    return false
}

export const isTrue = (value) => {
    if (["false", "null", "0", "undefined", "NaN"].includes(String(value))) return false
    return true
}

export const isValidEmail = email => {
    const value = String(email).replace(/ /g, '').trim()
    if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/).test(value)) return false
    return true
}

export const isValidPassword = (password, complex = true) => {
    if (!password) return false
    if (complex) if (!password.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/)) return false
    if (!password.match(/^(?=.*\d).{6,20}$/)) return false
    return true
}

export const getIsMobile = ctx => {
    const { req } = ctx
    let userAgent
    if (req) userAgent = req.headers['user-agent'] // get the user-agent from the headers
    else userAgent = navigator.userAgent
    return Boolean(userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
}
