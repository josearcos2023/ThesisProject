// Form section for back//
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
// import { TextField, Button, Box, Typography, Card, CardContent, Radio, FormControlLabel } from '@mui/material';
// import DemoContent from './demoContent';

// const FormSection = ({ generateResponse, editableQuestions, handleQuestionEdit, handleAnswerEdit, handleSubmit }) => {
const FormSection = ({ generateResponse }) => {
    const [newQuestion, setNewQuestion] = useState('');

    return (
        <Box className="form-section">
            {/* <Box className='demo-content-buttons' mb={2} display="flex" justifyContent="space-between">
                <DemoContent question="Crea un examen de opción múltiple acerca de Procedimientos Almacenados" generateResponse={generateResponse}/>
                <DemoContent question="Crea un examen de opción múltiple acerca de ADO.NET" generateResponse={generateResponse}/>
                <DemoContent question="Crea un examen de opción múltiple acerca de Bubble Sort en Python" generateResponse={generateResponse}/>
            </Box> */}
            <TextField
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                placeholder="Pregunta..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={() => generateResponse(newQuestion, setNewQuestion)} fullWidth>
                Generar respuesta
            </Button>

            {/* {editableQuestions.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>Preguntas generadas:</Typography>
                    {editableQuestions.map((question, questionIndex) => (
                        <Card key={questionIndex} sx={{ mb: 2 }}>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label={`Pregunta ${questionIndex + 1}`}
                                    value={question.question_text}
                                    onChange={(e) => handleQuestionEdit(questionIndex, 'question_text', e.target.value)}
                                    margin="normal"
                                />
                                {question.answers.map((answer, answerIndex) => (
                                    <Box key={answerIndex} display="flex" alignItems="center" mt={1}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label={`Respuesta ${answerIndex + 1}`}
                                            value={answer.answer_text}
                                            onChange={(e) => handleAnswerEdit(questionIndex, answerIndex, 'answer_text', e.target.value)}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={answer.correct}
                                                    onChange={() => {
                                                        const updatedAnswers = question.answers.map((a, i) => ({
                                                            ...a,
                                                            correct: i === answerIndex
                                                        }));
                                                        handleQuestionEdit(questionIndex, 'answers', updatedAnswers);
                                                    }}
                                                />
                                            }
                                            label={answer.correct ? "Correcta" : "Incorrecta"}
                                            labelPlacement="end"
                                        />
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                    <Button variant="contained" color="secondary" onClick={handleSubmit} fullWidth>
                        Create Quiz
                    </Button>
                </Box>
            )} */}
        </Box>
    );
};

export default FormSection;