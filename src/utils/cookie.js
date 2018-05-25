/**
 * This helper function creates a cookie
 * @param name
 * @param value
 * @param days
 */
export const createCookie = (name, value, days) => {
    let expires = '; expires=Thu, 31 Dec 2099 23:59:59 UTC';

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = name + '=' + value + expires + '; path=/';
};

/**
 * This helper function returns the cookies on / path
 * @param {string} name
 * @returns {Array}
 */
export const getCookies = name => {
    return document.cookie.split(';').reduce((cookies, current) => {
        const [key, value] = current.trim().split('=');

        return key === name ? cookies.concat(value) : cookies;
    }, []);
};
