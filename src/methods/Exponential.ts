import Gauss from "../services/Gauss";

function Exponential(points: { x: number, y: number }[]) {
    let sx = 0
    let sxx = 0
    let sxxx = 0
    let sxxxx = 0
    let sy = 0
    let sxy = 0
    let sxxy = 0

    let max_x = -100000
    let min_x = 100000

    for (let i in points) {
        max_x = Math.max(points[i].x, max_x)
        min_x = Math.min(points[i].x, min_x)
        if (points[i].y !== 0 && points[i].x !== 0) {
            let Y = Math.log(points[i].y)

            let X = points[i].x
            sx += X
            sy += Y
            sxy += X * Y
            sxxy += X * X * Y
            sxx += X * X
            sxxx += X * X * X
            sxxxx += X * X * X * X
        }
    }

    const A = [
        [sxx, sx],
        [sx, points.length]
    ]
    const B = [
        sxy,
        sy,
    ]
    const result = Gauss(A, B)
    const a = Math.exp(result[1])
    const b = result[0]

    const plot_x = []
    const plot_y = []
    for (let i = min_x - (max_x - min_x) / 5; i < max_x + (max_x - min_x) / 5; i += 0.001) {
        plot_x.push(i)
        plot_y.push(a * Math.exp(i * b))
    }

    let S = 0
    for (let i in points) {
        S += Math.pow(a * Math.exp(points[i].x * b) - points[i].y, 2)
    }

    return {
        headers: ["Method", 'a', 'b', 'c', 'S', 'delta'],
        data: {'a': a, 'b': b, S: S, Method: "Exponential(a e^(x*b))", delta: Math.sqrt(S/points.length)},
        plot: {x: plot_x, y: plot_y, mode: "lines", "name": "Exponential"}
    }
}

export default Exponential;