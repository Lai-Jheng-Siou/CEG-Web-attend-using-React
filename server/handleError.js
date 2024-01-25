const handleErrors = (res, status, errorMessage) => {
    res.status(status).json({ success: false, error: errorMessage });
  };
  
  module.exports = { handleErrors };