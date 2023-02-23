import React, { useState, useEffect } from 'react';
import './halamansoal.css';

const Halamansoal = () => {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/soal');
    const data = await response.json();
    setSoal(data);
    setJawaban(Array(data.length).fill(''));
  };

  const handleJawabanChange = (event) => {
    const { name, value } = event.target;
    const newJawaban = [...jawaban];
    newJawaban[currentQuestion] = value;
    setJawaban(newJawaban);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const updatedAnswer = [...answer];
  //   updatedAnswer[currentQuestion] =
  //     jawaban[`question-${currentQuestion}`] || '';
  //   setAnswer(updatedAnswer);
  //   setJawaban({ ...jawaban, [`question-${currentQuestion}`]: '' });
  // };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  function isAnswered(questionIndex) {
    return (
      answer[currentQuestion] !== undefined &&
      answer[currentQuestion] !== ''
    );
  }

  const handleClearAnswer = () => {
    const newJawaban = [...jawaban];
    newJawaban[currentQuestion] = '';
    setJawaban(newJawaban);

    const newAnswer = [...answer];
    newAnswer[currentQuestion] = '';
    setAnswer(newAnswer);

    const nomorSoal = document.getElementsByClassName('nomor-soal');
    for (let i = 0; i < nomorSoal.length; i++) {
      if (newJawaban[i] !== '') {
        nomorSoal[i].classList.add('terisi');
        nomorSoal[i].classList.remove('kosong');
      } else {
        nomorSoal[i].classList.add('kosong');
        nomorSoal[i].classList.remove('terisi');
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 kotak-soal">
            {soal.length > 0 && (
              <form>
                <p>{soal[currentQuestion].petunjuk}</p>
                <p>
                  <b>Jenis Tes:</b> {soal[currentQuestion].jenis}
                </p>
                <b>Nomor {currentQuestion + 1} :</b>
                <p>{soal[currentQuestion].pertanyaan}</p>
                {soal[currentQuestion].jawaban.map(
                  (option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        id={`option-${optionIndex}`}
                        name={`jawaban-${currentQuestion}`}
                        value={option}
                        checked={
                          jawaban[`jawaban-${currentQuestion}`] ===
                          option
                        }
                        onChange={handleJawabanChange}
                      />

                      <label htmlFor={`option-${optionIndex}`}>
                        {option}
                      </label>
                    </div>
                  )
                )}
                <div className="button-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={currentQuestion === soal.length - 1}
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClearAnswer}
                    disabled={
                      jawaban[`question-${currentQuestion}`] === ''
                    }
                  >
                    Clear
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="col-6">
            <div className="panel-soal">
              <h5>Daftar Soal</h5>
              {soal.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className={`nomor-soal ${
                    jawaban[index] !== '' ? 'terisi' : 'kosong'
                  } ${currentQuestion === index ? 'current' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Halamansoal;
