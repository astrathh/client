import React from 'react';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { LinearGradient } from 'react-text-gradients';

function Relatorio() {
  const location = useLocation();
  const resultados = location.state?.resultados || [];

  // Função para definir a largura da barra de progresso
  const calcularLarguraBarra = (media) => {
    if (media >= 7.5) {
      return '100%'; // Let's Growth!
    } else if (media >= 5) {
      return '60%'; // Acelerando
    } else if (media > 2.5) {
      return '31%'; // Abaixo
    } else {
      return '6%'; // Crítico
    }
  };

  // Calcular a média geral da empresa em porcentagem
  const mediaGeral = (resultados.reduce((acc, tema) => acc + tema.media, 0) / resultados.length) * 10;

  // Encontrar o tema com a menor média
  const temaMenorMedia = resultados.reduce((min, tema) => (tema.media < min.media ? tema : min), resultados[0]);

  // Definir cores específicas para cada tema
  const coresTemas = {
    'Estratégia de Crescimento': '#84b6f4', // Azul
    'Cultura de Crescimento': '#77dd77', // Verde
    'Operações e Eficiência': '#fdfd96', // Amarelo
    'Marketing e Vendas': '#ff6961', // Vermelho
    'Tecnologia e Inovação': '#a78bfa', // Roxo
    'Customer Success e Experiência do Cliente': '#fdcae1', // Rosa
  };

  // Dados para o gráfico de pizza
  const dataPie = {
    labels: resultados.map((tema) => tema.tema),
    datasets: [
      {
        data: resultados.map((tema) => tema.media),
        backgroundColor: resultados.map((tema) => coresTemas[tema.tema] || '#333333'), // Cor padrão preta se não encontrar o tema
      },
    ],
  };

  const optionsPie = {
    plugins: {
      legend: {
        display: false, // Desativar a legenda no gráfico
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${(value * 10).toFixed(2)}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="background flex justify-center p-7">
      <div className="w-full max-w-4xl">
        <header className="flex justify-center items-center border-0 p-4 rounded-lg mb-8">
          <h1 className="lg:text-5xl font-bold text-gray-800 sm:text-6xl text-center">
            <LinearGradient gradient={['to right', '#000000, #91a800, #000000']}>
              Relatório do Diagnóstico de Growth
            </LinearGradient>
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div style={{ boxShadow: '0px 0px 40px 1px rgba(0, 0, 0, 0.1)' }} className="bg-opacity-30 bg-white border-0 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Overall da Empresa</h2>
            <p className="flex justify-center text-5xl font-bold text-gray-800 mt-4">{mediaGeral.toFixed(2)}%</p>
            <div className="mt-12 text-gray-800">
              <h3 className="text-lg font-semibold">Ponto de atenção:</h3>
                <p className="font-bold text-xl flex justify-center">
                  <LinearGradient gradient={['to right', '#000000, #91a800']}>
                    {temaMenorMedia.tema}
                  </LinearGradient>
                </p>
              <p className="mt-2">
              Este é um ponto crucial para o sucesso da sua empresa. Dedicar atenção à {temaMenorMedia.tema} pode ser o diferencial que levará sua equipe a inovar mais, colaborar melhor e, assim, elevar a performance geral. Identifique as áreas que precisam de reforço e crie um ambiente onde todos se sintam incentivados a contribuir para o crescimento contínuo.
              </p>
            </div>
          </div>

          <div style={{ boxShadow: '0px 0px 40px 1px rgba(0, 0, 0, 0.1)' }} className="custom-shadow border-0 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribuição das Médias</h2>
            <div className="legend-container mb-6 lg:mb-0">
              <ul className="text-sm lg:text-base">
                {resultados.map((tema, index) => (
                  <li key={index} className="mb-2">
                    <span
                      style={{
                        backgroundColor: coresTemas[tema.tema] || '#333333',
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        marginRight: '8px',
                      }}
                    ></span>
                    {tema.tema}: {(tema.media * 10).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ height: '300px' }}>
              <Pie data={dataPie} options={optionsPie} />
            </div>
          </div>

          {resultados.map((tema, index) => (
            <div key={index} style={{ boxShadow: '0px 0px 40px 1px rgba(0, 0, 0, 0.1)' }}  className="bg-opacity-30 bg-white border-0 gray-300 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{tema.tema}</h2>
                <span
                  className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${
                    tema.media >= 7.5
                      ? 'bg-blue-200 text-blue-800'
                      : tema.media >= 5
                      ? 'bg-green-200 text-green-800'
                      : tema.media > 2.5
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {tema.media >= 7.5
                    ? "Let's Growth!"
                    : tema.media >= 5
                    ? 'Acelerando'
                    : tema.media > 2.5
                    ? 'Abaixo'
                    : 'Crítico'}
                </span>
              </div>
              <p className="mt-4 text-gray-800">{tema.mensagem}</p>
              <div className="relative pt-4">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: calcularLarguraBarra(tema.media) }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      tema.media >= 7.5
                        ? 'bg-blue-500'
                        : tema.media >= 5
                        ? 'bg-green-500'
                        : tema.media > 2.5
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-800">
                  <span>Crítico</span>
                  <span>Abaixo</span>
                  <span>Acelerando</span>
                  <span>Let's Growth!</span>
                </div>
              </div>
            </div>
          ))}
        </main>
        <div className="flex flex-col lg:flex-row justify-center mt-16 lg:gap-24 gap-8">
  <div className="w-full lg:w-1/2 text-center lg:text-left">
    <h1 className="text-xl lg:text-4xl font-semibold text-gray-800">
      Agende <LinearGradient gradient={['to right', '#1f2937, #91a800']}>agora</LinearGradient> mesmo um horário com um especialista.
    </h1>
  </div>
  <div className="w-full lg:w-auto flex sm:justify-center">
    <iframe
      src="https://team.growthagency.com.br/widget/booking/q8iihQ5MnZfqRAHh3KZz"
      style={{ width: '435px', minHeight: '600px', maxWidth:'500px', border: 'none', overflow: 'hidden' }}
      scrolling="no"
      id="q8iihQ5MnZfqRAHh3KZz_1724247485329"
      title="Calendário de Agendamento da Growth Agency"
    ></iframe>
    <br />
    <script
      src="https://team.growthagency.com.br/js/form_embed.js"
      type="text/javascript"
    ></script>
  </div>

        </div>
      </div>
    </div>
  );
}

export default Relatorio;
