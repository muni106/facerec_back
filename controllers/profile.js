const handleProfile = (req,res,db ) => {
    const { id }=req.params;
  
    db.select('*').from('users').where(
        {id: id}
    )
    .then(user => {
        if (user.length){
            res.json(user[0]);
        }else{
        res.status(400).json('not found')
        }
        
    }).catch(err => res.status(400).json('error when try to get the user'))
/*     if (!found)  {
        res.status(404).json('no such user')
    } */
}

module.exports = {
    handleProfile : handleProfile
}