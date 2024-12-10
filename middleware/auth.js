const jwt = require("jsonwebtoken");
const Token = require("../model/Token");

const middleware = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    console.log("No access token found");
    return res.status(401).json({ message: "No access token found" });
  }

  try {
    // Verify the access token
    const verifiedAccessToken = jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    console.log("Access token verified:", verifiedAccessToken);
    next();
  } catch (err) {
    console.log("Access token verification failed:", err.name);
    if (err.name === "TokenExpiredError") {
      // Find the refresh token in the database
      const fetchedRefreshToken = await Token.findOne({
        refreshtoken: req.cookies.refreshToken,
      });
      console.log(
        "Refresh token found:",
        fetchedRefreshToken,
        req.cookies.refreshToken
      );

      if (fetchedRefreshToken === null) {
        console.log("Invalid or missing refresh token");
        return res
          .status(403)
          .json({ message: "Invalid or missing refresh token" });
      }

      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTdmMmNlYjIxZTIzZTMwMTI0NjJiYSIsImlhdCI6MTczMzgyOTQzMSwiZXhwIjoxNzMzODI5NDYxfQ.DT2xCAsS5Jk_H9ASBqtvw1lJCwjvoDKgekB1jeZ5Qs0

      // Verify the refresh token
      try {
        const verifiedRefreshToken = jwt.verify(
          fetchedRefreshToken.refreshtoken,
          process.env.REFRESS_TOKEN_SECRET_KEY
        );
        console.log("Refresh token verified:", verifiedRefreshToken);

        // Generate new access and refresh tokens
        if (verifiedRefreshToken.id !== null) {
          const accessToken = jwt.sign(
            { id: verifiedRefreshToken.id },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "20s" }
          );
          const refreshToken = jwt.sign(
            { id: verifiedRefreshToken.id },
            process.env.REFRESS_TOKEN_SECRET_KEY,
            { expiresIn: "15m" }
          );

          // Update the refresh token in the database
          await Token.updateOne(
            { refreshtoken: req.cookies.refreshToken },
            {
              $set: {
                refreshtoken: refreshToken,
              },
            }
          );

          // Set new cookies
          res.setHeader("Set-Cookie", [
            `accessToken=${accessToken}; Path=/; HttpOnly; Secure=false; SameSite=None`,
            `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure=false; SameSite=None`,
          ]);
          console.log("New tokens set and user authenticated");
        }
        next();
      } catch (e) {
        console.log("Error verifying refresh token", e);
        console.log("deleting the refresh token");
        await Token.deleteOne({ refreshtoken: req.cookies.refreshToken });
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    } else {
      console.log("Unexpected error:", err);
      return res.status(403).json({ message: "Invalid access token" });
    }
  }
};

module.exports = middleware;
