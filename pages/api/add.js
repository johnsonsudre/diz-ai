import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";
import { fromBase64 } from "../../utils/base64";

moment().locale();

const spreadsheet = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const genCoupon = () => {
  const code = parseInt(moment().format("YYMMDDHHmmSSSS"))
    .toString(16)
    .toUpperCase();
  return code.substr(0, 4) + "-" + code.substr(4, 4) + "-" + code.substr(8, 4);
};

export default async (req, res) => {
  try {
    await spreadsheet.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    });
    await spreadsheet.loadInfo();

    const sheetResearch = spreadsheet.sheetsByTitle["Research"];

    const sheetConfig = spreadsheet.sheetsByTitle["Config"];
    await sheetConfig.loadCells("A1:C5");

    const promoShow = sheetConfig.getCell(4, 0);

    let promoName = "";
    let promoMessage = "";
    let coupon = "";
    let companyName = "";

    if (promoShow.value === true) {
      promoName = sheetConfig.getCell(4, 1).value;
      promoMessage = sheetConfig.getCell(4, 2).value;
      companyName = sheetConfig.getCell(1, 2).value;
      coupon = genCoupon();
    }

    const data = JSON.parse(req.body);

    await sheetResearch.addRow({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      date: moment().format("DD/MM/YYYY HH:mm"),
      coupon,
      score: parseInt(data.score),
      promoName,
      promoMessage,
    });

    res.end(
      JSON.stringify({
        showCoupon: coupon !== "",
        coupon,
        promoName,
        promoMessage,
        companyName
      })
    );
  } catch (err) {
    console.log(err);
  }
};
