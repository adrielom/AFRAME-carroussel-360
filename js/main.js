const duration = 350;
const easing = 'easeOutQuad';

AFRAME.registerComponent('main', {
    init: function () {
    }
})

AFRAME.registerComponent('clickable', {
    init: function () {
        this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.el.addEventListener('mouseleave', this.onMouseExit.bind(this))
    },
    onMouseEnter: function(event) {
        if (event.target === this.el) return
        const startScale = { x: 2, y: 2, z: 2 };
        const endScale = { x: 1, y: 1, z: 1 };
        this.animateScale(startScale, endScale)
    },
    onMouseExit: function(event) {
        if (event.target === this.el) return
        const startScale = { x: 1, y: 1, z: 1 };
        const endScale = { x: 2, y: 2, z: 2 };
        this.animateScale(startScale, endScale)
    },
    animateScale: function (startScale, endScale) {
        target = this.el.target
        anime({
            targets: endScale,
            x: startScale.x,
            y: startScale.y,
            z: startScale.z,
            duration: duration,
            easing: easing,
            update: function() {
                this.target.setAttribute('scale', endScale);
            }
        });
    }
})