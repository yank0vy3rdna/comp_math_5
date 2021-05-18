function polyNewton(points: { x: number, y: number }[], k: number): number {
    let answer = 0;
    for (let i = 0; i <= k; i++) {
        let pr = 1
        for (let j = 0; j <= k; j++) {
            if (j !== i)
                pr *= points[i].x - points[j].x
        }
        answer += points[i].y / pr
    }
    return answer
}

function fNewton(points: { x: number, y: number }[], argument: number) {
    let answer = polyNewton(points, 0)
    for (let i = 1; i < points.length; i++) {
        let pr = 1
        for (let j = 0; j < i; j++) {
            pr *= argument - points[j].x
        }
        answer += polyNewton(points, i) * pr
    }
    return answer
}


function Newton(points: { x: number, y: number }[], argument: number) {
    if (points.length > 0) {
        let value = fNewton(points, argument)

        let max_x = -100000
        let min_x = 100000

        for (let i in points) {
            max_x = Math.max(points[i].x, max_x)
            min_x = Math.min(points[i].x, min_x)
        }
        const plot_x = []
        const plot_y = []

        for (let i = min_x - (max_x - min_x) / 5; i < max_x + (max_x - min_x) / 5; i += 0.001) {
            plot_x.push(i)
            plot_y.push(fNewton(points, i))
        }
        return {
            headers: ["Method", 'value'],
            data: {Method: "Newton", value: value},
            plot: {x: plot_x, y: plot_y, mode: "lines", "name": "Newton"}
        }
    } else
        return {
            headers: ["Method", 'value'],
            data: {Method: "Newton", value: 0},
            plot: {x: [], y: [], mode: "lines", "name": "Newton"}
        }
}

export default Newton;