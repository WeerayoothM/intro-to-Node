const router = require("express").Router();
const passport = require('passport');
const personControllers = require('../controllers/person');

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, personControllers.getAllPersons);
router.get("/:id", auth, personControllers.getPersonsById);
router.post("/", auth, personControllers.createPerson);
router.put("/:id", auth, personControllers.updatePerson);
router.delete("/:id", auth, personControllers.deletePerson);

module.exports = router;
