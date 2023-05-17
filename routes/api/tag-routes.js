const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//Done: Route
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

//Done: Route
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DONE: Route
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Done: Route
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    tag.tag_name = req.body.name
    await tag.save();
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

//Done: Route
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id, {
    });
    await tag.destroy();

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
