import { GoogleSpreadsheet } from "google-spreadsheet";


const spreadsheet = new GoogleSpreadsheet(
  process.env.SHEET_DOC_ID
);
  
const fromBase64 = value => {
  const buff = new Buffer.from(value, 'base64')
  return buff.toString('ascii')
}

export default async (req, res) => {
  try {
    await spreadsheet.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    });
    await spreadsheet.loadInfo();
    const sheet = spreadsheet.sheetsByTitle["Config"];
    await sheet.loadCells("A1:C5");
    const companyName = sheet.getCell(1, 2);
    const companyBrand = sheet.getCell(1, 1);
    const promoShow = sheet.getCell(4, 0);
    const promoName = sheet.getCell(4, 1);
    const promoMessage = sheet.getCell(4, 2);
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
