import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateQuestionSet.css';

function CreateQuestionSet({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', answers: ['', '', '', ''], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''], correct: 0 }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateAnswer = (qIndex, aIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex] = value;
    setQuestions(updated);
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
      alert('Question set created!');
      navigate('/teacher-dashboard');
    } catch (error) {
      alert('Failed to create question set');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>📝 Create Question Set</h1>
        <form onSubmit={handleSubmit} className="card">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            required
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="question-block">
              <h3>Question {qIndex + 1}</h3>
              <input
                type="text"
                placeholder="Question text"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                className="input"
                required
              />
              {q.answers.map((answer, aIndex) => (
                <div key={aIndex} className="answer-row">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct === aIndex}
                    onChange={() => updateQuestion(qIndex, 'correct', aIndex)}
                  />
                  <input
                    type="text"
                    placeholder={`Answer ${aIndex + 1}`}
                    value={answer}
                    onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                    className="input"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="button button-secondary">
            Add Question
          </button>
          <button type="submit" className="button button-primary">
            Create Set
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuestionSet;
