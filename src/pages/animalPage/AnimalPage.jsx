import React from "react";
import { Container } from "react-bootstrap";
import "./AnimalPage.css";
import animals from '../../assets/images'
import star from "../../assets/svg/star.svg";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
const SINGLE_ANIMAL = gql`
  query ($slug: String!) {
    animal(slug: $slug) {
      image
      title
      stock
      price
      description
    }
  }
`;
const AnimalPage = () => {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(SINGLE_ANIMAL, {
    variables: { slug: slug },
  });
  
  if (loading) return <h4 className="text-center">Loading....</h4>;
  const { image, title, stock, price, description } = data.animal;
  if (error) return <p>Something went wrong</p>;
  
  return (
    <div className="py-5">
      <Container>
        <div className="d-flex">
          <img
            src={animals[image]}
            className="product-img"
            style={{ marginRight: "1rem" }}
            alt="product-img"
          />
          <div className="text-container">
            <h1>{title}</h1>
            <div className="star-container">
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <div className="rating-stock-container">
                <p>1402 rating</p>
                <p>{stock}</p>
              </div>
            </div>
            <div className="about-container">
              <h4>About this Animal</h4>
              {description.map((des, index) => (
                <li key={index}>{des}</li>
              ))}
            </div>
          </div>
          <div className="cart-container border">
            <p className="price">
              <span>CAD$ {price} </span>
            </p>
            <p className="delivery-time">
              FREE delivery: Thursday, Feb 25 Details
              <button className="buy-now-btn" style={{ marginTop: "2rem" }}>
                Add to Cart
              </button>
              <button>Buy Now</button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnimalPage;
