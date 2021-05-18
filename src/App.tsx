import React, {useState} from 'react';
import './App.css';
import PlotItem from './components/PlotItem';
// @ts-ignore
import NumericInput from "react-numeric-input";
import Table from "./components/DynamicTable";
import SettingsFile from "./components/SettingsFile";
import DynamicNumericInput from "./components/DynamicNumericInput";
import Newton from "./methods/Newton";
import Lagrange from './methods/Lagrange';
import {getFunctionLambda, getSelectList} from "./services/functionsLambdas";
import SelectItem from "./components/Select";

function App() {
    const selectFunctionsList = getSelectList()
    const [points, setPoints]: [{ x: number, y: number }[], any] = useState([]);
    const [selectedFunction, setSelectedFunction] = useState(selectFunctionsList[0]);
    const [argument, setArgument] = useState(0);

    const [, setValue] = useState(0);

    if (selectedFunction.value !== 0) {
        for (let i in points) {
            points[i].y = getFunctionLambda(selectedFunction.value).lambda(points[i].x)
        }
    }

    let plots: { x: number[], y: number[], mode: string, name: string }[]
    plots = []
    {
        let x_vals: number[] = []
        let y_vals: number[] = []
        for (let i = 0; i < points.length; i++) {
            x_vals.push(points[i].x)
            y_vals.push(points[i].y)
        }
        plots.push({x: x_vals, y: y_vals, mode: "markers", name: "Source data"})
    }

    const headers: string[] = [];
    const pushToHeaders = (headers_from_method: string[]) => {
        for (let i in headers_from_method) {
            if (!headers.includes(headers_from_method[i])) {
                headers.push(headers_from_method[i])
            }
        }
    }

    const newtonResult = Newton(points, argument)
    const lagrangeResult = Lagrange(points, argument)

    plots.push(lagrangeResult.plot)
    plots.push(newtonResult.plot)

    pushToHeaders(lagrangeResult.headers)
    pushToHeaders(newtonResult.headers)

    const data = [
        newtonResult.data,
        lagrangeResult.data,
    ]

    return (
        <div className="App">
            <h3>Лабораторная работа №5 по вычислительной математике. Крюков Андрей, P3214</h3>
            <table className="App">
                <tr>
                    <td>Выбор функции:</td>
                    <td>
                        <SelectItem onSelectHandler={setSelectedFunction} value={selectedFunction}
                                    options={selectFunctionsList}/>
                        {/*@ts-ignore*/}
                        <DynamicNumericInput points={points} setPoints={setPoints}
                                             rerender={() => setValue(value => value + 1)}/></td>
                </tr>
                <tr>
                    <td>Выбор аргумента:</td>
                    <td><NumericInput value={argument} onChange={setArgument}/></td>
                </tr>
            </table>
            <SettingsFile setSettings={(text: string) => {
                try {
                    let obj = JSON.parse(text)
                    if (!('data' in obj)) {
                        throw SyntaxError("Bad file")
                    }
                    setPoints(obj['data'])
                } catch (e) {
                    alert("File is not correct")
                }
            }}/>
            <PlotItem plots={plots}/>
            <Table data={data} header={headers}/>
        </div>
    );
}

export default App;
