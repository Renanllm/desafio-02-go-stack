import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleListRepositories();
  }, []);

  async function handleListRepositories() {
    const response = await api.get("/repositories");
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      title: `New Repository ${repositories.length + 1}`,
      url: "www.repository.com.br",
      techs: ["tech1", "tech2"]
    });

    setRepositories([...repositories, repository.data]);

    return (
      <li>
        {repository.title}

        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
      </li>
    );
  }

  async function handleRemoveRepository(idRepository) {
    await api.delete(`/repositories/${idRepository}`);

    setRepositories(repositories.filter(repository => repository.id !== idRepository));
  }

  const renderRepositories = (repository) => {
    return (
      <li
        key={repository.id}>
        {repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button>
      </li>
    )
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(renderRepositories)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
