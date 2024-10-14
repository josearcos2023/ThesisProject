// import { Configuration, OpenAIApi } from 'openai';

// import FormSection from './components/FormSection';
// import AnswerSection from './components/AnswerSection';
// import Sidebar from './components/Sidebar';
// import { useState } from 'react';
// import './index.css';

// const App = () => {
// 	const configuration = new Configuration({
// 		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// 	});

// 	const openai = new OpenAIApi(configuration);

// 	const [storedValues, setStoredValues] = useState([]);

// 	const generateResponse = async (newQuestion, setNewQuestion) => {
// 		let options = {
// 			model: 'gpt-4o-mini',
// 			messages: [
// 				{ role: 'system', content: 'You are a helpful assistant.' },
// 				{ role: 'user', content: newQuestion },
// 			],
// 			temperature: 0,
// 			max_tokens: 400,
// 			top_p: 1,
// 			frequency_penalty: 0.0,
// 			presence_penalty: 0.0,
// 			stop: ['/'],
// 		};

// 		// let completeOptions = {
// 		// 	...options,
// 		// 	prompt: newQuestion,
// 		// };

// 		// const response = await openai.createChatCompletion(completeOptions);
// 		const response = await openai.createChatCompletion(options);

// 		if (response.data.choices) {
// 			setStoredValues([
// 				{
// 					question: newQuestion,
// 					// answer: response.data.choices[0].text,
// 					answer: response.data.choices[0].message.content,
// 				},
// 				...storedValues,
// 			]);
// 			setNewQuestion('');
// 		}
// 	};

// 	const formatExamText = (examText) => {
// 		const lines = examText.split('\n').filter(line => line.trim() !== '');
// 		const formattedContent = lines.map((line, index) => {
// 		if (line.startsWith('###')) {
// 		// Encabezado Preguntas
// 		return <h3 key={index}>{line.replace('###', '').trim()}</h3>;
// 		} else if (line.startsWith('**Pregunta')) {
// 		// Preguntas
// 		return <p key={index}><strong>{line}</strong></p>;
// 		} else if (line.startsWith('A)') || line.startsWith('B)') || line.startsWith('C)') || line.startsWith('D)')) {
// 		// Opciones respuesta
// 		return <li key={index}>{line}</li>;
// 		} else if (line.startsWith('### Respuestas Correctas')) {
// 		// Encabezado Respuestas
// 		return <h3 key={index}>Respuestas Correctas:</h3>;
// 		} else {
// 		// TD
// 		return <p key={index}>{line}</p>;
// 		}
// 		});

// 		return (
// 		<div>
// 			{formattedContent}
// 		</div>
// 		);
// 	};

// 	return (
// 		<div className="app">
//       <Sidebar /> {/* Sidebar a la izquierda */}
// 			<div className="main-content">
// 				<div className="header-section">
// 					<h1>AI Exams</h1>
// 					{storedValues.length < 1 && (
// 						<p>
// 							Inserte la descripción del examen deseado
// 						</p>
// 					)}
// 				</div>

// 				<FormSection generateResponse={generateResponse} />

// 				{storedValues.length > 0 && <AnswerSection storedValues={storedValues} formatExamText={formatExamText}/>}
// 			</div>
// 		</div>
// 	);
// };

// export default App;

//TEST//
import React, { useState } from 'react';
import axios from 'axios';
// import { Configuration, OpenAIApi } from 'openai';
import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import Sidebar from './components/Sidebar';
import './index.css';

const App = () => {
  const [storedValues, setStoredValues] = useState([]);

  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });

  // const openai = new OpenAIApi(configuration);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    console.log('Sending request with question:', newQuestion);
    try {
      // Primero intentamos usar el backend Flask
      const response = await axios.post('/generate_exam', { prompt: newQuestion });
      const questions = response.data;

      console.log('Response received:', questions);
      setStoredValues([
        {
          question: newQuestion,
          answer: questions
        },
        ...storedValues
      ]);
      setNewQuestion('');
    } catch (error) {
      console.error('Error generating exam with Flask backend:', error);
      // Mostrar un mensaje de error al usuario
      alert('There was an error generating the exam. Please, try again.');

      // Si falla, usamos OpenAI directamente como fallback
      // try {
      //   const openaiResponse = await openai.createChatCompletion({
      //     model: 'gpt-4o-mini',
      //     messages: [
      //       { role: 'system', content: 'You are a helpful assistant.' },
      //       { role: 'user', content: newQuestion },
      //     ],
      //     temperature: 0,
      //     max_tokens: 400,
      //     top_p: 1,
      //     frequency_penalty: 0.0,
      //     presence_penalty: 0.0,
      //   });

      //   if (openaiResponse.data.choices) {
      //     setStoredValues([
      //       {
      //         question: newQuestion,
      //         answer: openaiResponse.data.choices[0].message.content,
      //       },
      //       ...storedValues,
      //     ]);
      //     setNewQuestion('');
      //   }
      // } catch (openaiError) {
      //   console.error('Error generating response with OpenAI:', openaiError);
      //   // Manejar el error apropiadamente (e.g., mostrar un mensaje al usuario)
      // }
    }
  };

  const formatExamQuestions = (questions) => {
    // Si las preguntas vienen del backend Flask, usamos el formato estructurado
    if (Array.isArray(questions)) {
      return (
        <div>
          <h3>Preguntas del examen:</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p><strong>Pregunta {index + 1}:</strong> {question.question_text}</p>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex} style={answer.correct ? {fontWeight: 'bold'} : {}}>
                    {answer.answer_text} {answer.correct ? '(Correcta)' : ''}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      // Si las preguntas vienen directamente de OpenAI, mostramos el texto sin formato
      return <div>{questions}</div>;
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <div className="header-section">
          <h1>AI Exams</h1>
          {storedValues.length < 1 && (
            <p>Inserte la descripción del examen deseado</p>
          )}
        </div>

        <FormSection generateResponse={generateResponse} />

        {storedValues.length > 0 && <AnswerSection storedValues={storedValues} formatExamQuestions={formatExamQuestions} />}
      </div>
    </div>
  );
};

export default App;
