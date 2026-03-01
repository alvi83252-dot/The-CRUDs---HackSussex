export const createReport = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", !!req.file);

  return res.json({
    success: true,
    message: "Upload received",
    body: req.body,
    hasFile: !!req.file
  });
};