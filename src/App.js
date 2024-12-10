// //Response in form for back//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import FormSection from './components/FormSection';
// import AnswerSection from './components/AnswerSection';
// import Sidebar from './components/Sidebar';
// import './index.css';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     background: {
//       default: '#1e1e1e',
//       paper: '#2d2d2d',
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#b0b0b0',
//     },
//   },
// });

// const App = () => {
//   const [storedValues, setStoredValues] = useState([]);
//   const [editableQuestions, setEditableQuestions] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/api/courses');
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const generateResponse = async (newQuestion, setNewQuestion) => {
//     console.log('Sending request with question:', newQuestion);
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/generate_exam', { prompt: newQuestion });
//       const questions = response.data;

//       console.log('Response received:', questions);
//       setEditableQuestions(questions);
//       setStoredValues([
//         {
//           question: newQuestion,
//           answer: questions
//         }
//       ]);
//       setNewQuestion('');
//     } catch (error) {
//       console.error('Error generating exam with Flask backend:', error);
//       alert('There was an error generating the exam. Please try again.');
//     }
//   };

//   const handleQuestionEdit = (index, field, value) => {
//     const updatedQuestions = [...editableQuestions];
//     updatedQuestions[index][field] = value;
//     setEditableQuestions(updatedQuestions);
//   };

//   const handleAnswerEdit = (questionIndex, answerIndex, field, value) => {
//     const updatedQuestions = [...editableQuestions];
//     updatedQuestions[questionIndex].answers[answerIndex][field] = value;
//     setEditableQuestions(updatedQuestions);
//   };

//   const handleSubmit = async () => {
//     if (!selectedCourse) {
//       alert('Please select a course before creating the quiz.');
//       return;
//     }
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/create_quiz', {
//         course_id: selectedCourse,
//         questions: editableQuestions
//       });
//       console.log('Quiz created:', response.data);
//       alert('Quiz created successfully!');
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       alert('There was an error creating the quiz. Please try again.');
//     }
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <div className="app">
//         <Sidebar />
//         <Container className="main-content">
//           <Box mb={4} mt={2}>
//             <Typography variant="h4" component="h1" gutterBottom>
//               AI Exams
//             </Typography>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel id="course-select-label">Select Course</InputLabel>
//               <Select
//                 labelId="course-select-label"
//                 id="course-select"
//                 value={selectedCourse}
//                 label="Select Course"
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//               >
//                 {courses.map((course) => (
//                   <MenuItem key={course.id} value={course.id}>
//                     {course.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           <FormSection
//             generateResponse={generateResponse}
//             editableQuestions={editableQuestions}
//             handleQuestionEdit={handleQuestionEdit}
//             handleAnswerEdit={handleAnswerEdit}
//             handleSubmit={handleSubmit}
//           />

//           {storedValues.length > 0 && (
//             <AnswerSection
//               storedValues={storedValues}
//               editableQuestions={editableQuestions}
//               handleQuestionEdit={handleQuestionEdit}
//               handleAnswerEdit={handleAnswerEdit}
//               handleSubmit={handleSubmit}
//             />
//           )}
//         </Container>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default App;


//Probando funcionalidad:
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import FormSection from './components/FormSection';
import AnswerSection from './components/AnswerSection';
import Sidebar from './components/Sidebar';
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

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <Container className="main-content">
          <Box mb={4} mt={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              AI Exams
            </Typography>
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
          </Box>

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
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;