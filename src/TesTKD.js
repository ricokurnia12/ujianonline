import React, { useState, useEffect } from 'react';
import './halamansoal.css';
import Navbar from './Navbar';

const Halamansoal = () => {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState();
  // useState Pagination
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data dari API

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/soal');
    const data = await response.json();
    setSoal(data);
    setJawaban(Array(data.length).fill(''));
  };

  // Function untuk merubah jawaban
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

  // function untuk ke halaman sebelumnya
  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  // function untuk ke halaman berikutnya
  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  // function isAnswered(questionIndex) {
  //   return (
  //     answer[currentQuestion] !== undefined &&
  //     answer[currentQuestion] !== ''
  //   );
  // }

  // Function untuk merubah jawaban
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
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="mb-4 col-12 col-md-8 container-soal px-3 py-3 me-2 ">
            {soal.length > 0 && (
              <form>
                <div className="">
                  <p>
                    <b>Petunjuk : </b>
                    {soal[currentQuestion].petunjuk}
                  </p>
                  <p>
                    <b>Jenis Tes:</b> {soal[currentQuestion].jenis}
                  </p>
                  <b>Nomor {currentQuestion + 1} :</b>

                  <div className="kotak-soal px-2 py-2">
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
                              jawaban[currentQuestion] === option
                            }
                            onChange={handleJawabanChange}
                          />
                          <label htmlFor={`option-${optionIndex}`}>
                            {option}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                  >
                    Sebelumnya
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClearAnswer}
                    disabled={jawaban[currentQuestion] === ''}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={currentQuestion === soal.length - 1}
                  >
                    Selanjutnya
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="mb-4 col-md-2 kotak-soal bg-light">
            <div className="panel-soal">
              <h5>Daftar Soal</h5>
              <div className="d-flex justify-content-evenly flex-wrap">
                {soal.map((quiz, index) => (
                  <div
                    key={quiz.id}
                    className={`nomor-soal ${
                      jawaban[index] !== ''
                        ? 'terisi text-center'
                        : 'kosong text-center'
                    } ${currentQuestion === index ? 'current' : ''}`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Halamansoal;
