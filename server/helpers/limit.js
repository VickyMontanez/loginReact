import rateLimit from "express-rate-limit";
export let limitLogin = ()=>{
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true, 
        legacyHeaders: false, 
        skip: (req,res)=>{
            if(req.headers["content-length"]>80){
                res.status(413).send({
                    status: 413,
                    message: "Request Attempts Reached, Try Again in 30 Minutes :("
                });
                return true;
            }
        }, 
        message: (req,res)=>{
            res.status(429).send({
                status: 429,
                message: "Limit Reached :("
            });
        }
    })    
}
