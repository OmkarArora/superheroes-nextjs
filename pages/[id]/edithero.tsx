import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { Hero } from "../../types";

const axios = require("axios").default;

function EditHero({ hero }: { hero: Hero }) {
  const [form, setForm] = useState({
    superhero: hero.superhero,
    realName: hero.realName,
  });

  const router = useRouter();
  const heroId = router.query.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios(`${process.env.NEXT_PUBLIC_URL}/api/hero/${heroId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1 className="display-3">Add a new hero identity</h1>
      <form onSubmit={handleForm}>
        <MDBInput
          onChange={handleChange}
          label="Super Hero"
          type="text"
          name="superhero"
          value={form.superhero}
        />
        <MDBInput
          className="my-2"
          onChange={handleChange}
          label="Real name"
          type="text"
          name="realName"
          value={form.realName}
        />
        <MDBBtn type="submit">Confirm</MDBBtn>
      </form>
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
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/hero/${id}`);
  const { hero }: { hero: Hero } = res.data;
  return {
    props: {
      hero: hero,
    },
  };
};
export default EditHero;
