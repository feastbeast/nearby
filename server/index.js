const newrelic = require('newrelic');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../db/pgdb.js'));
const redis = Promise.promisifyAll(require('redis'));
// const redis = require('redis');
var client = redis.createClient();

client.on('error', (err) => {
  console.log('Error: ', err)
});

var x = {
  "0": {
      "place_id": "1",
      "name": "Schmitt, Oberbrunner and Waters",
      "google_rating": "4.5",
      "zagat_rating": "4.5",
      "photos": [
          "CmRaAAAAtKnk1UaRTdSFjLxOVhEGJO8_GkVjITblQM94CG2R0H6i1wann7MgewEHK1i-4IPZw51mtFTYGsaGd0C0m-vu-lv7Iq0Gm-Ucob5wr2N8Iwd-fud9LEAdgGaPtpKiuhk8EhDfujvIlvTRPksmo4Pf-W-hGhTDU61HbtQyyczDWAWtQqUn5a0p8Q",
          "CmRaAAAA5qERGfBlRGZ1qTkztFgiM7C-m7M7ImZ07XUDRRDCTJIvbU_ZXEMCSYHfjRQ8zjfJ3VQhSHjetZn1PbZc_q1QQSIWEYKPMXk6gOF-P9lZbjrY6lw0vSbucZ1DP2zQ5BFVEhAT2mzB1p1_aOuaPYaAx7ROGhTTnENm0L-sNzZ8LJOt1Pe_PQPoxA",
          "CmRaAAAAl3KpZI-mQt-OQqqaTTpvmRMEcGW0lNoqWUKu36NmR_dIsKgRHAu9DMJZiTKBqoB9N1y1kCoYOxs7yGoiAsujaWUP41QP9rMqmHO767mK9GoV1Wf7Cn7QvfZRJWZ-GgrjEhBNwn7eM4ZtMiDnoNFyFJqgGhR_pYAFbb9Bhdml6S-4YmhAlksuWQ",
          "CmRaAAAAPMSvJvBpKtG0XP0LWSsvl6R6jYLRyo1uxRcLbEsnF4mXspO5ylL7QKWqF-bCliWpJXrEhfS1WVq5f9klgx0ZDBrvQ_wBSYbKVCHLVCSEnP-DY53SPDAxdI-rWKH8AoUoEhB5m1Bkl9zE-4OJJGHj4Tr2GhSfcWikYVgZUUKFuzZ_5DOhjpe-hg",
          "CmRaAAAA0VuvCRIrDD4ZREhi-iDapBrf8rPlT7-hx3oHS9oQbRpFhzoRZmuSqWcDFMgrd0lCLBAw92zawc14DYVfZWvT0CoWu29vY504vLAO5J2NfoOS-8DcGKID4NrgI2xIzobQEhDOSFsOw27G7DXJB3vMM0ibGhTw2mjQIgnRdePtx94CeY4Y56xbEw"
      ],
      "neighborhood": "Hyattstad",
      "price_level": 3,
      "types": "Food",
      "nearby": [
          "3450251",
          "5450374",
          "3588937",
          "4493502",
          "8451482",
          "3916420"
      ]
  },
  "1": [
      {
          "place_id": "3450251",
          "name": "Sauer - Stracke",
          "google_rating": "3.5",
          "zagat_rating": "3",
          "photos": [
              "CmRaAAAAWeFrTLnIuk32h0gTIhmZBqjqW65UClkOfoMpXMkg4JJ7_O1FNEBdCsHCapucBDQbG3AUxwo1pdy2fntAhx8CoJPFpVkw4wMkJebL4l3zTWngs_DMbiIqsWK3kNoYYJpJEhDFnljJRKPt4Slw4txjZvaHGhTHmRqmiyVv5r-WqPn7E0-qFzg0sQ",
              "CmRaAAAAaZdRr9yYJRDccj0BpFhQKpz-XhGNPwD3sH1ia5emywuxci4bnHeJSxbwAiTFyRV5Q0hqwX-RfDt4m8JcAGEnzVD295afhQoGoA_JtV2LnlOP1IgVTdU8sHZoiKaYf86KEhDZk5j2eyKE0v5ZGkT7HWrpGhS-24GC40tYxkhOJd8qUNOOHoPdyw",
              "CmRaAAAAik9zVw-NM714mFel6wyD95U-1akhlsB2rIm7FtTStozyP_3CNKCID6BbAPTEYuIad3Drv9n6PRBrC9CJ7kdFTk8cl3RNlpoHfILAByWMBmcQ2NySnZ76mlnkDwI-aPzEEhDFnaE1vQoUsPs71Ps86_pcGhQBjhj2tFLN5s97AefYWBJ7HLuQ_A",
              "CmRaAAAArbQSlVczZeRGBSPtHZBuXJEc710XCIjlcBgQFfZKS7wBJyQiYdJOqdoYYf1rMfLN2ACanZvj1zbv62FOVSdygN_D06CfRCSC6srsc3n37I7GgRFYnPeuxR8LQYFfDDxqEhC6fG69RtpYlcdqJSogfg04GhSLbLaFBoJwWrMhbBOPNFmitR98dg",
              "CmRaAAAAcoimhLep0DaReq3J9l7BpRQRGnFK3lYJquosyShL_jxP2H4lmIn9TjE-UGGxZiDw1ErIKmuCOTdyMfKdCafktcLQAsdqjYcZWKJ-Kp6x_xrKcmmC1xCEZI72jhjsZZx1EhC3aMFWSU1FTmjzy7LGtaW1GhTuXnlsCqXFCDuZZFw6g-tdBQ5Wdg"
          ],
          "neighborhood": "Port Edmondport",
          "price_level": 2,
          "types": "Liquor store",
          "nearby": [
              "9007136",
              "5107290",
              "7038372",
              "8590228",
              "8069899",
              "6316084"
          ]
      },
      {
          "place_id": "3588937",
          "name": "Strosin - Nader",
          "google_rating": "4",
          "zagat_rating": "3.5",
          "photos": [
              "CmRaAAAAFOUp3eV-YTHKsN0KIFRex8dL570HgCPrHQ-73JWlprLT770lWbc1Se-Oacn85JAH2-U4G82CNAC0m3iS_dHI0fEfLc2DrEdMBSsYRHyrgXKQYk0odyK5jjGnuHibbQ0DEhBN8lz4hcHqVueqrsG7tXqoGhRsFX87nbwMeKE90x9UETg0F4cRpw",
              "CmRaAAAAOWm1sS3nUG8dj_whS3ZYj9X1CdyUt3Fy5e4e4KxbYmNSFtcqjmSRtz6VT6mw4nufnuG01kOJn-T6ZdWC5qtE3aJyIBVmOE1sRvxvUcIGrnbS9aHL5M4R15CQ75o_vJ1PEhArx-E4E5NxNb8L4DDI_iuNGhQBff3CYVLU7QvyYKWtKPHn2ZYqhA",
              "CmRaAAAAfI0AADGGL61d9OD2TYSct5JsJxUYc-EazIHwi_k4QwAIusG0fRoYcFrhfzLTGUlM1Gm__k4tjodFTG9X5Glx6FdwzEU10XSYFiIupLgRnEc2x5OWdkM5jv2uqxQM7OqNEhDpKOUEoEZaFVz9YR0qiabvGhRv4IVIiH49-hp3NqdIzf4psrwjMQ",
              "CmRaAAAAGqn5GW_MQHuNWW-H4U6LfI7AU3cGzyDnRSN-EdgVzCKyXvTZnvaWucS2avam_ynbSsAq9BKBb-3kT3Q-rACY8Rzb51_Ddc_9QsF4exkniL64qCxCm-31JNX-pbo7QMH5EhDWAaZjnnIGnZqRLKKZ5tSBGhTUSwES_U_UR-lY_chmkQIbYKgzzw",
              "CmRaAAAAF4asWgO8adC2oq9YcYlQx_tF7VVloqBEaIupRacUQ2B8b9lM8J7xdP0MaBpqInCd9YRqvkYJbKC6QfmNo92eYfunPCVCfEAsTavKczI_fHG4cdjv5rmyXyHwh3_2PeTgEhCmbz9T-VHKvq_44nMrNRYSGhQzoDQPW4pJ47tigCui4JIao9s7cA"
          ],
          "neighborhood": "Marianneborough",
          "price_level": 4,
          "types": "Bar",
          "nearby": [
              "1852525",
              "4603380",
              "4385981",
              "7723683",
              "5089602",
              "8781883"
          ]
      },
      {
          "place_id": "3916420",
          "name": "Lebsack and Sons",
          "google_rating": "4",
          "zagat_rating": "5",
          "photos": [
              "CmRaAAAAlUjy8wr9a4n8ZoI1QrO6MR0w2YRV_ZXz069VeEbD4nhj1XSKohw1pizer23RCNYgxKUmJ747sqirIE1UhUoxQc2sLgjPxBDxXUH3HMiYhtPBwWtXJIB1FwZEbCLN16I9EhDugM7yrKKcvm6BX9lKpA0ZGhRYumzVFFRWSF5V6LAYRshz6l16Pw",
              "CmRaAAAAGS_xpbW1v3gpI-naYHYqOrwit3VQF-zUYjIL7aTQYN9h444fetySNFLCqPE3BEY4reI1oEiI2yluTvex3JplfLOodhzM2PVp_53DDgsdDwp6ob2RgkbbEMJSPYvNTY3HEhCwMXf2_9SXcWWMqoKrxoZNGhQ6aYeJDVEgHtUdNWfE2jHjTYBNnA",
              "CmRaAAAAoDMU5yMRvrFs5DKp_p29LlaBbw1CWdlM7rKdaB5SRwpRfzLK8F94ll--vHLlETlPCrCY45GYkkV7nnMIDbvAGZhDnq8577aVYQZgvruMq12h3Z1s2oBpLFfrTGPdCsKmEhB85OBSUjIZJ-5XQJTQENMOGhRcWNenSX6Jqd3Cd_PP76lG0JAnjw",
              "CmRaAAAAmmnacKMh5j6URsTNAQzkvmC6dhdydtaZmJV98cP-ncT1Qw4HU27cM_Km-HL8ZQxT1t-pybbTCmoH40G5U-W7aaeBybMl9o9eeRG3SFkBfxnBU3w96l_fn9OCBNqSWqdhEhCkuhz3NDvthk3kTrS2CuvdGhSy0gvrGpRdPorXTAYe9CAIJ8Q5XA",
              "CmRaAAAAgQY8YRdcqBFVeNTne6lEazLVVkse2zceQ9kH8FZjlXTeNpGQUbLv2H8nqFNhpRQHwWSFkpNuARI_qLe58qpj_KrWNVxOEKR0aGU1bBAjgQWcr1uVwd3Poc2W_MI_PcctEhAcbOMMPDQE5mz1PkESgKQYGhQz_FttrYZRP9afR1mELfaY8oSjgQ"
          ],
          "neighborhood": "Keeganmouth",
          "price_level": 2,
          "types": "Establishment",
          "nearby": [
              "9833842",
              "6375769",
              "1990166",
              "1995817",
              "7608100",
              "5821219"
          ]
      },
      {
          "place_id": "4493502",
          "name": "Kihn, Nolan and Pollich",
          "google_rating": "5",
          "zagat_rating": "3.5",
          "photos": [
              "CmRaAAAA303nO4RmTZipSNiN2uX3B2j_npMUtPHOQvoshIwJcZtSwQhregt2A4rxIhvfOMhKXgapz0jHw2FmNITaCFSQNekxoFvuOWu1B7iRizB_imTjw_suBRceFOsuS57SBKZLEhDRRCMbgHMDpUpXmpW6lAcgGhSThak3DbyMojuw4hW5PwDfK72J9g",
              "CmRaAAAAvElDXy4RRwVgxGgcQh_S3GJHE_3Xry_1ao-Y8nIIOiudRvHhQR81Do-bDIEw5xXBoeIo8sU1AbD6HoTj0I4NqZ10moxF8yLIFs1-ezUa6O-ngiMgPjGA5qmS3b6Aa99BEhB8Aq8x7bIvlgIUQIPQRfrNGhSSl2MdW7uDoaimuOgvithIaS4RLA",
              "CmRaAAAAgtEE8uyCKw_MxNyRX57JS7aur-G00ds8rGGxyAUvgOHaM-QpAYJxP0sPsIFDRPSWmxWgPTtzhoIyPkd_zt4gAYXb_5AKNu_z-d2bAH5zMu4mJK6xLv0iEv573SQD9j2GEhCdv0Mjj4gzh3_-6FXGTbDOGhQem2VNMXJ4KsDUBcCSdeF-6lNs9Q",
              "CmRZAAAAfwo7MEtGsHvwhai4qG-H_5Wi3uuazs0YHvhaD5Hdpe5QS4c1omSZlBdLv_jvHY1njZr9g0x78SVvqEnnJqY8z1iUxk2gvwRirOWyVezWi4Ly5O2LEZGJR8sKG7RJ0C6AEhA--WrAVXryW9R2YLvbC0oFGhQKSRElDuTFqcnqcbSng7dGUhCxgw",
              "CmRaAAAAUPOBhJ-CMym67lfvnANFvID5mQY_hH0tbliYM3B-zhCk-Koh0Slk0am0Qsv2Kkm3CoAx9rZaw5-iDabMUhVBmnoFV2eLezjgVrPImtljlFOVqFaduZx1yNbp2R2_jsTDEhDoaOY39Xju_WwUmlSWBDP4GhRRJc-LFeQ2WmA5YwqJzQ26ByhtvA"
          ],
          "neighborhood": "Lake Gilberto",
          "price_level": 4,
          "types": "Bar",
          "nearby": [
              "1072692",
              "7384205",
              "1758680",
              "1771779",
              "1502703",
              "9397669"
          ]
      },
      {
          "place_id": "5450374",
          "name": "Kozey - Hills",
          "google_rating": "3",
          "zagat_rating": "3.5",
          "photos": [
              "CmRaAAAAX1gGBydJ5Bm0aNyqtJhT_6FJ2015GqQcvS8Z1l4lldNwmCXzav-ns46QXH5t5A9KA4KCYoGXqo6SPhLKzzSENQDJzJw8tIbHUYFiVM0vPACy8p5q8afljtyX0cg2XGL9EhASbjAC0RhUXKYzoH8U6W_qGhTPQz1bOPIlmx7NEJpKM2fgyt5e9w",
              "CmRaAAAATidZfnYWRDUbIYtqd41swgvXG2dF48N76FJxSMIm8yWLUiheaRcCRXAElCjztDctn2Lio5efvW6iVeFJfdY99-medL2YaF3tDceh619LBQjghMiYomf_t5ZTvyhnEUNwEhBMkyOtT24JyzXqJlQ-gNkAGhQF0npisxRe7iN81DllK_5IP2fwOQ",
              "CmRaAAAAi5W6nXAC0P4ZMjupteBG7XBpK9-GsPcy7uacRXlRIxWTmKiDoJyOClUO5r5zkzvEIStZLJ6b4eksIP4disiLPie9fGbpffLcBb97UvRCjVxYRshM0xu4eT6F1pRfNNdVEhCPNkGf2p7HsqECs4TH3pfMGhQ02Ilyr_lH9tGng9X0eSU6GVhYDw",
              "CmRaAAAAe5w7A3Z9M6LG_E5_LUJ7EfyPaCaZS_RC21W27FPKjYuWUbPQW7heG3UZJ2HPiwlc5mvojZIFQVq67DfA4DmxoJFDxxy7k18VNmrzC8XjwvuBlfvlun8_R13IP9gHx4TcEhB3wGEfvHsnoXw_6Dfqex_kGhQ57zxp9IjaWsUmVAYlpCBO4nW2VA",
              "CmRaAAAAe5Ru0DOUEBgjR7rectZphC5pivNxC1oP3h68Qt-qzFzVWlkD6HLJJZcD0Ns1evg4Q6LXFuc5hICqbtUigt_k-HGtGG_UxvaJrOpqxdYFgIpX_6fA0Hz558xDwE3_gKGoEhCvomsJl1c676I2rvfSeDM0GhRWjmjjrHsmK6dzqhd6HTpSsoP66g"
          ],
          "neighborhood": "East Abigailstad",
          "price_level": 4,
          "types": "Night club",
          "nearby": [
              "2838149",
              "6497196",
              "8787528",
              "257559",
              "4392962",
              "4255548"
          ]
      },
      {
          "place_id": "8451482",
          "name": "Metz and Sons",
          "google_rating": "3.5",
          "zagat_rating": "3",
          "photos": [
              "CmRaAAAAJjz-HLMwZiOTt0bZzMwQHMixMBMCi9IvrWKGuYtQviOtS3CJvxEJQBhmFGyXY40rCSlGNCQTujMUSizMYOUfpyW4bRBFFwHcl1a6jGE8e69eWA29iWPW29JImBb3hfBJEhA0eUo7r2PQd5hwylAg_2ORGhTRUthiaKGCNZZsMJYGU-Z_kuJxTg",
              "CmRaAAAAV1yAavSJPiJA974x7CVWZvljl6aDAhqyS2-rTI7-ICB2mnTSRbMb7zsJ36u2n3SEEODKcdCFZgVK5erAvJ64pWnPaRdyvJPd4oH0O4Zk9nYc_4C2hb8EXaHIVhcMQwk9EhDnpeZQXBrLcnGkEVYWK7LmGhSkCj50BFeci16Umf2sXP-yZCOImA",
              "CmRaAAAAAT9rsUbhhwItO5wr3O5Wuqg93oKwQuWhWQqkQsigntbIYOvtmLLax6wv8eoEl6ZfDBA1iNY-edBc_WYOa2QTEDr_JBFBgEr0UKucnCCAHRjWiJsZs6ZgvBfVbgR2dHaIEhDzkk8-wAVlBXC_6elsXzRlGhQSrLE4d6Ln3xJzSxpZ74wvxaT5cw",
              "CmRaAAAAWe-3lT2NATfRHMKVIzCZChzit7a_u_m3JwjJgtF7x4Cvb2ZBWNYHiNLsEPKNyQryVVGCsXAK0QICa8JjD1RbV13Nx5Wo9u5Up--pG7-hVo0WywGxRHIItvs-NLBU03qSEhBSkU-FuOyBhsjYlNJ16GRWGhSIvh4IUvXX2PrDtXosqYTIe83XPg",
              "CmRaAAAAtqDUEGrHFNsYv-xDnZQ4Rspo1qg2IOocP5LiEs1IKPKLXiBr1xPWCa3ZznobITSXcAZDMIpNB2RalsOhReowDN1CDzBP6w2jqN5RSIsrVlLUR0IaRQyld1kMaN-rOlleEhAL1USz7y-YhFzefMrabmY_GhSu7o_f0ARKRhNEpYqvouiWFxb1og"
          ],
          "neighborhood": "East Edna",
          "price_level": 4,
          "types": "Night club",
          "nearby": [
              "906352",
              "5080437",
              "1377599",
              "8382945",
              "742293",
              "2398140"
          ]
      }
  ]
};
// client.setAsync('1', JSON.stringify(x)).then(() => redis.print);
// client.getAsync('1').then(function(result) {
//   console.log('GET result ->', result)
// });

app.use(bodyParser.json());

app.use(cors());

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// const redisGet = (placeId) => {
//   client.get(placeId, (data) => {
//     if (data === null) {
//       reject()
//     } else {
//       resolve()
//     }
//   });
// };

app.get('/api/restaurants/:id/nearby', (req, res) => {
  const placeId = req.params.id;
  // const placeId = '1'; 
  const results = {};

  client.get(placeId, (err, data) => {
    // console.log(err, data);
    if (err) {
      res.status(500).send();
      return
    }
    if (data !== null) {
      data = JSON.parse(data);
      res.status(200).send(data);
    } else {
      const results = {};
      db.findOneAsync(placeId)
      .then((data) => {
        const nearbyArr = data[0].nearby;
        results[0] = data[0];
        return db.findManyAsync(nearbyArr);
      })
      .then((nearbyData) => {
        results[1] = nearbyData;
        client.set(placeId, JSON.stringify(results), redis.print);
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
    }
  });
  
});

app.listen(3004, () => console.log('Apateez app listening on port 3004!'));
