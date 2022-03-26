import type { GetStaticProps, NextPage } from "next";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Hero } from "../types";
import Link from "next/link";

const axios = require("axios").default;

const Home: NextPage<{ heroes: Hero[] }> = ({ heroes }: { heroes: Hero[] }) => {
  console.log({ heroes });
  return (
    <div className="container">
      <h1 className="display-2">Superhero Identity Manager</h1>

      {heroes.map((hero: Hero) => {
        return (
          <MDBCard
            className="border border-2"
            style={{ maxWidth: "22rem" }}
            key={hero._id}
          >
            <MDBCardBody>
              <MDBCardTitle>{hero.superhero}</MDBCardTitle>
              <MDBCardText>Reveal Identity</MDBCardText>
              <Link href="">
                <MDBBtn className="me-2">View Hero</MDBBtn>
              </Link>
              <Link href="">
                <MDBBtn>Edit Hero</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/hero");
  const { heroes }: { heroes: Hero[] } = res.data;
  return {
    props: {
      heroes: heroes,
    },
  };
};

export default Home;

// https://getbootstrap.com/docs/5.0/utilities/spacing/
