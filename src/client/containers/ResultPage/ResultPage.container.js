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
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchingResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onArrowButtonClick = () => {
    const path = '/board';
    history.push(path);
  };

  return (
    <div className="result-container">
      <ArrowButton
        className="arrow-button"
        onClick={onArrowButtonClick}
        color="black"
      />
      <PageTitle title="Result" variant="black-large" />
      <Confetti />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {viewResults.length > 0
            ? viewResults.map((result) => {
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
              })
            : 'No results found'}
        </ul>
      )}
    </div>
  );
}
