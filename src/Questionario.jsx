import React from 'react';
import { useQuestionario } from './hooks/useQuestionario';
import QuestionarioForm from './components/QuestionarioForm';
import ChatBox from './components/ChatBox';
import QuestionarioSteps from './components/QuestionarioSteps';
import logo from './assets/logo.png';
import "./styles/home.css";

function Questionario() {
  const {
    questions,
    userData,
    currentStep,
    currentQuestion,
    chat,
    handleUserDataChange,
    handleTextInputKeyPress,
    handleChange,
    handleButtonSubmit,
    setCurrentStep,
    setCurrentQuestion,
    setChat,
    errors,
    isLoading // Adicione isLoading aqui
  } = useQuestionario();

  return (
    <div className="backgroundQuest relative flex justify-center items-center h-screen">
      <div className="bg-opacity-70 w-full max-w-lg bg-white p-6 rounded-lg border-2 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <img src={logo} alt="Logo da Empresa" className="h-12" />
        </div>
        <ChatBox chat={chat} isLoading={isLoading} /> {/* Passe isLoading aqui */}
        {currentStep === 'coletaDados' && (
          <QuestionarioForm
            chat={chat}
            userData={userData}
            handleTextInputKeyPress={handleTextInputKeyPress}
            handleUserDataChange={handleUserDataChange}
            errors={errors}
            handleButtonSubmit={handleButtonSubmit}
          />
        )}
        <QuestionarioSteps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          questions={questions}
          currentQuestion={currentQuestion}
          handleChange={handleChange}
          setCurrentQuestion={setCurrentQuestion}
          setChat={setChat}
          isLoading={isLoading} // Passe isLoading aqui
        />
      </div>
    </div>
  );
}

export default Questionario;
