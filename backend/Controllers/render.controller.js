const path = require("path");

const renderPage = (req, res) => {
  const indexPath = path.join(__dirname, "..", "public", "index.html");

  res.status(200).sendFile(indexPath);
};

module.exports = { renderPage };
