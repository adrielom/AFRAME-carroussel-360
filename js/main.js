const duration = 350;
const easing = 'easeOutQuad';

AFRAME.registerComponent('main', {
    init: function () {
        console.log('first')
    }
})

AFRAME.registerComponent('clickable', {
    init: function () {
        this.el.addEventListener('mouseenter', function (el) {
            const startScale = { x: 1, y: 1, z: 1 };
            const endScale = { x: 2, y: 2, z: 2 };
            anime({
                targets: startScale,
                x: endScale.x,
                y: endScale.y,
                z: endScale.z,
                duration: duration,
                easing: easing,
                update: function() {
                    el.target.setAttribute('scale', startScale);
                }
            });
        })
        this.el.addEventListener('mouseleave', function (el) {
            const startScale = { x: 1, y: 1, z: 1 };
            const endScale = { x: 2, y: 2, z: 2 };
            anime({
                targets: endScale,
                x: startScale.x,
                y: startScale.y,
                z: startScale.z,
                duration: duration,
                easing: easing,
                update: function() {
                    el.target.setAttribute('scale', endScale);
                }
            });
        })
    }
})