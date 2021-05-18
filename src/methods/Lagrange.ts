function polyLagrange(points: { x: number, y: number }[], argument: number) {
    let L = 0
    for (let i in points) {
        let l = 1
        for (let j in points) {
            if (i !== j)
                l *= (argument - points[j].x) / (points[i].x - points[j].x)
        }
        L += l * points[i].y
    }
    return L
}

function Lagrange(points: { x: number, y: number }[], argument: number) {
    let value = polyLagrange(points, argument);
    let plot_x: number[] = []
    let plot_y: number[] = []
    let max_x = -10000000
    let min_x = 100000000

    for (let i in points) {
        max_x = Math.max(points[i].x, max_x)
        min_x = Math.min(points[i].x, min_x)
    }

    for (let i = min_x - (max_x - min_x) / 5; i < max_x + (max_x - min_x) / 5; i += 0.001) {
        plot_x.push(i)
        plot_y.push(polyLagrange(points, i))
    }

    return {
        headers: ["Method", 'value'],
        data: {Method: "Lagrange", value: value},
        plot: {x: plot_x, y: plot_y, mode: "lines", "name": "Lagrange"}
    }
}

export default Lagrange;