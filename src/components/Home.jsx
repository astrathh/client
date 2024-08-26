import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearGradient } from 'react-text-gradients';
import "../styles/home.css"; // Importe o arquivo de estilos
//import GlowButton from '../styles/GlowButton'; // Importe o botão animado

function Home() {
  const navigate = useNavigate();

  const handleStartDiagnosis = () => {
    navigate('/diagnosys');
  };

  return (
    <div className="background relative w-full min-h-screen from-[#ffffff] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center space-y-6 border-spacing-2">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-black">
          Bem-vindo ao
          <br />
          <LinearGradient gradient={['to right', '#cff000, #000000, #cff000']}>
          Diagnóstico de Growth
          </LinearGradient>
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-medium tracking-tight text-black">
          Descubra insights valiosos e maximize
          <br/> o potencial de crescimento da sua empresa
        </p>
        <button onClick={handleStartDiagnosis}
        className="custom-button hover:bg-black hover:text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500"
        prefetch={false ? 'true' : undefined}
        >
          Iniciar diagnóstico
        </button> {/* pra voltar com o GlowButton, é só voltar o import e voltar a classe GlowButton no lugar de button*/}
      </div>
      <footer className="absolute bottom-4 text-center">
        <p>&copy; 2024 Growth Agency. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Home;
