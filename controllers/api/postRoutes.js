const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id

        })

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        // Update the Post with the given ID using req.body data
        const [rowsUpdated, [updatedPost]] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
            returning: true, // This is required to get the updated row
        });

        if (rowsUpdated === 0) {
            // If no rows were updated, the post with the given ID doesn't exist
            return res.status(404).json({ message: 'Post not found' });
        }

        // Fetch the updated post data with associated User and Comment models
        const updatedPostData = await Post.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment },
            ],
        });

        res.status(200).json(updatedPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!postData) {
            res.status(404).json({ message: 'No chat with this id!'})
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;