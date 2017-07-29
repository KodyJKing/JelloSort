class Task {
    constructor(x, width) {
        // ---- Dynamics ----        
        this.x = 0
        this.width = 0
        this.velocity = 0
        this.parents = []
        
        // ---- Drawing ----        
        this.color = [255,255,255]
        this.smoothedX = 0
        this.y = 0
    }

    // ---- Dynamics ----

    update() {
        this.applyEdgeForce(this)
        this.applyAsapForce(this)
        for (let parent of this.parents) this.applyOrderForce(parent)
        this.x += this.velocity
        this.velocity *= friction
    }

    applyOrderForce(parent) {
        let attractionPoint = parent.x + parent.width
        let force = (attractionPoint - this.x) * orderForce
        if (attractionPoint <= this.x)
            force *= orderDiscount
        this.velocity += force
        parent.velocity -= force
    }

    applyEdgeForce() {
        if (this.x < 50) {
            this.velocity += edgeForce
            this.x = 51
        } else if (this.x + this.width > width - 50) {
            this.velocity -= edgeForce
            this.x = width - this.width - 60
        }
    }

    applyAsapForce() {
        this.velocity -= asapForce
    }

    // ---- Drawing ----

    draw() {
        this.smoothedX = this.smoothedX * visualDamping + this.x * (1 - visualDamping)
        push()
            noStroke()
            fill(this.color)
            translate(this.smoothedX, this.y)
            rect(0, 0, this.width, taskHeight)
            rect(0, -flagHeight, flagWidth, flagHeight)
        pop()
    }

    postDraw() {
        for (let parent of this.parents) this.drawLink(parent)
    }

    flagTop() {
        return this.y - flagHeight
    }

    drawLink(parent) {
        let y = this.flagTop()
        let py = parent.flagTop()
        let midY = (y + py) / 2
        push()
            noFill()
            strokeCap(SQUARE)
            strokeWeight(linkWidth)
            if (this.isAfter(parent)) 
                stroke(255, 255, 232, 30)
            else 
                stroke(255, 0, 0, 200)
            bezier(
                parent.smoothedX + 2, py,
                parent.smoothedX, midY - 100,
                this.smoothedX, midY - 100,
                this.smoothedX + 2, y
            )
        pop()
    }

    isAfter(parent) {
        let diff = parent.x + parent.width - this.x
        return diff < paddingTime
    }
}