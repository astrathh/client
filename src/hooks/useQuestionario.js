import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useQuestionario = () => {
  const [questions, setQuestions] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [userData, setUserData] = useState({
    nome: '',
    telefone: '',
    email: '',
    site: '',
    cargo: '',
    rodadaInvestimento: '',
    funcionarios: '',
    industria: '',
    advertisement: ''
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState('coletaDados');
  const [currentQuestion, setCurrentQuestion] = useState({ temaIndex: 0, perguntaIndex: 0 });
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://server-chi-sandy.vercel.app/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        iniciarChat();
      });
  }, []);

  const iniciarChat = () => {
    setChat([{ tipo: 'pergunta', texto: 'Bem-vindo ao Diagnóstico de Growth. Antes de iniciarmos, preciso saber um pouco mais sobre você. Primeiro, me diga seu nome.' }]);
  };

  const handleUserDataChange = (field, value) => {
    let errorMessage = '';

    // Validações
    if (field === 'nome' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um nome válido (apenas letras).';
    }
    if (field === 'telefone' && !/^\d{10,11}$/.test(value)) {
      errorMessage = 'Por favor, insira um telefone válido (10 ou 11 dígitos).';
    }
    if (field === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      errorMessage = 'Por favor, insira um email válido.';
    }
    if (field === 'site' && !/^[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value)) {
      errorMessage = 'Por favor, insira uma URL válida para o site.';
    } 
    if (field === 'cargo' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um cargo válido (apenas letras).';
    }
    if (field === 'industria' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um setor válido (apenas letras).';
    }
    

    // Atualizar estado de erro
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));

    if (!errorMessage) {
      setUserData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
      avancarColetaDados(field, value);
    }
  };

  const avancarColetaDados = (field, value) => {
    let novaPergunta = '';

    if (field === 'nome') {
      novaPergunta = 'Qual o seu telefone? (com DDD)';
    } else if (field === 'telefone') {
      novaPergunta = 'Qual o seu email?';
    } else if (field === 'email') {
      novaPergunta = 'Qual o site da sua empresa?';
    } else if (field === 'site') {
      novaPergunta = 'Qual o seu cargo?';
    } else if (field === 'cargo') {
      novaPergunta = 'Qual estágio da sua empresa em relação a rodadas de investimento?';
    } else if (field === 'rodadaInvestimento') {
      novaPergunta = 'Quantos funcionários sua empresa possui?';
    } else if (field === 'funcionarios') {
      novaPergunta = 'Em qual indústria a empresa atua?';
    } else if (field === 'industria') {
      novaPergunta = 'Quanto, em média, sua empresa investe em Ads por mês? (Em reais)';
    } else if (field === 'advertisement') {
      setCurrentStep('introducao');
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'resposta', texto: value },
        { tipo: 'info', texto: 'Obrigado! Agora, reserve entre 7-10 minutos para fazer o questionário com calma. Vamos começar!' }
      ]);
      return;
    }

    if (novaPergunta) {
      setChat((prevChat) => [
        ...prevChat,
        { tipo: 'resposta', texto: value },
        { tipo: 'pergunta', texto: novaPergunta }
      ]);
    }
  };

  const handleTextInputKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      handleUserDataChange(field, e.target.value);
      e.target.value = '';
    }
  };

  const handleButtonSubmit = (field, value) => {
    let errorMessage = '';
  
    // Validações (igual ao que já é feito no handleUserDataChange)
    if (field === 'nome' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um nome válido (apenas letras).';
    }
    if (field === 'telefone' && !/^\d{10,11}$/.test(value)) {
      errorMessage = 'Por favor, insira um telefone válido (10 ou 11 dígitos).';
    }
    if (field === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      errorMessage = 'Por favor, insira um email válido.';
    }
    if (field === 'site' && !/^[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(value)) {
      errorMessage = 'Por favor, insira uma URL válida para o site.';
    }    
    if (field === 'cargo' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um cargo válido (apenas letras).';
    }
    if (field === 'industria' && !/^[a-zA-Z\s]+$/.test(value)) {
      errorMessage = 'Por favor, insira um setor válido (apenas letras).';
    }
  
    // Se houver um erro, atualiza o estado de erro e não prossegue
    if (errorMessage) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
      return;
    }
  
    // Se não houver erro, prossegue com o fluxo de coleta de dados
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  
    avancarColetaDados(field, value);
  };

  const handleChange = (temaIndex, perguntaIndex, respostaTexto, valor) => {
    setRespostas((prevRespostas) => {
      const novasRespostas = [...prevRespostas];
      if (!novasRespostas[temaIndex]) {
        novasRespostas[temaIndex] = [];
      }
      novasRespostas[temaIndex][perguntaIndex] = valor;
      return novasRespostas;
    });

    setChat((prevChat) => [...prevChat, { tipo: 'resposta', texto: respostaTexto }]);
    avancarParaProximaPergunta(temaIndex, perguntaIndex);
  };

  const avancarParaProximaPergunta = (temaIndex, perguntaIndex) => {
    setTimeout(() => {
      if (perguntaIndex + 1 < questions[temaIndex].perguntas.length) {
        setCurrentQuestion({ temaIndex, perguntaIndex: perguntaIndex + 1 });
        setChat((prevChat) => [
          ...prevChat,
          { tipo: 'pergunta', texto: questions[temaIndex].perguntas[perguntaIndex + 1].pergunta }
        ]);
      } else if (temaIndex + 1 < questions.length) {
        setCurrentQuestion({ temaIndex: temaIndex + 1, perguntaIndex: 0 });
        setChat((prevChat) => [
          ...prevChat,
          { tipo: 'pergunta', texto: questions[temaIndex + 1].perguntas[0].pergunta }
        ]);
      } else {
        enviarDadosParaWebhook();
        fetch('https://server-chi-sandy.vercel.app/api/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ respostas })
        })
          .then(response => {
            // Verifica se a resposta é JSON antes de tentar fazer o parse
            if (!response.ok) {
              // Lida com respostas de erro (status não 2xx)
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              return response.json();
            } else {
              throw new Error('A resposta não é JSON');
            }
          })
          .then(data => {
            navigate('/relatorio', { state: { resultados: data } });
          })
          .catch(error => {
            console.error('Erro ao processar a requisição:', error);
            // Tratar o erro adequadamente, como mostrar uma mensagem de erro ao usuário
          });
      }
    }, 1000);
  };

  const enviarDadosParaWebhook = async () => {
    const dadosParaEnviar = {
      ...userData,
      respostas: respostas
    };

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/oFTw9DcsKRUj6xCiq4mb/webhook-trigger/f22cd208-907d-484c-a1ac-2959a5b82cfd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso para o webhook!');
      } else {
        console.error('Erro ao enviar dados para o webhook');
      }
    } catch (error) {
      console.error('Erro na requisição ao webhook', error);
    }
  };

  return {
    questions,
    respostas,
    userData,
    currentStep,
    currentQuestion,
    chat,
    handleUserDataChange,
    handleTextInputKeyPress,
    handleButtonSubmit,
    handleChange,
    avancarParaProximaPergunta,
    enviarDadosParaWebhook,
    setCurrentStep,
    setCurrentQuestion,
    setChat,
    errors
  };
};
