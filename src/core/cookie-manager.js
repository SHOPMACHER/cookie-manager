import { getCookies } from '../utils/cookie';
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
    cookies: []
};

const cookieManager = customOptions => {
    const options = {
        ..._defaultOptions,
        ...customOptions
    };
    const cookieList = getCookies(options.cookieName);
    const cookies = cookieList.length > 0 ? cookieList[0].split(',') : [];
    const $targetElement = document.querySelector(options.showOnTargetElement);

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

        if (cookies.length > 0) {
            return;
        }
    }

    if (options.cookies.length > 0) {
        show(options);
    }
};

export default cookieManager;
