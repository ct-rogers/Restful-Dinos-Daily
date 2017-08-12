const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();

app.engine("mst", mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let demDinos = [
  {
    id: 1,
    name: "Abelisaurus",
    color: "Gray",
    size: "9m",
    habitats: "Australia",
  },
  {
    id: 2,
    name: "Achelousaurus",
    color: "green",
    size: "6m",
    habitats: "USA",
  },
  {
    id: 3,
    name: "Bambiraptor",
    color: "reddish",
    size: "1m",
    habitats: "USA",
  },
  {
    id: 4,
    name: "Daspletosaurus",
    color: "green",
    size: "9m",
    habitats: "USA, Canada",
  },
]

//dino homepage
app.get('/', (reqest, response) => {
  response.render('index', { demDinos });
});

// GET /api/dinosaurs
app.get("/api/dinos", (request, response) => {
  response.json(demDinos)
});

// GET /api/dinos/:id
app.get("/api/dinos/:id", (request, response) => {
  const dinoId = parseInt(request.params.id)
  const disDino = demDinos.find(dino => {
    return dino.id === dinoId
  });
  response.json(disDino)
});

// GET /api/dinos/habitats/:id
app.get("/api/dinos/habitats/:id", (request, response) => {
  const dinoId = parseInt(request.params.id)
  const disDino = demDinos.find(dino => {
    return dino.id === dinoId
  });
  response.json(disDino.habitats);
});

//POST /api/dinos
app.post("/api/dinos", (request, response) => {
  const newDino = {
    id: demDinos.length + 1,
    name: request.body.name,
    color: request.body.color,
    size: request.body.size,
    habitat: request.body.habitats,
  };
  demDinos.push(newDino)
  response.json(newDino)
});

// PUT /api/dinos/:id
app.put("/api/dinos/:id", (request, response) => {
  const dinoId = parseInt(request.params.id);
  if (dinoId !== demDinos.id) {
    demDinos.push(dinoId);
  };
  response.json(demDinos);
});

// DELETE /api/dinos/:id
app.delete("/api/dinos/:id", (request, response) => {
  const dinoId = parseInt(request.params.id);
  demDinos = demDinos.filter(dino => dino.id !== dinoId)
  response.json(demDinos);
});

app.listen(3000, () => {
  console.log("App is listening on 3000")
})
