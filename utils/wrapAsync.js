module.exports=(fa)=>{
    return (req, res, next)=>{
        fn(req, res , next).catch(next);
    }
}