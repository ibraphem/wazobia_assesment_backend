import jwt from "jsonwebtoken";
import mg from 'mailgun-js'

export const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  };


  export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({status:false, message: 'Invalid Token', data: null });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({status:false, message: 'No Token', data: null });
    }
  };


  export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
    
  });

  export const recieptEmailTemplate = (name) => {
    return `<h3>Payment Reciept</h3>
    <p>
    Hi ${name},</p>
    <p>One morestep to complete your registration. Click the link below to verify your email.</p>
 
    <p>
    <a href="http://localhost:3000/email/verify">http://localhost:3000/email/verify</a>
    </p>

    <p>
    Should you be unable to use the link above, simply copy and paste this link in your browser to verify your email.
    </p>
    <p>
    <a href="http://localhost:3000/email/verify/ruti3p3z2ygnvlberrsz2bb">http://localhost:3000/email/verify/ruti3p3z2ygnvlberrsz2bb</a>
    </P>

    <p>Regards</p>
    `;
  };