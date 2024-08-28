import React, { useState } from 'react';

const QuestionarioForm = ({
  chat,
  userData,
  handleTextInputKeyPress,
  handleUserDataChange,
  handleButtonSubmit,
  errors
}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [cargo, setCargo] = useState('');
  const [industria, setIndustria] = useState('');

  return (
    <div className="mt-4 space-y-2">
      {chat[chat.length - 1]?.texto.includes('nome') && !userData.nome && (
        <div>
          <div className="flex items-center rounded w-full overflow-hidden">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome..."
              onKeyPress={(e) => handleTextInputKeyPress(e, 'nome')}
              className={`border rounded py-2 px-4 w-full ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              onClick={() => {
                handleButtonSubmit('nome', nome);
                setNome(''); 
              }}
              className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
      )}

      {chat[chat.length - 1]?.texto.includes('telefone') && !userData.telefone && (
        <div>
          <div className="flex items-center rounded w-full overflow-hidden">
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite no formato (xx)xxxxx-xxxx"
              onKeyPress={(e) => handleTextInputKeyPress(e, 'telefone')}
              className={`border rounded py-2 px-4 w-full ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              onClick={() => {
                handleButtonSubmit('telefone', telefone);
                setTelefone(''); 
              }}
              className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
        </div>
      )}

      {chat[chat.length - 1]?.texto.includes('email') && !userData.email && (
        <div>
          <div className="flex items-center rounded w-full overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
              onKeyPress={(e) => handleTextInputKeyPress(e, 'email')}
              className={`border rounded py-2 px-4 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              onClick={() => {
                handleButtonSubmit('email', email);
                setEmail(''); 
              }}
              className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      )}

      {chat[chat.length - 1]?.texto.includes('site') && !userData.site && (
        <div>
          <div className="flex items-center rounded w-full overflow-hidden">
            <input
              type="url"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="Digite o site da sua empresa..."
              onKeyPress={(e) => handleTextInputKeyPress(e, 'site')}
              className={`border rounded py-2 px-4 w-full ${errors.site ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              onClick={() => {
                handleButtonSubmit('site', site);
                setSite(''); 
              }}
              className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {errors.site && <p className="text-red-500 text-sm mt-1">{errors.site}</p>}
        </div>
      )}
      {chat[chat.length - 1]?.texto.includes('cargo') && !userData.cargo && (
        <div>
          <div className="flex items-center rounded w-full overflow-hidden">
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Digite seu cargo..."
              onKeyPress={(e) => handleTextInputKeyPress(e, 'cargo')}
              className={`border rounded py-2 px-4 w-full ${errors.cargo ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
              onClick={() => {
                handleButtonSubmit('cargo', cargo);
                setCargo(''); 
              }}
              className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {errors.cargo && <p className="text-red-500 text-sm mt-1">{errors.cargo}</p>}
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
    <div className="flex items-center rounded w-full overflow-hidden">
      <input
        type="text"
        value={industria}
        onChange={(e) => setIndustria(e.target.value)}
        placeholder="Digite o setor da indústria..."
        onKeyPress={(e) => handleTextInputKeyPress(e, 'industria')}
        className={`border rounded py-2 px-4 w-full ${errors.industria ? 'border-red-500' : 'border-gray-300'}`}
      />
      <button
        onClick={() => {
          handleButtonSubmit('industria', industria);
          setIndustria(''); 
        }}
        className="flex-none bg-[#cff000] text-black py-2 px-3 border border-[#cff000] rounded-r"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
    {errors.industria && <p className="text-red-500 text-sm mt-1">{errors.industria}</p>}
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
