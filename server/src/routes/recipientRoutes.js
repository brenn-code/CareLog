import express from "express";


const router = express.Router();


// GET all recipients
router.get("/", (req, res) => {

    res.json({

        message: "All recipients",

        recipients: [
            {
                id: 1,
                name: "Mary Smith",
                age: 82,
                calorieTarget: 1800
            },
            {
                id: 2,
                name: "John Murphy",
                age: 76,
                calorieTarget: 2000
            }
        ]

    });

});


// GET one recipient
router.get("/:id", (req, res) => {

    const recipientId = req.params.id;


    res.json({

        message: `Recipient ${recipientId}`,

        recipient: {
            id: recipientId,
            name: "Mary Smith",
            age: 82,
            calorieTarget: 1800
        }

    });

});


// CREATE recipient
router.post("/", (req, res) => {

    const newRecipient = req.body;


    res.json({

        message: "Recipient created",

        recipient: newRecipient

    });

});


// UPDATE recipient
router.put("/:id", (req, res) => {

    const recipientId = req.params.id;


    res.json({

        message: `Recipient ${recipientId} updated`,

        changes: req.body

    });

});


// DELETE recipient
router.delete("/:id", (req, res) => {

    const recipientId = req.params.id;


    res.json({

        message: `Recipient ${recipientId} deleted`

    });

});


export default router;