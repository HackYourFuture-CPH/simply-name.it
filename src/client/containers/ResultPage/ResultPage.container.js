import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ResultPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Confetti from '../../components/Confetti/Confetti.component';
import CardElement from '../../components/CandidateCardSingleElement/CandidateCard.component';

export default function Result() {
  const history = useHistory();
  const [viewResults, setViewResults] = useState([]);
  const [error, setError] = useState(false);
  // const { userId, boardId } = useParams();

  const userId = 2;
  const boardId = 1;

  const API_URL = `/api/users/${userId}/boards/${boardId}/results`;
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setViewResults(data);
      })
      .catch((e) => {
        setError(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    const path = '/Home';
    history.push(path);
  };

  return (
    <div className="main-container">
      {error ? (
        <div>Error occurred</div>
      ) : (
        <div className="sub-container">
          <div className="arrow-button-container">
            <ArrowButton
              className="arrow-button"
              onClick={onClick}
              backgroundColor="black"
            />
          </div>
          <PageTitle title="Result" variant="black-large" />
          <Confetti />
          {viewResults.length > 0
            ? viewResults.map((result) => {
                return (
                  <li key={result.id}>
                    <CardElement
                      candidateName={result.name}
                      display="hidden"
                      variant="primary-color"
                      dragdisplay="drag-hidden"
                      position="position"
                    />
                  </li>
                );
              })
            : 'No results found'}
        </div>
      )}
    </div>
  );
}
