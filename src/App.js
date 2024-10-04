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
			temperature: 0,
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: ['/'],
		};

		let completeOptions = {
			...options,
			prompt: newQuestion,
		};

		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}
	};

	return (
		<div className="app">
      <Sidebar /> {/* Sidebar a la izquierda */}
			<div className="main-content">
				<div className="header-section">
					<h1>AI Exam</h1>
					{storedValues.length < 1 && (
						<p>
							Inserte la descripción del examen deseado
						</p>
					)}
				</div>

				<FormSection generateResponse={generateResponse} />

				{storedValues.length > 0 && <AnswerSection storedValues={storedValues} />}
			</div>
		</div>
	);
};

export default App;
