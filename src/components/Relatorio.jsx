import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import html2pdf from 'html2pdf.js';

function Relatorio() {
  const location = useLocation();
  const resultados = location.state?.resultados || [];
  const relatorioRef = React.useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); // Novo estado para controlar a geração do PDF

  // Função para definir a largura da barra de progresso
  const calcularLarguraBarra = (media) => {
    if (media >= 7.5) return '100%';
    else if (media >= 5) return '60%';
    else if (media > 2.5) return '31%';
    return '6%';
  };

  // Calcular a média geral da empresa em porcentagem
  const mediaGeral = (resultados.reduce((acc, tema) => acc + tema.media, 0) / resultados.length) * 10;
  const temaMenorMedia = resultados.reduce((min, tema) => (tema.media < min.media ? tema : min), resultados[0]);

  const coresTemas = {
    'Estratégia de Crescimento': '#84b6f4',
    'Cultura de Crescimento': '#77dd77',
    'Operações e Eficiência': '#fdfd96',
    'Marketing e Vendas': '#ff6961',
    'Tecnologia e Inovação': '#a78bfa',
    'Customer Success e Experiência do Cliente': '#fdcae1',
  };

  const dataBar = {
    labels: resultados.map((tema) => tema.tema),
    datasets: [
      {
        label: 'Média por Tema (%)',
        data: resultados.map((tema) => tema.media),
        backgroundColor: resultados.map((tema) => coresTemas[tema.tema] || '#333333'),
      },
    ],
  };

  const optionsBar = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${(context.raw * 10).toFixed(2)}%`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const gerarPDF = () => {
    setIsGeneratingPDF(true); // Começar a gerar PDF
    if (relatorioRef.current) {
      const options = {
        margin: [0, 0, 0, 0], // Margem de 0.5 polegadas em cada lado
        filename: 'Relatorio_diagnostico.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 }, // Aumente a escala para melhorar a qualidade
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(relatorioRef.current).set(options).save().then(() => {
        setIsGeneratingPDF(false); // Retornar a visibilidade após a geração
      });
    } else {
      console.error("Erro: 'relatorioRef' não está apontando para um elemento válido.");
      setIsGeneratingPDF(false); // Garantir que a visibilidade seja restaurada em caso de erro
    }
  };

  return (
    <div className="background flex justify-center p-7">
      <div ref={relatorioRef} className="w-full max-w-4xl">
        <header className="flex justify-center items-center border-0 p-4 rounded-lg mb-8">
          <h1 className="lg:text-5xl font-bold text-gray-800 sm:text-6xl text-center">
            Relatório do Diagnóstico de Growth
          </h1>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div style={{ boxShadow: '0px 0px 40px 1px rgba(0, 0, 0, 0.1)' }} className="bg-opacity-30 bg-white border-0 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Overall da Empresa</h2>
            <p className="flex justify-center text-5xl font-bold text-gray-800 mt-4">{mediaGeral.toFixed(2)}%</p>
            <div className="mt-12 text-gray-800">
              <h3 className="text-lg font-semibold">Ponto de atenção:</h3>
              <p className="font-bold text-xl flex justify-center mt-4">
                {temaMenorMedia.tema}
              </p>
              <p className="mt-4">
                Este é um ponto crucial para o sucesso da sua empresa. Dedicar atenção à {temaMenorMedia.tema} pode ser o diferencial que levará sua equipe a inovar mais, colaborar melhor e, assim, elevar a performance geral.
                Identifique as áreas que precisam de reforço e crie um ambiente onde todos se sintam incentivados a contribuir para o crescimento contínuo.
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
            <div style={{ height: '300px', padding: '12px', margin: '0 auto', maxWidth: '90%' }}>
              <Bar data={dataBar} options={optionsBar} />
            </div>

          </div>

          {resultados.map((tema, index) => (
            <div key={index} style={{ boxShadow: '0px 0px 40px 1px rgba(0, 0, 0, 0.1)' }} className="bg-opacity-30 bg-white border-0 gray-300 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{tema.tema}</h2>
                <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${tema.media >= 7.5 ? 'bg-blue-200 text-blue-800' : tema.media >= 5 ? 'bg-green-200 text-green-800' : tema.media > 2.5 ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                  {tema.media >= 7.5 ? "Let's Growth!" : tema.media >= 5 ? 'Acelerando' : tema.media > 2.5 ? 'Abaixo' : 'Crítico'}
                </span>
              </div>
              <p className="mt-4 text-gray-800">{tema.mensagem}</p>
              <div className="relative pt-4">
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: calcularLarguraBarra(tema.media) }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${tema.media >= 7.5 ? 'bg-blue-500' : tema.media >= 5 ? 'bg-green-500' : tema.media > 2.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
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
        {!isGeneratingPDF && ( // Condicional para esconder o botão e o título durante a geração do PDF
          <>
            <button onClick={gerarPDF} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Baixar Relatório em PDF
            </button>
            <div className="flex flex-col lg:flex-row justify-center mt-16 lg:gap-24 gap-8">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-xl lg:text-4xl font-semibold text-gray-800">
                  Agende agora mesmo um horário com um especialista.
                </h1>
              </div>
              <div className="w-full lg:w-auto flex sm:justify-center">
                <iframe src="https://team.growthagency.com.br/widget/booking/q8iihQ5MnZfqRAHh3KZz" style={{ width: '435px', minHeight: '600px', maxWidth:'500px', border: 'none', overflow: 'hidden' }} scrolling="no" id="q8iihQ5MnZfqRAHh3KZz_1724247485329" title="Calendário de Agendamento da Growth Agency"></iframe>
                <script src="https://team.growthagency.com.br/js/form_embed.js" type="text/javascript"></script>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Relatorio;
