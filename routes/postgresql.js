const router = require("express").Router();
const pool = require("../data/postgresql");

router.get("/:ori&bd", async (req, res) => {

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
    try {
        var time = [];
        var exit = {};
        const nextStage,
        const inicio = Date.now();

        if (req.params.bd) {
            const response = await pool.query('SELECT edad,count(*) FROM ' + req.params.ori + ' group by edad;');
            nextStage = Date.now();
            exit.row = response.rows;
        }
        else
        {
            const response = await pool.query('SELECT edad FROM ' + req.params.ori + ';');
            nextStage = Date.now();
            rows = count(response.rows);
            exit.row = rows;
        }
        
        
        
        time.push("Tiempo que se demoro la consulta de edades: " + (nextStage - inicio).toString() + "[ms]");
        time.push("Tiempo que se demoro el agrupamiento: " + (Date.now() - nextStage).toString() + "[ms]");
        time.push("Tiempo de ejecución total sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
        
        exit.time = time;

        res.send(exit);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;