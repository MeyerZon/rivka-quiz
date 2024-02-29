import './App.css'
import Main from "./components/Main/Main";
import {tests} from "./utils/tests";

export class Person {

    private _finalTime:number = 0
    private _zeut:string|null =null
    private _tests:TestData[] = tests

    get finalTime(): number {
        return this._finalTime;
    }

    set finalTime(value: number) {
        this._finalTime = value;
    }

    updateFinalTime(time:number){
        this._finalTime+=time
    }
    get zeut(): string|null {
        return this._zeut;
    }

    set zeut(value: string) {
        this._zeut = value;
    }

    get tests(): TestData[] {
        return this._tests;
    }
}
export type TestData = {
    question:string
    userAnswer:number|null
    correctAnswer:number
    time:number
}
function App() {

  return(
    <>
        <Main/>
    </>
  )
}

export default App
