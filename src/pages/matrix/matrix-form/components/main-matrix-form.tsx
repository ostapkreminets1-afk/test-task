import "../css/main-matrix-form.css"
import { InputMatrix } from "./input-matrix"    


export function MainMatrixForm() {

    return  ( 
        <section className="main-matrix-form">
            <span>Matrix parameters</span>
            <InputMatrix />
        </section>
    )
}