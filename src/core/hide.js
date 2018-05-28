import { addEventListenerOnce } from '../utils/event-listener';

const __slideUp = $el => {
    let timing = '1000ms ease';
    
    $el.style.webkitTransition = 'initial';
    $el.style.transition = 'initial';
    let height = $el.offsetHeight + 'px';
    $el.style.maxHeight = height;
    $el.style.overflow = 'hidden';
    
    $el.style.webkitTransition = 'max-height ' + timing + ', opacity ' + timing + '';
    $el.style.transition = 'max-height ' + timing + ', opacity ' + timing + '';
    let endSlideDown = () => {
        $el.style.removeProperty('-webkit-transition');
        $el.style.removeProperty('transition');
        $el.removeEventListener(transitionEvent('end'), endSlideDown);
    };
    requestAnimationFrame(() => {
        $el.style.maxHeight = '0';
        $el.style.opacity = '0';
    });
}

const __remove = ($background, $html, options) => {
    document.body.removeChild($background);
    document.body.removeChild($html);

    if (options.reloadAfter) {
        location.reload();
    }
}

export const hide = ($background, $html, options) => {
    const $content = $html.querySelector('.content');
    
    addEventListenerOnce($background, 'transitionend', () => {
        __remove($background, $html, options);
    });
    
    addEventListenerOnce($content, 'transitionend', () => {
        if(options.showElementOnTop) {
            __remove($background, $html, options);
        }
        
        $background.classList.add('cookie-manager--hidden')
    });

    if(options.showElementOnTop) {
        __slideUp($html);
        
        return;
    }
    
    $content.classList.remove('content--visible');
};
