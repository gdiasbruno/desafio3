import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, []);


  async function handleAddRepository() {


  const response = await api.post('repositories', {
	 title:`Gal ${ Date.now() }`,
	 url:"https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
	 techs:["Node.js", "..."]
})

  const repository = response.data;

  setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${ id }`);



  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          
        </li>
        {repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
