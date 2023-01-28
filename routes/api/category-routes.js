const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find category by the 'id' value
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categories) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new category
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categories[0]) {
      res.status(404).json({ message: 'No categories with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categories) {
      res.status(404).json({ message: 'No categories found with that id!' });
      return;
    }

    res.status(200).json('Category has been deleted.');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
