import React from 'react';

const QuestionarioForm = ({ chat, userData, handleTextInputKeyPress, handleUserDataChange, errors }) => {
  return (
    <div className="mt-4 space-y-2">
      {chat[chat.length - 1]?.texto.includes('nome') && !userData.nome && (
        <div>
          <input
            type="text"
            placeholder="Digite seu nome..."
            onKeyPress={(e) => handleTextInputKeyPress(e, 'nome')}
            className={`border rounded py-2 px-4 w-full ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('telefone') && !userData.telefone && (
        <div>
          <input
            type="text"
            placeholder="Digite seu telefone no formato (xx)xxxxxxxxx"
            onKeyPress={(e) => handleTextInputKeyPress(e, 'telefone')}
            className={`border rounded py-2 px-4 w-full ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('email') && !userData.email && (
        <div>
          <input
            type="email"
            placeholder="Digite seu email..."
            onKeyPress={(e) => handleTextInputKeyPress(e, 'email')}
            className={`border rounded py-2 px-4 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('site') && !userData.site && (
        <div>
          <input
            type="url"
            placeholder="Digite o site da sua empresa..."
            onKeyPress={(e) => handleTextInputKeyPress(e, 'site')}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          />
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('cargo') && !userData.cargo && (
        <div>
          <input
            type="text"
            placeholder="Digite seu cargo..."
            onKeyPress={(e) => handleTextInputKeyPress(e, 'cargo')}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          />
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('rodadas de investimento') && !userData.rodadaInvestimento && (
        <div>
          <select
            onChange={(e) => handleUserDataChange('rodadaInvestimento', e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          >
            <option value="">Selecione</option>
            <option value="Bootstrap (sem investimento)">Bootstrap (sem investimento)</option>
            <option value="Primeira rodada (Seed)">Primeira rodada (Seed)</option>
            <option value="Série A/B">Série A/B</option>
            <option value="Série C ou acima">Série C ou acima</option>
          </select>
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('funcionários') && !userData.funcionarios && (
        <div>
          <select
            onChange={(e) => handleUserDataChange('funcionarios', e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          >
            <option value="">Selecione</option>
            <option value="1 a 10">1 a 10</option>
            <option value="11 a 50">11 a 50</option>
            <option value="51 a 100">51 a 100</option>
            <option value="Mais de 100">Mais de 100</option>
          </select>
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('indústria') && !userData.industria && (
        <div>
          <input
            type="text"
            placeholder="Digite o setor da indústria..."
            onKeyPress={(e) => handleTextInputKeyPress(e, 'industria')}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          />
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('Ads por mês') && !userData.advertisement && (
        <div>
          <select
            onChange={(e) => handleUserDataChange('advertisement', e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
          >
            <option value="">Selecione</option>
            <option value="Menos de R$1.000">Menos de R$1.000</option>
            <option value="R$1.000 a R$5.000">R$1.000 a R$5.000</option>
            <option value="R$5.000 a R$20.000">R$5.000 a R$20.000</option>
            <option value="Mais de R$20.000">Mais de R$20.000</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default QuestionarioForm;
