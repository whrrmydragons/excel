const express = require("express");
const router = express.Router();
var XLSX = require("xlsx");

function send_aoa_to_client(req, res, data) {
  /* generate workbook */
  var ws = XLSX.utils.aoa_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

  /* generate buffer */
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  /*set headers for excel */
  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

  /* send to client */
  res.status(200).send(buf);
}

function send_json_to_client(req, res, data) {
  /* generate workbook */
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

  /* generate buffer */
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  /*set headers for excel */
  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

  /* send to client */
  res.status(200).send(buf);
}

/* GET home page. */
router.get("/", function(req, res, next) {
  //? maybe serve swagger or create custom example page
  res.render("index", { title: "Express" });
});
/*Get a representation of a spreadsheet in Array of arrays format */
router.post("/aoa", function(req, res, next) {
  const data = [["1", "2", "3", 1, 2, 3], [new Date(), "07/09/2019"]];
  send_aoa_to_client(req, res, data);
});

/*Get a representation of a spreadsheet in JSON format(array of object, each object represents a row) */
router.post("/json", function(req, res, next) {
  const data = [
    { a: "1", b: "2", c: "3" },
    { a: 1, b: 2, c: 3 },
    { a: new Date(), b: "07/09/2019" }
  ];
  send_json_to_client(req, res, data);
});

module.exports = router;
