import React from "react";
import "./MainHero.css";
import animals from "../../assets/images";
import { Container } from "reactstrap";
import { useQuery, gql } from "@apollo/client";

const MAIN_CARD = gql`
  query {
    mainCards {
      id
      title
      image
    }
  }
`;

function MainHero() {
  const { loading, error, data } = useQuery(MAIN_CARD);

  if (loading) return <h4 className="text-center">Loading....</h4>;

  if (error) return <p>Something went wrong</p>;

  return (
    <div className="MainHero">
      <Container>
        <div className="header-container">
          <h2>
            Find your <br /> new four-legged <br /> best friend
          </h2>
          <img src={animals.rhino} alt=""/>
        </div>
        <div className="cards-container">
          {data.mainCards.map((card) => {
            return (
              <div className="card" key={card.id}>
                <h3>{card.title}</h3>
                <img src={animals[card.image]} style={{ width: "100%" }} alt="" />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default MainHero;
