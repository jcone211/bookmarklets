javascript: (() => {
    const stepTime = 40;
    const d = document.documentElement;
    const scroll = {};
    scroll.startPosition = d.scrollTop;

    const removeAllListeners = () => {
        d.removeEventListener('click', toggleScroll, true);
        d.removeEventListener('dblclick', resetScroll, true);
        d.removeEventListener('touchstart', toggleScroll, { passive: true });
        d.removeEventListener('touchend', preventTouchEnd, { passive: false });
        window.removeEventListener('wheel', onUserScroll, { passive: true });
    };

    const stopScroll = () => {
        scroll.state = false;
        scroll.time = null;
        scroll.pos = null;
    };

    const scrollThisPage = (timestamp) => {
        if (scroll.time) {
            scroll.pos = scroll.pos !== null
                ? scroll.pos + (timestamp - scroll.time) / stepTime
                : d.scrollTop;
            d.scrollTop = scroll.pos;
        }
        scroll.time = timestamp;

        if (d.scrollTop < d.scrollHeight - window.innerHeight - 10 && scroll.state) {
            window.requestAnimationFrame(scrollThisPage);
        } else {
            stopScroll();
        }
    };

    const toggleScroll = (e) => {
        e.stopPropagation();
        if (scroll.state) {
            stopScroll();
        } else {
            scroll.state = true;
            window.requestAnimationFrame(scrollThisPage);
        }
    };

    const resetScroll = (e) => {
        e.stopPropagation();
        stopScroll();
        d.scrollTop = scroll.startPosition;
    };

    const preventTouchEnd = (e) => e.preventDefault();

    const onUserScroll = () => {
        stopScroll();
        removeAllListeners();
    };

    stopScroll();

    d.addEventListener('click', toggleScroll, true);
    d.addEventListener('dblclick', resetScroll, true);
    d.addEventListener('touchstart', toggleScroll, { passive: true });
    d.addEventListener('touchend', preventTouchEnd, { passive: false });
    window.addEventListener('wheel', onUserScroll, { passive: true });

    scroll.state = true;
    window.requestAnimationFrame(scrollThisPage);
})();
