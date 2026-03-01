import { checkJwt } from "../middleware/auth.js";

router.post("/litter", checkJwt, upload.single("image"), submitLitterReport);

const token = await getAccessTokenSilently();
fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: formData
});