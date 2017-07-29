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
    task.x = random(50, width)
    task.y = Math.floor(random(100, height - 100) / (taskHeight * 2)) * taskHeight * 2
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
    background(30,30,30)
    for (let i = 0; i < stepsPerFrame; i++) for (let task of tasks) task.update()        
    for (let task of tasks) task.draw()
    for (let task of tasks) task.postDraw()
}
