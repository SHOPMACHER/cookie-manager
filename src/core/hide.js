import { addEventListenerOnce } from '../utils/event-listener';

const _slideUp = $element => {
    const timing = '1000ms ease';

    $element.style.webkitTransition = 'initial';
    $element.style.transition = 'initial';
    $element.style.maxHeight = $element.offsetHeight + 'px';
    $element.style.overflow = 'hidden';

    $element.style.webkitTransition = `max-height ${timing}, opacity ${timing}`;
    $element.style.transition = `max-height ${timing}, opacity ${timing}`;

    const endSlideDown = () => {
        $element.style.removeProperty('-webkit-transition');
        $element.style.removeProperty('transition');
        $element.removeEventListener(transitionEvent('end'), endSlideDown);
    };

    requestAnimationFrame(() => {
        $element.style.maxHeight = '0';
        $element.style.opacity = '0';
    });
};

const _removeElements = ($background, $html, options) => {
    document.body.removeChild($background);
    document.body.removeChild($html);

    if (options.reloadAfter) {
        location.reload();
    }
};

export const hide = ($background, $html, options) => {
    const $content = $html.querySelector('.content');

    addEventListenerOnce($background, 'transitionend', () =>
        _removeElements($background, $html, options)
    );

    addEventListenerOnce($content, 'transitionend', () => {
        if (options.showElementOnTop) {
            _removeElements($background, $html, options);
        }

        $background.classList.add('cookie-manager--hidden');
    });

    if (options.showElementOnTop) {
        _slideUp($html);

        return;
    }

    $content.classList.remove('content--visible');
};
