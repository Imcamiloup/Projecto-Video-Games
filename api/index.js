//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({  alter: true }).then(() => {
  server.listen(3002, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});















/*http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = req;

  if (url === "/api/games") {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'ID de juego faltante en la URL' }));
    return;
  }

  if (url.startsWith("/api/games/")) {
    const id = url.split('/').pop(); // Obtener el último segmento de la URL como el ID
    await getGameById(res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
}).listen(3002, 'localhost');*/


// Sincronizando los modelos 



/*console.log(axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`));

axios
  .get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
  .then(
    (res) => {console.log(res.data);},  //valor de resolución, "success handler"
    (reason) => {console.log(reason.response.data);}  //valor de rechazo, "error handler"
  )
  .then(
    () => console.log('PROMESA EJECUTADA'),
    (reason) => {console.log(reason.response.data);}  //valor de resolución, "success handler"
    )*/
