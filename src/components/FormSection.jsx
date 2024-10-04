import { useState } from 'react';
import DemoContent  from './demoContent';

const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');

    return (
        <div className="form-section">
            <div className='demo-content-buttons'>
                <div className='demo-content-single-button'><DemoContent question={"Crea un examen de opción múltiple acerca de Procedimientos Almacenados"} generateResponse={generateResponse}/></div>
                <div className='demo-content-single-button'><DemoContent question={"Crea un examen de opción múltiple acerca de ADO.NET"} generateResponse={generateResponse}/></div>
                <div className='demo-content-single-button'><DemoContent question={"Crea un examen de opción múltiple acerca de Bubble Sort en Python"} generateResponse={generateResponse}/></div>
            </div>
            <textarea
                rows="5"
                className="form-control"
                placeholder="Pregunta..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            <button className="btn" onClick={() => generateResponse(newQuestion, setNewQuestion)}>
                Generar respuesta
            </button>
        </div>
    )
}

export default FormSection