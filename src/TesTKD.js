import React, { useState, useEffect } from 'react';
import './halamansoal.css';
import Navbar from './Navbar';

const Halamansoal = () => {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState();
  // useState Pagination
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const storageKey = 'jawaban';
  // jANGAN DIHAPUS
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // ------------------

  useEffect(() => {
    fetchData();
    // cek apakah jawaban tersimpan di localStorage dan memuatnya jika ada
    const storedJawaban = localStorage.getItem(storageKey);
    if (storedJawaban) {
      setJawaban(JSON.parse(storedJawaban));
    } else {
      setJawaban(Array(soal.length).fill(''));
    }
  }, []);
  useEffect(() => {
    // simpan jawaban ke localStorage setiap kali berubah
    localStorage.setItem(storageKey, JSON.stringify(jawaban));
  }, [jawaban]);

  // Fetch Data dari API
  // JANGAN DIHAPUS
  // const fetchData = async () => {
  //   const response = await fetch('http://localhost:5000/soal');
  //   const data = await response.json();
  //   setSoal(data);
  //   setJawaban(Array(data.length).fill(''));
  // };
  // --------------
  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/soal');
    const data = await response.json();
    setSoal(data);
  };

  // Function untuk merubah jawaban
  const handleJawabanChange = (event) => {
    const { name, value } = event.target;
    const newJawaban = [...jawaban];
    newJawaban[currentQuestion] = value;
    setJawaban(newJawaban);
    console.log(
      `Jawaban pada soal nomor ${
        currentQuestion + 1
      } adalah: ${value}`
    );
  };

  // fUNCTIION SUBMIT JAWABAN
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedAnswer = [...answer];
    updatedAnswer[currentQuestion] =
      jawaban[`question-${currentQuestion}`] || '';
    setAnswer(updatedAnswer);
    setJawaban({ ...jawaban, [`question-${currentQuestion}`]: '' });
    console.log(
      `Jawaban pada soal nomor ${currentQuestion + 1} adalah: ${
        jawaban[currentQuestion]
      }`
    );
  };

  // function untuk ke halaman sebelumnya
  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  // function untuk ke halaman berikutnya
  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

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
                  {/* 
                  <div className="kotak-soal px-2 py-2">
                    {soal[currentQuestion].tipe_soal === 'teks' ? (
                      <p>{soal[currentQuestion].pertanyaan}</p>
                    ) : (
                      <img
                        src={soal[currentQuestion].pertanyaan}
                        alt="gambar soal"
                        className="img-fluid"
                        style={{
                          width: '50%',
                          maxWidth: '500px',
                          marginBottom: '50px',
                        }}
                      />
                    )}  */}
                  <div className="kotak-soal px-2 py-2">
                    {soal[currentQuestion].tipe_soal === 'teks' ? (
                      <p>{soal[currentQuestion].pertanyaan}</p>
                    ) : soal[currentQuestion].pertanyaan ===
                      '' ? null : (
                      <img
                        src={soal[currentQuestion].pertanyaan}
                        alt="gambar soal"
                        className="img-fluid"
                        style={{
                          width: '30%',
                          maxWidth: '500px',
                          marginBottom: '50px',
                        }}
                      />
                    )}
                    <div
                      className={`${
                        soal[currentQuestion].tipe_soal === 'gambar'
                          ? 'd-flex'
                          : ''
                      }`}
                    >
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
                              {soal[currentQuestion].tipe_soal ===
                              'teks' ? (
                                option
                              ) : (
                                <div>
                                  dfdf
                                  <img
                                    src={option}
                                    alt="gambar jawaban"
                                    className="img-fluid"
                                    style={{
                                      width: '20%',
                                      maxWidth: '400px',
                                      display: 'inline',

                                      marginBottom: '50px',
                                    }}
                                  />
                                </div>
                              )}
                            </label>
                          </div>
                        )
                      )}
                    </div>
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
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Halamansoal;
