export const userRegister = async (req, res) => {
  try {
    res.status(200).json({ message: "REISTER USER" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const userLogin = async (req, res) => {
  try {
    res.status(200).json({ message: "LOGIN USER" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const vendorRigister = async (req, res) => {
  try {
    res.status(200).json({ message: "VENDOR REGISTER" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const vendorLogin = async (req, res) => {
  try {
    res.status(200).json({ message: "VENDOR LOGIN" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
