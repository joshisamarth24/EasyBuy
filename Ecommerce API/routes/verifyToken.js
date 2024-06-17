import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return res.status(401).json("Unauthorized");
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();

    } catch (error) {
        console.error('JWT verification error:', error);
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Unauthorized - Invalid token' });
          } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Unauthorized - Token has expired' });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
    }
}



export const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)
        {
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that");
        }
    });
};