import { addEventListenerOnce } from '../utils/event-listener';

export const hide = ($background, $html, options) => {
    const $content = $html.querySelector('.content');

    addEventListenerOnce($background, 'transitionend', () => {
        document.body.removeChild($background);
        document.body.removeChild($html);

        if (options.reloadAfter) {
            location.reload();
        }
    });
    addEventListenerOnce($content, 'transitionend', () => $background.classList.add('cookie-manager--hidden'));

    $content.classList.remove('content--visible');
};
