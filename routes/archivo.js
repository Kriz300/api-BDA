const router = require("express").Router();
const readline = require('readline');
const fs = require("fs");

router.get("/:ori", async (req, res) => {

    var time = [];
    var exit = {};

    var count = async (rl) => {
        var edad;
        var edades = {};
        for await (const line of rl) {
            if (line) {
                edad = parseInt(line.split("|")[2]);
                if (edades[edad]) {
                    edades[edad]+=1;
                }
                else {
                    edades[edad] = 1;
                }
            }
        }
        return edades;
    }

    const inicio = Date.now();

    var file = './data/' + req.params.ori;


    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    var rows = await count(rl);
    
    time.push("Tiempo de lectura y agrupamiento sin contar el 'printeo': " + (Date.now() - inicio).toString() + "[ms]");
    
    exit.rows = rows;

    exit.time = time;

    res.send(exit);
});

module.exports = router;