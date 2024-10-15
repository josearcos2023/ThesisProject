// Response in form for back//
import React from 'react';
import { Box, Typography, Card, CardContent, TextField, Radio, FormControlLabel, Button } from '@mui/material';

const AnswerSection = ({ storedValues, editableQuestions, handleQuestionEdit, handleAnswerEdit, handleSubmit }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" gutterBottom>Respuesta generada:</Typography>
            <Card>
                <CardContent>
                    <Typography variant="body1" gutterBottom><strong>Prompt:</strong> {storedValues[0].question}</Typography>
                    {editableQuestions.map((question, questionIndex) => (
                        <Box key={questionIndex} mt={2}>
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
                        </Box>
                    ))}
                    <Box mt={2}>
                        <Button variant="contained" color="secondary" onClick={handleSubmit} fullWidth>
                            Create Quiz
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AnswerSection;