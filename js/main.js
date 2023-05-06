const duration = 350;
const easing = 'easeOutQuad';

AFRAME.registerComponent('main', {
    randomImageIndex: function (max = 15, min = 1) {
        return Math.floor(Math.random() * (max - min) + 1)
    },
    init: function () {

        const video = document.querySelector('#video');
        video.play()
        const isMobile = AFRAME.utils.device.isMobile();
        let cursor = document.querySelector('#orange-cursor')
        cursor.setAttribute('raycaster', {
            objects: 'ds',
            enabled: false,
        })
        cursor.object3D.visible = false;
        if (isMobile) {
            cursor.setAttribute('raycaster', {
                objects: '.card',
                enabled: false,
            })

            cursor.object3D.visible = true;
        }


        const parent = document.querySelector('.cards')
        let imagesSet = []
        // Create a parent element that will spin
        let numberOfImages = 7
        let arc = 270
        // Create 15 child elements and position them around the parent
        for (let i = 0; i < numberOfImages; i++) {
            let randomImageIndex = this.randomImageIndex()

            while (imagesSet.find(el => el === randomImageIndex) !== undefined) randomImageIndex = this.randomImageIndex();
            imagesSet.push(randomImageIndex);

            const childImage = document.createElement('a-image');
            const childText = document.createElement('a-text');
            childImage.setAttribute('src', `#image${randomImageIndex}`)
            childImage.setAttribute('scale', { x: 2, y: 3, z: 1 });
            childImage.setAttribute('class', 'card');
            const clickableAttribute = document.createAttribute('clickable');
            childImage.setAttributeNode(clickableAttribute)
            // const lookControl = document.createAttribute('look-controls')
            // child.setAttributeNode(lookControl)
            const angle = (i / numberOfImages) * (arc * Math.PI / 180); // Calculate the angle between elements
            const radius = 5; // Set the distance from the parent
            childImage.setAttribute('position', {
                x: Math.sin(angle) * radius,
                y: 2,
                z: Math.cos(angle) * radius
            });
            childImage.setAttribute('rotation', {
                y: i * (arc / numberOfImages)
            })
            parent.appendChild(childImage);
            childText.setAttribute('position', { x: 0, y: -0.335, z: 0 })
            childText.setAttribute('scale', { x: -1, y: 1, z: -1 })
            childText.setAttribute('align', 'center')
            childText.setAttribute('width', 2)

            childText.setAttribute('value', 'Clique ou Toque \npara visitar')

            childImage.appendChild(childText)
            childText.setAttribute('visible', false)

        }

    }
})

AFRAME.registerComponent('clickable', {
    init: function () {
        this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.el.addEventListener('mouseleave', this.onMouseExit.bind(this))
    },
    animateScale: function (startScale, endScale) {
        const target = this.el
        anime({
            targets: endScale,
            x: startScale.x,
            y: startScale.y,
            z: startScale.z,
            duration: duration,
            easing: easing,
            update: function () {
                target.setAttribute('scale', endScale);
            }
        });
    },
    onMouseEnter: function (event) {
        const startScale = { x: 4, y: 6, z: 1 };
        const endScale = { x: 2, y: 3, z: 2 };
        anime({
            targets: endScale,
            x: startScale.x,
            y: startScale.y,
            z: startScale.z,
            duration: duration,
            easing: easing,
            update: function () {

                document.querySelector('canvas').classList.remove('a-grab-cursor')
                document.querySelector('canvas').classList.add('a-cursor')
                event.target.setAttribute('scale', endScale);
                event.target.querySelector('a-text').setAttribute('visible', true);
            }
        });
    },
    onMouseExit: function (event) {
        const startScale = { x: 2, y: 3, z: 1 };
        const endScale = { x: 4, y: 6, z: 1 };

        const parent = this.el.object3D

        anime({
            targets: endScale,
            x: startScale.x,
            y: startScale.y,
            z: startScale.z,
            duration: duration,
            easing: easing,
            update: function () {
                event.target.setAttribute('scale', endScale);
                document.querySelector('canvas').classList.add('a-grab-cursor')
                document.querySelector('canvas').classList.remove('a-cursor')
                event.target.querySelector('a-text').setAttribute('visible', false);
            }
        });
    },
})
