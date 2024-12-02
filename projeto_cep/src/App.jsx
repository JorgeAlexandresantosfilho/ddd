import { useState, useEffect } from 'react';
import './App.css';
import { FiSearch } from "react-icons/fi";
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

    // UseEffect para limpar o resultado quando o componente for desmontado
    useEffect(() => {

      return () => {
        setCep({});
      };
    }, []);
  

  async function buscar_cep() {
    if (input === "") {
      alert("Você deixou o campo em branco, por favor tente novamente digitando um CEP válido");
      return;
    }
    try {
      // requisicao da api com get
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Opa, deu um erro, aguarde enquanto resolvemos.");
      setInput("");
    }
  }

  return (

    <div className="container">
        <h1>Buscador de CEP</h1>

        <div className="inputgg">
          <input
            className="inp"
            type="text"
            placeholder="Digite seu CEP aqui"
            value={input}
            onChange={(e) => setInput(e.target.value)} />

{/* botao para fazer a pesquisa do cep */}
          <button className="botao" onClick={buscar_cep}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {/* essa funcao serve para ocultar o main ate ter o resultado da aquisicao da api */}
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
      </div>
  );
}

export default App;
