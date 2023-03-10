const router = require('express').Router();
const { Product, Tag, ProductTag } = require('../../models');

// The `/api/tag` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],  
    });
    res.status(200).json(allTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }  
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],  
    });
    if (!singleTag) {
      res.status(404).json({ message: 'No Tag found with that ID.'});
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_id: req.body.tag_id,
    }); 
    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
    });   
    if (!updateTag[0]) {  
      res.status(404).json({ message: 'No Category with that ID.' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No Tag found with that ID.' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
