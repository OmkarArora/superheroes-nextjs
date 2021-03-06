import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbconnect";
import Hero from "../../../models/hero";

dbConnect();

// get all records

// post a new record

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const heroes = await Hero.find({});
        res.status(200).json({ success: true, heroes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const hero = await Hero.create(req.body);
        res.status(200).json({ success: true, hero });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
