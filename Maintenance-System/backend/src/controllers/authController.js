const authService = require("../services/authService.js");

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          message: "Email e palavra-passe são obrigatórios." 
        });
      }

      const result = await authService.authenticate({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ 
        message: error.message || "Falha na autenticação." 
      });
    }
  }
};

module.exports = authController;