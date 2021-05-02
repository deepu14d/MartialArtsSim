var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;    
};

let imagePath= (framenumber, animation) => {
    return "images/" + animation + "/" + framenumber + ".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    backward: [1, 2, 3, 4, 5, 6],
    forward: [1, 2, 3, 4, 5, 6]
}

let loadImages = (callback) => {
    let images = {idle: [], kick: [], punch: [], forward: [], backward: [], block: []};
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "forward", "backward", "block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((framenumber) => {
            let path = imagePath(framenumber, animation);

            loadImage(path, (image) => {
                images[animation][framenumber-1] =  image;
                imagesToLoad = imagesToLoad - 1;

                if (imagesToLoad === 0) {
                    callback(images);
                }
            })
        });
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 1500, 650);
            ctx.drawImage(image, 10, 30, 600, 600);
        }, index*100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queuedAnimation = [];

    let aux = () => {
        let selectedAnimation;

        if (queuedAnimation.length === 0) {
            selectedAnimation = "idle"
        } else {
            selectedAnimation = queuedAnimation.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    document.getElementById('kick').onclick = () => {
        queuedAnimation.push("kick");
    }
    document.getElementById('punch').onclick = () => {
        queuedAnimation.push("punch");
    }
    document.getElementById('forward').onclick = () => {
        queuedAnimation.push("forward")
    }
    document.getElementById('backward').onclick = () => {
        queuedAnimation.push("backward")
    }
    document.getElementById('block').onclick = () => {
        queuedAnimation.push("block")
    }
    document.addEventListener('keyup', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    if (key === "ArrowLeft") {
        queuedAnimation.push("kick");
    } else if (key === "ArrowRight") {
        queuedAnimation.push("punch");
    } else if (key === "ArrowUp") {
        queuedAnimation.push("forward");
    } else if (key === "ArrowDown") {
        queuedAnimation.push("backward");
    } else if (key === "z") {
        queuedAnimation.push("block")
    }
    
});
    aux();
})