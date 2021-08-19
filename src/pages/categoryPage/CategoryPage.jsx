import React from "react";
import { Container } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import animal from "../../assets/images";
import { useParams } from "react-router-dom";

const SINGLE_CATEGORY = gql`
  query ($slug: String!) {
    category(slug: $slug) {
      id
      category
      slug
      image
    }
  }
`;

function CategoryPage() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(SINGLE_CATEGORY, {
    variables: { slug },
  });
  if (loading) return <h4 className="text-center">Loading....</h4>;

  if (error) return <p>Something went wrong</p>;
  return (
    <div className="py-2 d-flex">
      <Container  className="d-flex w-50">
        <div className="text-center">
          <h1 className="text-uppercase">{data.category.category}</h1>
          <img className="img-fluid" src={animal[data.category.image]} alt="" />
          <p className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            fugiat at repudiandae inventore suscipit vel repellendus in debitis
            a, quae nobis rem fuga eum corporis ipsa saepe ex aliquid odit.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default CategoryPage;
