const handleSignin = (req, res, db, bcrypt)=> {
    const { email, password } = req.body;

    if (!email || !password){
        res.status(400).json('incorrect form submition')
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash); // true
        console.log(isValid)
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                console.log(user)
                console.log('nice to meet you')
                res.json(user[0])
                
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            console.log('...')
            res.status(400).json('we uagliò ii sbagliato e credenziali')
        }
    })
    .catch (err => res.status(400).json('credenziali sbagliate'))
}

module.exports = {
    handleSignin:handleSignin
}