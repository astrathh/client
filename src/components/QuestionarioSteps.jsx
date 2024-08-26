import React from 'react';

const QuestionarioSteps = ({ currentStep, setCurrentStep, questions, currentQuestion, handleChange, setCurrentQuestion, setChat }) => {
  return (
    <>
      {currentStep === 'introducao' && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setCurrentStep('questionario');
                setCurrentQuestion({ temaIndex: 0, perguntaIndex: 0 });
                setChat((prevChat) => [
                  ...prevChat,
                  { tipo: 'pergunta', texto: questions[0].perguntas[0].pergunta }
                ]);
              }}
              className="bg-[#cff000] hover:bg-[#e0ff4f] text-black font-bold py-2 px-4 rounded"
            >
              Iniciar Questionário
            </button>
          </div>
        )}

      {currentStep === 'questionario' && (
                <div className="flex flex-col mt-4 space-y-2">
                  {questions[currentQuestion.temaIndex].perguntas[currentQuestion.perguntaIndex].respostas.map(
                    (resposta, respostaIndex) => (
                      <button
                        key={respostaIndex}
                        onClick={() =>
                          handleChange(
                            currentQuestion.temaIndex,
                            currentQuestion.perguntaIndex,
                            resposta.texto,
                            resposta.valor
                          )
                        }
                        className="bg-[#cff000] hover:bg-[#e0ff4f] text-black font-bold py-2 px-4 rounded w-full"
                      >
                        {resposta.texto}
                      </button>
                    )
                  )}
                </div>
        )}
    </>
  );
};

export default QuestionarioSteps;
