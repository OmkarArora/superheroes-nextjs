import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactChild, useState } from "react";
const axios = require("axios").default;

function AddHero() {
  const [form, setForm] = useState({
    superhero: "",
    realName: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios("http://localhost:3000/api/hero", {
        method: "POST",
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
        />
        <MDBInput
          className="my-2"
          onChange={handleChange}
          label="Real name"
          type="text"
          name="realName"
        />
        <MDBBtn type="submit">Add new hero</MDBBtn>
      </form>
    </div>
  );
}

export default AddHero;
