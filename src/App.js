import { Configuration, OpenAIApi } from 'openai';

import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import './index.css';

const App = () => {
	const configuration = new Configuration({
		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const [storedValues, setStoredValues] = useState([]);

	const generateResponse = async (newQuestion, setNewQuestion) => {
		let options = {
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: newQuestion },
			],
			temperature: 0,
			max_tokens: 400,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: ['/'],
		};

		// let completeOptions = {
		// 	...options,
		// 	prompt: newQuestion,
		// };

		// const response = await openai.createChatCompletion(completeOptions);
		const response = await openai.createChatCompletion(options);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					// answer: response.data.choices[0].text,
					answer: response.data.choices[0].message.content,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}
	};

	const formatExamText = (examText) => {
		const lines = examText.split('\n').filter(line => line.trim() !== '');
		const formattedContent = lines.map((line, index) => {
		if (line.startsWith('###')) {
		// Encabezado Preguntas
		return <h3 key={index}>{line.replace('###', '').trim()}</h3>;
		} else if (line.startsWith('**Pregunta')) {
		// Preguntas
		return <p key={index}><strong>{line}</strong></p>;
		} else if (line.startsWith('A)') || line.startsWith('B)') || line.startsWith('C)') || line.startsWith('D)')) {
		// Opciones respuesta
		return <li key={index}>{line}</li>;
		} else if (line.startsWith('### Respuestas Correctas')) {
		// Encabezado Respuestas
		return <h3 key={index}>Respuestas Correctas:</h3>;
		} else {
		// TD
		return <p key={index}>{line}</p>;
		}
		});

		return (
		<div>
			{formattedContent}
		</div>
		);
	};

	return (
		<div className="app">
      <Sidebar /> {/* Sidebar a la izquierda */}
			<div className="main-content">
				<div className="header-section">
					<h1>AI Exams</h1>
					{storedValues.length < 1 && (
						<p>
							Inserte la descripción del examen deseado
						</p>
					)}
				</div>

				<FormSection generateResponse={generateResponse} />

				{storedValues.length > 0 && <AnswerSection storedValues={storedValues} formatExamText={formatExamText}/>}
			</div>
		</div>
	);
};

export default App;
