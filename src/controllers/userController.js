import User from "../models/userModel";

let session;

export const register = async (req, res) => {
  const {
    username,
    password
  } = req.body;

  let newUser = new User({ username: username, password: password });

  const user = await newUser.save((err, user) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(201).send({
      message: "Register success!"
    });
  })
}

export const login = (req, res) => {
  const {
    username,
    password
  } = req.body;
  session=req.session;
  User.findOne({ username: username }).exec(function (error, user) {
    if (error) {
      return res.status(500).send({ error: true })
    } else if (!user) {
      return res.status(400).send({ error: true })
    } else {
      user.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          return res.status(400).send({ error: true })
        } else if (!isMatch) {
          return res.status(400).send({ error: true })
        } else {
          // req.sessions.userid = user._id
          req.session.userid=user._id;
          return res.send({ success: true, userid: user._id })
        }
      })
    }
  })
}

export const logout = (req, res) => {
  req.session.destroy(() => {
    req.redirect('/');
  });
}
