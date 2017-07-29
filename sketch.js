var tasks

function randomParents(j) {
	if (j + 1 == tasks.length) return parents
    let count = random(minconnections,maxConnections) | 0
    let parents = []
    for (var i = 0; i < count; i++) {
        let p = floor(random(j + 1, taskCount))
        if (p >= taskCount) p = taskCount - 1
        if (p == j || parents.indexOf(p) > -1) continue
        parents.push(p)
    }
    return parents
}

function randomTask(tasks) {
    let task = new Task()
    task.y = Math.floor(random(50, height - 50) / (taskHeight * 2)) * taskHeight * 2
    task.width = random(minTaskWidth, maxTaskWidth)
    task.color = [random(50, 150), random(50, 150), random(50, 150)]

    if (tasks.length == 0) return task
    let count = (Math.random() * (maxConnections - minconnections) | 0) + minconnections
    for (let i = 0; i < count; i++) {
        let index = (Math.random() * tasks.length) | 0
        let parent = tasks[index]
        if (parent == null || task.parents.indexOf(parent) > -1) continue
        task.parents.push(parent)
    }
    return task
}

function setup() {
    createCanvas(1920, 1000);
    tasks = []
    for (let i = 0; i < taskCount; i++) tasks.push(randomTask(tasks))
}

function draw() {
    drawBackground()
    for (let i = 0; i < stepsPerFrame; i++) update()
    for (let task of tasks) task.draw()
    for (let task of tasks) task.postDraw()
}

function drawBackground() {
    background(33,33,30)
    push()
        noStroke()
        for(let i = 0; i < 20; i++) {
            fill(38,38,34)
            rect(i * (width / 20), 0, width / 40, height)
        }
    pop()
}

function update() {
    for (let task of tasks) task.update()
}
