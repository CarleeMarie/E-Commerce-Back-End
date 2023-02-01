const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

 // create a new category
router.post('/', async (req, res) => {
  try {
    const newData = await Category.create( {
      category_name: req.body.category_name,
    });
    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No Category with that ID.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryID = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryID) {
      res.status(404).json({ message: 'No Category with that ID.' });
      return;
    }
    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
