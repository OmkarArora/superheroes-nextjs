import type { GetServerSideProps, NextPage } from "next";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Hero } from "../../types";
import { useRouter } from "next/router";

const axios = require("axios").default;

function HeroView({ hero }: { hero: Hero }) {
  const router = useRouter();
  const heroId = router.query.id;

  const deleteHero = async () => {
    try {
      await axios(`http://localhost:3000/api/hero/${heroId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1 className="display-3">Identity of hero</h1>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{hero.superhero}</MDBCardTitle>
          <MDBCardText>{hero.realName}</MDBCardText>
          <MDBBtn className="btn btn-danger" onClick={deleteHero}>
            Delete Hero
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let id: string | string[] = "";
  if (params && params.id) id = params.id;
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res = await axios.get(`http://localhost:3000/api/hero/${id}`);
  const { hero }: { hero: Hero } = res.data;
  return {
    props: {
      hero: hero,
    },
  };
};

export default HeroView;
