let canvas = new p5(sketch, "canvas");
const reset = () => {
    character = {
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

    animation = {
        still: [],
        walk: [],
        walk_back: []
    }

    history = []

    length = 0

    canvas.remove()
    canvas = new p5(sketch, "canvas");
}

accel = 2


// 조작 (모바일)
$(".btn").on("contextmenu", event => {
    event.preventDefault()
})

$(".btn").click(event => {
    character.x_accel = 0
    character.y_accel = 0
    for (i of event.currentTarget.id.split("-")) {
        switch (i) {
            case "top":
                character.y_accel = -accel;
                character.y_direction = "behind";
                break
            case "right":
                character.x_accel = accel;
                character.x_direction = "right";
                break
            case "bottom":
                character.y_accel = accel;
                character.y_direction = "front";
                break
            case "left":
                character.x_accel = -accel;
                character.x_direction = "left";
                break
            case "stop":
                // character.x_speed = 0
                // character.y_speed = 0
        }
    }
})


// 조작 (PC)
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobile()) {
    $("#btns").hide()
}

$("body").keydown(event => {
    switch(event.keyCode) {
        case 38: // 위 방향키
            character.y_accel = -accel;
            character.y_direction = "behind";
            break
        case 37: // 왼쪽 방향키
            character.x_accel = -accel;
            character.x_direction = "left";
            break
        case 39: // 오른쪽 방향키
            character.x_accel = accel;
            character.x_direction = "right";
            break
        case 40: // 아래 방향키
            character.y_accel = accel;
            character.y_direction = "front";
            break
    }
})

$("body").keyup(event => {
    switch(event.keyCode) {
        case 38: // 위 방향키
            character.y_accel = 0;
            break
        case 37: // 왼쪽 방향키
            character.x_accel = 0;
            break
        case 39: // 오른쪽 방향키
            character.x_accel = 0;
            break
        case 40: // 아래 방향키
            character.y_accel = 0;
            break
    }
})