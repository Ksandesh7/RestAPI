const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')

router.get('/', async(req, res)=>{

    try {
        const aliens = await Alien.find();
        res.json(aliens)
    }
    catch(err) {
        console.log("Error : "+err);
    }

})


router.get('/:id', async(req, res)=>{

    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).json({ message: 'Alien not found' });
        }
        res.json(alien)
    }
    catch(err) {
        console.log("Error : "+err);
    }

})



router.post('/', async(req, res)=>{

    const alien = new Alien({
        name:req.body.name,
        tech:req.body.tech,
        sub: req.body.sub,
    })
    
    try {
        const a1 = await alien.save()
        res.json(a1);
    }
    catch(err) {
        console.log("Error : "+err);
    }
})


router.patch('/:id', async(req, res)=>{

    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).json({ message: 'Alien not found' });
        }
        if (req.body.name) {
            alien.name = req.body.name;
        }

        if (req.body.tech) {
            alien.tech = req.body.tech;
        }

        if (req.body.sub) {
            alien.sub = req.body.sub;
        }
        const a1 = await alien.save()
        res.json(a1)
    }
    catch(err) {
        console.log("Error : "+err);
    }

})


router.put('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);

        if (!alien) {
            return res.status(404).json({ message: 'Alien not found' });
        }

        alien.name = req.body.name;
        alien.tech = req.body.tech;
        alien.sub = req.body.sub;

        const updatedAlien = await alien.save();
        res.json(updatedAlien);
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async(req, res)=>{

    try {
        const alien = await Alien.findByIdAndRemove(req.params.id);
        if (!alien) {
            return res.status(404).json({ message: 'Alien not found' });
        }
        res.json({ message: 'Alien deleted' });
    }
    catch(err) {
        console.log("Error : "+err);
    }

})

router.delete('/', async (req, res) => {
    try {
        await Alien.deleteMany({}); // Delete all aliens
        res.json({ message: 'All aliens deleted' });
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router