import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

interface IRepository {
  full_name: string;
  description: string;
  id: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const APPLICATION_PREFIX = '@GithubExplorer';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(``);
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      `${APPLICATION_PREFIX}:repositories`,
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      `${APPLICATION_PREFIX}:repositories`,
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    const storagedRepositories = localStorage.getItem(
      `${APPLICATION_PREFIX}:repositories`,
    );

    try {
      const response = await api.get<IRepository>(`repos/${newRepo}`);

      if (storagedRepositories) {
        const isRepositoryAlreadyExists = (JSON.parse(
          storagedRepositories,
        ) as IRepository[]).find(
          repository => repository.id === response.data.id,
        );
        if (isRepositoryAlreadyExists) {
          setInputError('Repositório já adicionado');
          setNewRepo('');
          return;
        }
      }

      setRepositories([...repositories, response.data]);
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('Repositório inválido');
    }
  }
  return (
    <>
      <img src={logoImg} alt="logo" />
      <Title>Explore repositórios no Github.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />

        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.id}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
