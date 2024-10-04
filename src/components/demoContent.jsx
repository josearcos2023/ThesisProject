import { useState } from 'react';

const DemoContent = ({ generateResponse, question }) => {
    const [newQuestion, setNewQuestion] = useState('');

    const handleButtonClick = () => {
        setNewQuestion(question);
        generateResponse(newQuestion,setNewQuestion);
    };

    return (
        
        <div>
            <button 
                className='btn-demo-content'
                onClick={handleButtonClick}
            >
                {question}
            </button>
            
        </div>
    )
}
// Comentario prueba
export default DemoContent