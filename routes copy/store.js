User.findOne(
  { "local.rooms": { $elemMatch: { name: req.body.username } } },
  function(err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      console.log("ROOM NAME FOUND");
      req.roomNameAlreadyInUse = true;
      next();
    } else {
      req.roomNameAlreadyInUse = false;
      console.log("ROOM NAME NOT FOUND");
      next();
    }
  }
);
