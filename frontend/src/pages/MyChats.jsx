import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./MyChats.css";

import {
    FiMessageCircle,
    FiChevronRight,
} from "react-icons/fi";

const MyChats = () => {

    const navigate = useNavigate();

    const [conversations, setConversations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!token) {
            navigate("/login");
            return;
        }

        fetchConversations();

    }, []);

    const fetchConversations = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/chat/conversations",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setConversations(
                res.data.conversations
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };


    const getOtherUser = (conversation) => {

        return conversation.participants.find(
            (participant) =>
                participant._id !== user?.id
        );
    };


    return (
        <>
            <Navbar />

            <div className="my-chats-container">

                <div className="my-chats-header">

                    <div>
                        <h1>My Chats</h1>

                        <p>
                            Your conversations with
                            buyers and sellers
                        </p>
                    </div>

                    <FiMessageCircle />

                </div>


                {loading ? (

                    <div className="chats-loading">
                        Loading chats...
                    </div>

                ) : conversations.length === 0 ? (

                    <div className="no-chats">

                        <FiMessageCircle />

                        <h2>
                            No conversations yet
                        </h2>

                        <p>
                            Contact a seller to start
                            your first conversation.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Browse Products
                        </button>

                    </div>

                ) : (

                    <div className="chat-list">

                        {conversations.map(
                            (conversation) => {

                                const otherUser =
                                    getOtherUser(
                                        conversation
                                    );

                                return (

                                    <div
                                        key={
                                            conversation._id
                                        }
                                        className="chat-list-item"
                                        onClick={() =>
                                            navigate(
                                                `/chat/${conversation._id}`
                                            )
                                        }
                                    >

                                        <div className="chat-list-avatar">

                                            {otherUser?.name
                                                ?.charAt(0)
                                                .toUpperCase()}

                                        </div>


                                        <div className="chat-list-info">

                                            <h3>
                                                {
                                                    otherUser?.name ||
                                                    "User"
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    conversation
                                                        .product
                                                        ?.name ||
                                                    "Product"
                                                }
                                            </p>

                                        </div>


                                        <FiChevronRight className="chat-arrow" />

                                    </div>

                                );
                            }
                        )}

                    </div>

                )}

            </div>
        </>
    );
};

export default MyChats;