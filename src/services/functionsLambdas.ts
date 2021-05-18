const functions: { int: { lambda: (x: number) => number; label: string; } } = {
// @ts-ignore
    0: {
        lambda: (x: number) => 0,
        label: 'Ничего не выбрано',
    },
    1: {
        lambda: (x: number) => 3 * x * x * x + 1.7 * x * x - 15.42 * x + 6.89,
        label: '3𝑥^3+1,7𝑥^2−15,42𝑥+6,89',
    },
    2: {
        lambda: (x: number) => Math.sin(x),
        label: 'sin(x)',
    },
    3: {
        lambda: (x: number) => x * x * x - x + 4,
        label: 'x^3-x+4',
    },
}

export function getFunctionLambda(selectedFunction: number) {
    // @ts-ignore
    return functions[selectedFunction];
}
export function getSelectList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const list: [{ value: number, label: string }] = []
    for (let i in functions) {
        // @ts-ignore
        list.push({value: i, label: functions[i].label})
    }
    return list
}