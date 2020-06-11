const authoriseAdmin = (req, res, next) => {
  if (!req.session.user) {
    res.send("You are not an admin!");
    return;
  }

  if (req.session.user.isAdmin && req.session.user) {
    next();
  }
};

module.exports = authoriseAdmin;
