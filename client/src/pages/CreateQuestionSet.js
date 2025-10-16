import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './CreateQuestionSet.css';

function CreateQuestionSet({ user }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', answers: ['', '', '', ''], correct: 0 }
  ]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''], correct: 0 }]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateAnswer = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/question-sets', {
        title,
        subject,
        questions,
        createdBy: user.username
      });
      
      alert('Question set created successfully!');
      navigate('/teacher');
    } catch (error) {
      console.error('Error creating question set:', error);
      alert('Failed to create question set');
    }
  };

  return (
    <div className="create-set-page">
      <div className="create-set-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="page-header">
            <button onClick={() => navigate('/teacher')} className="back-btn">
              ← Back
            </button>
            <h1>Create Question Set</h1>
          </div>

          <form onSubmit={handleSubmit} className="create-set-form">
            <div className="card">
              <h2 className="card-header">Basic Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Basic Algebra"
                    required
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="input-field"
                  >
                    <option value="">Select subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="English">English</option>
                    <option value="Geography">Geography</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="questions-section">
              <div className="section-header">
                <h2>Questions</h2>
                <button type="button" onClick={addQuestion} className="button button-success">
                  + Add Question
                </button>
              </div>

              {questions.map((q, qIndex) => (
                <motion.div
                  key={qIndex}
                  className="question-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: qIndex * 0.1 }}
                >
                  <div className="question-header">
                    <span className="question-number">Question {qIndex + 1}</span>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Question</label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      placeholder="Enter your question"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="answers-grid">
                    {q.answers.map((answer, aIndex) => (
                      <div key={aIndex} className="answer-item">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                          placeholder={`Answer ${aIndex + 1}`}
                          required
                          className="input-field"
                        />
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correct === aIndex}
                            onChange={() => updateQuestion(qIndex, 'correct', aIndex)}
                          />
                          <span>Correct</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <button type="submit" className="button button-primary submit-btn">
              Create Question Set
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateQuestionSet;

