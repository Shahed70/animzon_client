import React from "react";
import "./CategoryDisplay.css";
import { Container } from "react-bootstrap";
import animals from "../../assets/images";

import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY_LIST = gql`
  query {
    categories {
      id
      image
      category
      slug
    }
  }
`;

function CategoryDisplay() {
  const { loading, error, data } = useQuery(CATEGORY_LIST);
  if (loading) return <h4 className="text-center">Loading....</h4>;

  if (error) return <p>Something went wrong</p>;
  return (
    <div className="CategoryDisplay">
      <Container className="CategoryDisplay-container">
        {data.categories.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/products/${category.slug}`}
              className="CategoryDisplay-card-container"
            >
              <div className="CategoryDisplay-card">
                <img src={animals[category.image]} alt=""/>
              </div>
              <h3>{category.category}</h3>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}

export default CategoryDisplay;
