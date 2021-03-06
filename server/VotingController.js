import express from "express";
import pool from "./pool.js";
import {getLoggedInUser} from "./UserFunctions.js";
import {getPostTotal} from "./VotingFunctions.js";

const VotingController = express.Router();

VotingController.post("/vote/:direction/:questionid/:type", (req, res) => {
    const token = req.cookies.token;
    const type = req.params.type;
    getLoggedInUser(token).then((user) => {

        const questionid = req.params.questionid;
        const direction = req.params.direction === "up" ? 1 : -1;
        if (type === 'question') {
            pool
                .select("votes.*")
                .from("votes")
                .where({
                    "votes.qatype": type,
                    "votes.qaid": questionid,
                    "votes.userid": user.userid,
                })
                .first()
                .then((vote) => {

                    // No vote
                    if (!vote) {

                        return pool("votes")
                            .insert({
                                "votes.qaid": questionid,
                                "votes.userid": user.userid,
                                "votes.vote": direction,
                                "votes.qatype": type
                            })
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    } else if (direction === vote.vote) {

                        // delete vote
                        return pool("votes")
                            .where({"votes.id": vote.id, "votes.qatype": type})
                            .del()
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    } else {


                        return pool("votes")
                            .where({"votes.id": vote.id, "votes.qatype": type})
                            .update({vote: direction})
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    }
                }) //if it fails
                .catch((e) => {

                    res.status(422).send();
                });
        } else if (type === 'answer' || type === 'comment') {
            pool
                .select("votes.*")
                .from("votes")
                .where({
                    "votes.qatype": type,
                    "votes.qaid": questionid,
                    "votes.userid": user.userid,
                })
                .first()
                .then((vote) => {

                    // No vote
                    if (!vote) {
                        return pool("votes")
                            .insert({
                                "votes.qaid": questionid,
                                "votes.userid": user.userid,
                                "votes.vote": direction,
                                "votes.qatype": type
                            })
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    } else if (direction === vote.vote) {

                        // delete vote
                        return pool("votes")
                            .where({"votes.id": vote.id, "votes.qatype": type})
                            .del()
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    } else {
                        // Update vote

                        return pool("votes")
                            .where({"votes.id": vote.id, "votes.qatype": type})
                            .update({vote: direction})
                            .then(() =>
                                getPostTotal(questionid, type)
                                    .then((count) => res.json(count).sendStatus(200))
                                    .catch((e) => console.log(e.res) && res.status(422).send())
                            )
                            .catch((e) => console.log(e.res) && res.status(422).send());
                    }
                }) //if it fails
                .catch((e) => {

                    res.status(422).send();

                })
        }

    });
})

export default VotingController;
