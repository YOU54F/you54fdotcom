import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TrelloResult {
  id: string;
  name: string;
  url: string;
  cards: TrelloCard[];
}

interface TrelloCard {
  id: string;
  name: string;
  shortUrl: string;
}

const defaultTrelloResult: TrelloResult = {
  id: "string",
  name: "string",
  url: "https://trello.com/c/O1hqnXW6.html",
  cards: [
    {
      id: "string",
      name: "string",
      shortUrl: "string",
    },
  ],
};

export const TrelloCardComponent = () => {
  const [trelloCards, setTrelloCards] =
    useState<TrelloResult>(defaultTrelloResult);
  useEffect(() => {
    fetch(
      "https://trello.com/1/Boards/otKvOadi?fields=name,url&cards=visible&card_fields=shortUrl%2Cname"
    )
      .then((res) => res.json())
      .then((res: TrelloResult) => setTrelloCards(res));
  }, []);

  const createTrelloCardComponents = (trelloResult: TrelloResult) => {
    const { cards } = trelloResult;
    return cards.map((c) => (
      <TrelloCardIframe
        src={c.shortUrl + ".html"}
        id={c.name}
      ></TrelloCardIframe>
    ));
  };

  return <>{createTrelloCardComponents(trelloCards)}</>;
};

const TrelloCardIframe = styled.iframe`
  height: 50px;
  width: 250px;
  frame-border: 0;
`;
