import jwt from "jsonwebtoken"
const secret = "productBookingAPI";

// Token Creation
let createAccessToken = (user) => {
	const data = {
		id : user._id,
		email : user.email,
		isAdmin : user.isAdmin
	}
	return jwt.sign(data, secret, {});
}

// Token Verification
let verify = async (req, res, next) => {
	// The token is retrieved from the request header
	let token = req.headers.authorization;


	if(typeof token !== "undefined"){

		// Validate the token using the "verify" method decrypting the token using the secret code
		return jwt.verify(token, secret, (err, data) => {
			// if JWT is not valid
			if(err){
				return res.send({auth : "failed"});
			}
			// if JWT is valid
			else{
                req.user =  jwt.decode(token, {complete:true}).payload  
				next();
			}
		})
	}
	// Token does not exist
	else{
		return res.send({auth : "failed"});
	}
}

// Token decryption
let decode = (token) => {
	// Token received and is no undefined
	if(typeof token !== "undefined"){

		// Retrives only the token and removes the "Bearer " prefix
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err){
				return null;
			}
			else
			{
				return jwt.decode(token, {complete:true}).payload
			}
		})
	}
	// Token does not exist
	else{
		return null;
	}
}

export { createAccessToken,  verify , decode } ;