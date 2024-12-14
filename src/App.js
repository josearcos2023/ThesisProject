// Response in form for back//
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CssBaseline, ThemeProvider, createTheme, TextField, Button } from '@mui/material';
import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
// import Sidebar from './components/Sidebar';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e',
      paper: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

const App = () => {
  const [storedValues, setStoredValues] = useState([]);
  const [editableQuestions, setEditableQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');

  // Constantes TEST
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySubmitted, setIsApiKeySubmitted] = useState(false);

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  // const fetchCourses = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:5000/api/courses');
  //     setCourses(response.data);
  //   } catch (error) {
  //     console.error('Error fetching courses:', error);
  //   }
  // };

  const generateResponse = async (newQuestion, setNewQuestion) => {
    console.log('Sending request with question:', newQuestion);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/generate_exam', { prompt: newQuestion });
      const data = response.data;

      console.log('Response received:', data);
      // Update state with the new data structure
      setQuizTitle(data.title);
      setQuizDescription(data.description);
      setEditableQuestions(data.questions || []); // Ensure it's an array
      setStoredValues([
        {
          question: newQuestion,
          answer: data.questions || []
        }
      ]);
      setNewQuestion('');
    } catch (error) {
      console.error('Error generating exam with Flask backend:', error);
      alert('There was an error generating the exam. Please try again.');
    }
  };

  // Manejo de API Key
  const handleApiKeySubmit = async (e) => {
    e.preventDefault();
    try {
      // First, send the API key
      // await axios.post('http://127.0.0.1:5000/api/keys', { apikey: apiKey });

      // Primer endpoint con api_key TEST
      // await axios.post('http://127.0.0.1:5000/api/keys', { api_key: apiKey });

      // Then fetch courses with the API key
      // const response = await axios.post('http://127.0.0.1:5000/api/courses', { api_key: apiKey });

      // Segundo endpoint también con api_key TEST
      const response = await axios.post('http://127.0.0.1:5000/api/courses', { api_key: apiKey });
      setCourses(response.data);
      setIsApiKeySubmitted(true);
    } catch (error) {
      console.error('Error submitting API key:', error);
      alert('Error submitting API key. Please try again.');
    }
  };

  const handleQuestionEdit = (index, field, value) => {
    if (index === -1) {
      // Manejo especial para título y descripción
      if (field === 'title') {
        setQuizTitle(value);
      } else if (field === 'description') {
        setQuizDescription(value);
      }
      return;
    }
    // Manejo existente para preguntas
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
    if (!selectedCourse) {
      alert('Please select a course before creating the quiz.');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/create_quiz', {
        course_id: selectedCourse,
        title: quizTitle,
        description: quizDescription,
        questions: editableQuestions
      });
      console.log('Quiz created:', response.data);
      alert('Quiz created successfully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('There was an error creating the quiz. Please try again.');
    }
  };

  // Return the main component
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        {/* <Sidebar /> */}
        <Container className="main-content">
          <Box mb={4} mt={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              AI Exams
            </Typography>

            {!isApiKeySubmitted ? (
              <Box mb={4}>
                <form onSubmit={handleApiKeySubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Canvas API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    margin="normal"
                    type="password"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Submit API Key
                  </Button>
                </form>
              </Box>
            ) : (
              <>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="course-select-label">Select Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    value={selectedCourse}
                    label="Select Course"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormSection
                  generateResponse={generateResponse}
                  editableQuestions={editableQuestions}
                  handleQuestionEdit={handleQuestionEdit}
                  handleAnswerEdit={handleAnswerEdit}
                  handleSubmit={handleSubmit}
                />

                {storedValues.length > 0 && Array.isArray(editableQuestions) && editableQuestions.length > 0 && (
                  <AnswerSection
                    storedValues={storedValues}
                    editableQuestions={editableQuestions}
                    handleQuestionEdit={handleQuestionEdit}
                    handleAnswerEdit={handleAnswerEdit}
                    handleSubmit={handleSubmit}
                    quizTitle={quizTitle}
                    quizDescription={quizDescription}
                  />
                )}
              </>
            )}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;