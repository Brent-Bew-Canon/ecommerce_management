const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    // find one category by its `id` value
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    category.category_name = req.body.category_name
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
    });
    await category.destroy();

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
