const router = require("express").Router();
const pool = require("../data/postgresql")

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

    //const response = await pool.query('SELECT * FROM ' + req.params.ori + ';');
    
    const nextStage = Date.now();
    
    //rows = count(response.rows);
    
    time.push("Tiempo que se demoro la consulta de edades: " + (nextStage - inicio).toString() + "[ms]");
    time.push("Tiempo que se demoro el agrupamiento: " + (Date.now() - nextStage).toString() + "[ms]");
    time.push("Tiempo de ejecución total sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
    
    exit.row = rows;
    exit.time = time;

    res.send(exit);
});

module.exports = router;