import { GoogleSpreadsheet } from "google-spreadsheet";
import { fromBase64 } from "../../utils/base64";

const spreadsheet = new GoogleSpreadsheet(
  process.env.SHEET_DOC_ID
);
  
export default async (req, res) => {
  try {
    await spreadsheet.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    });
    await spreadsheet.loadInfo();

    const sheetConfig = spreadsheet.sheetsByTitle["Config"];
    await sheetConfig.loadCells("A1:C5");
    const companyName = sheetConfig.getCell(1, 2);
    const companyBrand = sheetConfig.getCell(1, 1);
    const promoShow = sheetConfig.getCell(4, 0);
    const promoName = sheetConfig.getCell(4, 1);
    const promoMessage = sheetConfig.getCell(4, 2);
    //console.log(companyName.value);
    res.end(
      JSON.stringify({
        promoShow: promoShow.value,
        promoName: promoName.value,
        promoMessage: promoMessage.value,
        companyName: companyName.value,
        companyBrand: companyBrand.value,
      })
    );
  } catch (err) {
    console.log(err);
    res.end(
      JSON.stringify({
        promoShow: false,
        promoName: "",
        promoMessage: "",
        companyName: "",
        companyBrand: "",
      })
    );
  }
};
