import React from "react";
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import CategoryDisplay from "../../components/CategoryDisplay/CategoryDisplay";
import MainHero from "../../components/MainHero/MainHero";
import { useQuery, gql, useMutation } from "@apollo/client";

const ALL_ANIMAL = gql`
  query {
    animals {
      id
      image
      title
      rating
      price
      description
      slug
      stock
      onSale
    }
  }
`;

const ADD_ANIMAL_MUTATION = gql`
  mutation (
    $image: String!
    $category: String!
    $title: String!
    $stock: Int!
    $price: String!
    $description: [String!]!
    $rating: Float
    $slug: String!
  ) {
    addAnimal(
      image: $image
      category: $category
      title: $title
      stock: $stock
      price: $price
      description: $description
      rating: $rating
      slug: $slug
    ) {
      id
    }
  }
`;

function LandingPage() {
  const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);
  const { loading, error, data } = useQuery(ALL_ANIMAL);
  if (loading) return <h4 className="text-center">Loading....</h4>;

  if (error) return <p>Something went wrong</p>;
  return (
    <div>
      <MainHero />
      <CategoryDisplay />
      <CardDisplay animals={data.animals} />
      <div className="d-flex justify-content-center my-3">
        <button
        className="btn btn-secondary"
          onClick={() => {
            addAnimal({
              variables: {
                image: "ostrich",
                category: "1",
                title: "This is a really cool ostrich",
                stock: 13,
                price: "32,333",
                description: ["das"],
                rating: 3.5,
                slug: "ostrich",
              },
            });
          }}
        >
          Add an Ostrich
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
