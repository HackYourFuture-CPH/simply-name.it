import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './ResultPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Confetti from '../../components/Confetti/Confetti.component';
import { CardItemDecorator } from '../../components/CandidateCard/CandidateCardItem.component';
import { useUser } from '../../firebase/UserContext';

export default function Result() {
  const history = useHistory();
  const [viewResults, setViewResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const userId = user[0].id;
  const { boardId } = useParams();

  const API_URL = `/api/users/${userId}/boards/${boardId}/results`;
  useEffect(() => {
    const fetchingResults = async () => {
      try {
        const apiResponse = await fetch(API_URL);
        const apiData = await apiResponse.json();
        setViewResults(apiData);
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };
    fetchingResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onArrowButtonClick = () => {
    const path = `/boards/${boardId}`;
    history.push(path);
  };

  return (
    <div className="result-container">
      <ArrowButton
        className="arrow-button"
        onClick={onArrowButtonClick}
        color="black"
      />
      {error ? (
        <p className="display-message">{error.message}</p>
      ) : (
        <div>
          <PageTitle title="Result" variant="black-large" />
          {isLoading ? (
            <h3>Loading...</h3>
          ) : (
            <div>
              {viewResults.length > 0 ? (
                <ul>
                  <Confetti />
                  {viewResults.map((result) => {
                    return (
                      <li key={result.id}>
                        <CardItemDecorator
                          colorVariant="primary-color"
                          candidateName={result.name}
                          displayDeleteIcon="hidden"
                          showDots={false}
                          textAlignCenter={true}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="display-message">No results found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
