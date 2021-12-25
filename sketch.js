let character = {
    x: 0,
    y: 0,
    x_speed: 0,
    y_speed: 0,
    x_accel: 0,
    y_accel: 0,
    x_direction: "right",
    y_direction: "front",
    isWalk: false
}

const realX = (x) => $(window).width()/2 - 20 + x
const realY = (y) => $(window).height()/2 - 100 + y

// =========[ config ]=========
const speed_limit = {
    x: 10,
    y: 10
}
const friction = 0.5

const lineSync = {
    x: 40,
    y: 50
}

// -===========================

let animation = {
    still: [],
    walk: [],
    walk_back: []
}

let history = []

const sketch = function (p) {
    p.preload = function() {
        for (i of Object.keys(animation)) {
            for (let ii = 0; ii < 10; ii++) {
                console.log(`[Load Image] ./assets/${i}/${ii}.png`)
                animation[i].push(p.loadImage(`./assets/${i}/${ii}.png`))
            }
        }
    }

    p.setup = function () {
        p.createCanvas($(window).width(), $( window ).height())
        p.frameRate(10)
    }

    p.draw = function () {
        p.background("rgb(233, 236, 255)");
        p.strokeWeight(20);
        p.stroke("rgb(213, 219, 255)");

        let last_history = {x: 0, y: 0}
        history.forEach(e => {
            p.line(realX(last_history.x)+lineSync.x, realY(last_history.y)+lineSync.y, realX(e.x)+lineSync.x, realY(e.y)+lineSync.y)
            last_history.x = e.x
            last_history.y = e.y
        })

        if (character.x_speed == 0 && character.y_speed == 0 && character.x_accel == 0 && character.y_accel == 0 ) {
            if (character.x_direction == "left") {
                p.image(animation.still[p.frameCount%10], realX(character.x), realY(character.y), 50, 60)
            } else {
                p.push()
                p.scale(-1, 1)
                p.image(animation.still[p.frameCount%10], realX(character.x) * -1 - 70, realY(character.y), 50, 60)
                p.pop()
            }
        } else {
            if (character.x_direction == "left") {
                p.image(animation[character.y_direction==="front" ? "walk" : "walk_back"][p.frameCount%10], $(window).width()/2 - 20 + character.x, $(window).height()/2 - 100 + character.y, 50, 60)
            } else {
                p.push()
                p.scale(-1, 1)
                p.image(animation[character.y_direction==="front" ? "walk" : "walk_back"][p.frameCount%10], ($(window).width()/2 - 20 + character.x) * -1 - 70, $(window).height()/2 - 100 + character.y, 50, 60)
                p.pop()
            }
        }


        character.x_speed += (Math.abs(character.x_speed + character.x_accel) <= speed_limit.x ? character.x_accel : 0)
        character.y_speed += (Math.abs(character.y_speed + character.y_accel) <= speed_limit.y ? character.y_accel : 0)
        character.x += (realX(character.x)+character.x_speed+40 >= 0 && realX(character.x)+character.x_speed+40 <= $(window).width()) ? character.x_speed : 0
        character.y += (realY(character.y)+character.y_speed+40 >= 0 && realY(character.y)+character.y_speed+50 <= $(window).height()) ? character.y_speed : 0
        history.push({x: character.x, y: character.y})

        $("#result").html(`<i class="ph-gauge"></i> ${Math.sqrt(character.x_speed**2 + character.y_speed**2)}cm/s`)


        // DEBUG
        $("#tex").html(`(${character.x_accel}, ${character.y_accel}) (${character.x_speed}, ${character.y_speed}) (${character.x}, ${character.y})`)
    }
}