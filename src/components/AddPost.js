import React, { useState, useEffect } from "react";
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";
import { IconButton } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";

import client from "../feathers";
import "../styles/addpost.scss";

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_API_BASE_URL);

export default function AddPost() {
    const postsService = client.service("posts");

    const [currentUser, setCurrentUser] = useState({});

    async function init() {
        try {
            let user = await client.authenticate();
            setCurrentUser(user.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [postText, setPostText] = useState("");

    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
    };

    const submitPost = async () => {
        // return console.log(currentUser)
        const post = {
            text: postText,
            user: currentUser._id,
            language: currentUser.nativeLanguage,
        };
        try {
            let result = await postsService.create(post);
            socket.emit("post", result);
            console.log(result);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: "inline" }}>
            <IconButton
                onClick={handleShow}
                style={{ display: "inline", color: "white" }}
            >
                <AddCommentOutlinedIcon />
            </IconButton>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={{ textAlign: "center" }} closeButton>
                    <Modal.Title>Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="post-text"
                        value={postText}
                        onChange={handlePostTextChange}
                    ></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="submit-post" onClick={submitPost}>
                        Submit Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
