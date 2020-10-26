const router = require("express").Router();
const fs = require("fs");

router.get("/:ori", async (req, res) => {

    var count = (rows) => {
        var edades = {};
        rows.forEach(row => {
            if (edades[row.edad]) {
                edades[row.edad]+=1;
            }
            else {
                edades[row.edad] = 1;
            }
        });
        return edades;
    }

    var time = [];
    var exit = {};

    const inicio = Date.now();

    //var texto = fs.readFileSync("test.txt", {encoding:"utf-8"});
    
    //console.log(texto);
    const nextStage = Date.now();
    
    //rows = count(response.rows);
    
    time.push("Tiempo que se demoro la consulta de edades: " + (nextStage - inicio).toString() + "[ms]");
    time.push("Tiempo que se demoro el agrupamiento: " + (Date.now() - nextStage).toString() + "[ms]");
    time.push("Tiempo de ejecución total sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
    
    //exit.row = rows;
    exit.time = time;

    res.send(exit);
});

module.exports = router;