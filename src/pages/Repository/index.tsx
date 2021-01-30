import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiActivity,
  FiInfo,
} from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface IRepositoryParams {
  repository: string;
}

interface IRepository {
  full_name: string;
  description: string;
  id: number;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface IIssue {
  title: string;
  html_url: string;
  id: number;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const [issues, setissues] = useState<IIssue[]>([]);

  const { params } = useRouteMatch<IRepositoryParams>();

  useEffect(() => {
    const loadData = async () => {
      const [repositoryData, issuesData] = await Promise.all([
        api.get<IRepository>(`/repos/${params.repository}`),
        api.get<IIssue[]>(`/repos/${params.repository}/issues`),
      ]);

      console.log(issuesData.data);
      setRepository(repositoryData.data);
      setissues(issuesData.data);
    };

    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository ? (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository?.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>
                <FiStar />
                Stars
              </span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>
                <FiActivity />
                Forks
              </span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>
                <FiInfo />
                Issues abertas
              </span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>No issues found</p>
      )}
      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
