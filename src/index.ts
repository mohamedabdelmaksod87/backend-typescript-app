import express from "express";
import { CreateTeaRequest, UpdateTeaRequest, Tea } from "./types";

const app = express();
const port = 3000;

app.use(express.json());

let teaDb: Tea[] = [];
let nextId = 1;

app.post("/teas", (req: CreateTeaRequest, res) => {
  const newTea: Tea = {
    id: nextId++,
    name: req.body.name,
    price: Number(req.body.price),
  };
  teaDb.push(newTea);
  res.status(201).json({ newTea });
});

app.get("/teas", (req, res) => {
  res.status(200).json(teaDb);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaDb.find((tea) => tea.id === Number(req.params.id));
  if (!tea) return res.sendStatus(404);
  res.status(200).json(tea);
});

app.put("/teas/:id", (req: UpdateTeaRequest, res) => {
  const tea = teaDb.find((tea) => tea.id === Number(req.params.id));
  if (!tea) return res.sendStatus(404);
  tea.name = req.body.name;
  tea.price = Number(req.body.price);
  res.status(200).json(tea);
});

app.delete("/teas/:id", (req, res) => {
  const index = teaDb.findIndex((tea) => tea.id === Number(req.params.id));
  if (index < 0) return res.sendStatus(404);
  teaDb.splice(index, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server Listening On Port ${port}`);
});
