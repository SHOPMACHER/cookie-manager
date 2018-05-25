import htmlToElement from 'html-to-element/src/index';
import { hide } from './hide';
import { addEventListenerOnce } from '../utils/event-listener';
import { createCookie } from '../utils/cookie';

const _getBackground = () => {
    return htmlToElement(
        '<div class="cookie-manager--shadow cookie-manager--hidden"></div>'
    );
};

const _getBody = options => {
    const $html = htmlToElement(`
        <div class="cookie-manager--wrapper">
            <div class="content">
                <h2>${options.headline}</h2>
                <p>${options.intro}</p>
                <div class="content-cookies"></div>
                <div class="content-button">
                    <button class="button content-button--accept">${
                        options.acceptButton
                    }</button>
                </div>
            </div>
        </div>
    `);

    Array.prototype.forEach.call(options.cookies, (cookie, index) => {
        const $cookieWrapper = $html.querySelector('.content-cookies');
        const status = cookie.disabled ? 'checked disabled="true"' : '';
        const preSelected = cookie.preSelected && !cookie.disabled ? 'checked' : '';
        const $checkbox = htmlToElement(`
            <div class="cookie-wrapper"><label for="cookie-${index}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    name="cookie-${index}" 
                    id="cookie-${index}" 
                    data-cookie="${cookie.name}" 
                    ${status}
                    ${preSelected}>
                ${cookie.text}
            </label></div>`);

        $cookieWrapper.appendChild($checkbox);
    });

    return $html;
};

export const show = options => {
    const $background = _getBackground();
    const $html = _getBody(options);
    const $content = $html.querySelector('.content');
    const $button = $html.querySelector('.content-button--accept');

    document.body.appendChild($background);
    document.body.appendChild($html);

    $background.style.display = 'inherit';

    if ($content) {
        addEventListenerOnce($background, 'transitionend', () =>
            $content.classList.add('content--visible')
        );
    }

    if ($button) {
        $button.addEventListener('click', event => {
            event.preventDefault();

            const $checkboxes = $html.querySelectorAll('.checkbox');
            const state = Array.prototype.reduce.call(
                $checkboxes,
                (result, $checkbox) =>
                    $checkbox.checked && !$checkbox.getAttribute('disabled')
                        ? result.concat($checkbox.getAttribute('data-cookie'))
                        : result,
                []
            );

            createCookie(options.cookieName, state, options.expiresAtDays);

            hide($background, $html, options);
        });
    }

    window.requestAnimationFrame(() =>
        $background.classList.remove('cookie-manager--hidden')
    );
};
