const router = require("express").Router();
const pool = require("../data/postgresql");

router.get("/:ori&:q", async (req, res) => {

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

        const inicio = Date.now();

        if (req.params.q === "bd")
        {
            const response = await pool.query('SELECT edad,count(*) FROM ' + req.params.ori + ' group by edad;');
            
            const nextStage = Date.now();
            
            time.push("Tiempo que se demoro la consulta completa en postgresql: " + (nextStage - inicio).toString() + "[ms]");
            time.push("Tiempo de ejecución total sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
            
            response.time = time;
            
            res.send(response);
        }
        else if (req.params.q === "js")
        {
            var exit = {};

            const response = await pool.query('SELECT edad FROM ' + req.params.ori + ';');
            
            const nextStage = Date.now();
            
            rows = count(response.rows);
                       
            time.push("Tiempo que se demoro la consulta de edades: " + (nextStage - inicio).toString() + "[ms]");
            time.push("Tiempo que se demoro el agrupamiento: " + (Date.now() - nextStage).toString() + "[ms]");
            time.push("Tiempo de ejecución total sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
            
            exit.rows = rows;
            exit.time = time;

            res.send(exit);
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;