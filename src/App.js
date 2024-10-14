//Version anterior de App.js:
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


//Respuesta en form para back//
import React, { useState } from 'react';
import axios from 'axios';
import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import Sidebar from './components/Sidebar';
import './index.css';

const App = () => {
  const [storedValues, setStoredValues] = useState([]);
  const [editableQuestions, setEditableQuestions] = useState([]);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    console.log('Sending request with question:', newQuestion);
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_exam', { prompt: newQuestion });
      const questions = response.data;

      console.log('Response received:', questions);
      setEditableQuestions(questions);
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
      alert('There was an error generating the exam. Please try again.');
    }
  };

  const handleQuestionEdit = (index, field, value) => {
    const updatedQuestions = [...editableQuestions];
    updatedQuestions[index][field] = value;
    setEditableQuestions(updatedQuestions);
  };

  const handleAnswerEdit = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...editableQuestions];
    updatedQuestions[questionIndex].answers[answerIndex][field] = value;
    setEditableQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/create_quiz', {
        course_id: "10476777", //Hardcoded course_id
        questions: editableQuestions
      });
      console.log('Quiz created:', response.data);
      alert('Quiz created successfully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('There was an error creating the quiz. Please try again.');
    }
  };

  const formatExamQuestions = (questions) => {
    return (
      <div>
        <h3>Preguntas del examen:</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              value={question.question_text}
              onChange={(e) => handleQuestionEdit(index, 'question_text', e.target.value)}
            />
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  <input
                    type="text"
                    value={answer.answer_text}
                    onChange={(e) => handleAnswerEdit(index, answerIndex, 'answer_text', e.target.value)}
                  />
                  <input
                    type="radio"
                    checked={answer.correct}
                    onChange={() => {
                      const updatedAnswers = question.answers.map((a, i) => ({
                        ...a,
                        correct: i === answerIndex
                      }));
                      handleQuestionEdit(index, 'answers', updatedAnswers);
                    }}
                  />
                  Correct
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={handleSubmit}>Create Quiz</button>
      </div>
    );
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

        {editableQuestions.length > 0 && formatExamQuestions(editableQuestions)}

        {storedValues.length > 0 && <AnswerSection storedValues={storedValues} formatExamQuestions={formatExamQuestions} />}
      </div>
    </div>
  );
};

export default App;