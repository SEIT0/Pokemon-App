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
const axios = require('axios')
const {Type, Pokemon} = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('is listening at '+process.env.PORT); // eslint-disable-line no-console
    await axios.get('https://pokeapi.co/api/v2/type').then(r => {
        r.data.results.forEach(async (e) => {
            await Type.findOrCreate({where: {name: e.name} })
        })
    })
  });
});
