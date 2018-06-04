import { createCookie, getCookies } from '../utils/cookie';
import { show } from './show';

const _defaultOptions = {
    headline: 'General Data Protection Regulation',
    intro: 'This Site uses cookies for ....',
    acceptButton: 'accept',
    cookieName: 'allowedCookies',
    expiresAtDays: null,
    reloadAfter: false,
    disableBefore: false,
    showOnTargetElement: '',
    showElementOnTop: false,
    cookies: []
};

const cookieManager = customOptions => {
    const options = {
        ..._defaultOptions,
        ...customOptions
    };
    const cookieList = getCookies(options.cookieName);
    const availableCookies = getCookies(`${options.cookieName}Available`).join(',');
    const availableCookieList = options.cookies.map(cookie => cookie.name).join(',');
    const cookies = cookieList.length > 0 ? cookieList[0].split(',') : [];
    const $targetElement = document.querySelector(options.showOnTargetElement);
    let forceUpdate = false;

    if (!availableCookies || availableCookies !== availableCookieList) {
        createCookie(`${options.cookieName}Available`, availableCookieList);
        forceUpdate = true;
    }

    if ($targetElement) {
        $targetElement.addEventListener(
            'click',
            show.bind(undefined, options)
        );
    }

    if (cookies.length > 0 || options.disableBefore) {
        Array.prototype.forEach.call(options.cookies, cookie => {
            const cookieName = cookies.indexOf(cookie.name) > -1;

            if (
                (cookieName ||
                    (options.disableBefore && cookies.length === 0)) &&
                typeof cookie.handler === 'function'
            ) {
                cookie.handler();
            }
        });

        if (cookies.length > 0 && !forceUpdate) {
            return;
        }
    }

    if (options.cookies.length > 0 || forceUpdate) {
        show(options);
    }
};

export default cookieManager;
