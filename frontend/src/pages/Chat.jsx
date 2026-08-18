import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { io } from "socket.io-client";

import Navbar from "../components/Navbar";
import "./Chat.css";

const Chat = () => {
    const { conversationId } = useParams();
    const navigate = useNavigate();

    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const API = "http://localhost:5000/api/chat";

    /* =========================
       FETCH CHAT
    ========================= */

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetchChat();
    }, [conversationId]);

    const fetchChat = async () => {
        try {
            setLoading(true);

            // Get conversation
            const conversationRes = await axios.get(
                `${API}/conversations/${conversationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setConversation(
                conversationRes.data.conversation
            );

            // Get messages
            const messagesRes = await axios.get(
                `${API}/conversations/${conversationId}/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages(messagesRes.data.messages);

        } catch (error) {
            console.error(error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/");
            }

        } finally {
            setLoading(false);
        }
    };


    /* =========================
       SOCKET.IO
    ========================= */

    useEffect(() => {
        if (!token || !conversationId) {
            return;
        }

        // Create socket connection
        socketRef.current = io(
            "http://localhost:5000"
        );

        // Join this conversation
        socketRef.current.emit(
            "joinConversation",
            conversationId
        );

        console.log(
            "Joined conversation:",
            conversationId
        );

        // Listen for new messages
        socketRef.current.on(
            "newMessage",
            (message) => {

                setMessages((prev) => {

                    // Prevent duplicate messages
                    if (
                        prev.some(
                            (item) =>
                                item._id === message._id
                        )
                    ) {
                        return prev;
                    }

                    return [
                        ...prev,
                        message,
                    ];
                });
            }
        );

        // Cleanup socket when leaving chat
        return () => {

            if (socketRef.current) {

                socketRef.current.disconnect();

                socketRef.current = null;
            }
        };

    }, [conversationId, token]);


    /* =========================
       AUTO SCROLL
    ========================= */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    /* =========================
       SEND MESSAGE
    ========================= */

    const sendMessage = async (e) => {

        e.preventDefault();

        if (!text.trim() || sending) {
            return;
        }

        try {

            setSending(true);

            const messageText = text.trim();

            const res = await axios.post(
                `${API}/messages`,
                {
                    conversationId: conversationId,
                    text: messageText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newMessage = res.data.message;

            /*
             * Add immediately for sender.
             */
            setMessages((prev) => {

                if (
                    prev.some(
                        (item) =>
                            item._id === newMessage._id
                    )
                ) {
                    return prev;
                }

                return [
                    ...prev,
                    newMessage,
                ];
            });


            /*
             * Tell Socket.IO about the new message.
             * The backend will broadcast it
             * to everyone in this conversation.
             */
            if (socketRef.current) {

                socketRef.current.emit(
                    "sendMessage",
                    newMessage
                );
            }

            setText("");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to send message."
            );

        } finally {

            setSending(false);
        }
    };


    /* =========================
       GET OTHER USER
    ========================= */

    const otherUser =
        conversation?.participants?.find(
            (participant) =>
                participant._id !== user?.id
        );


    /* =========================
       CHAT UI
    ========================= */

    return (
        <>
            <Navbar />

            <div className="chat-page">

                <div className="chat-container">

                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="chat-header">

                        <button
                            className="back-button"
                            onClick={() => navigate(-1)}
                        >
                            <FiArrowLeft />
                        </button>


                        <div className="chat-user-avatar">

                            {otherUser?.name
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>


                        <div className="chat-user-info">

                            <h2>
                                {otherUser?.name ||
                                    "Seller"}
                            </h2>

                            <p>
                                {conversation?.product?.name ||
                                    "Product conversation"}
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        MESSAGES
                    ========================= */}

                    <div className="messages-container">

                        {loading ? (

                            <div className="chat-loading">

                                Loading messages...

                            </div>

                        ) : messages.length === 0 ? (

                            <div className="empty-chat">

                                <h3>
                                    Start a conversation
                                </h3>

                                <p>
                                    Ask the seller about
                                    this product.
                                </p>

                            </div>

                        ) : (

                            messages.map((message) => {

                                const senderId =
                                    typeof message.sender === "object"
                                        ? message.sender?._id
                                        : message.sender;

                                const isMine =
                                    senderId === user?.id;

                                return (

                                    <div
                                        key={message._id}
                                        className={`message-row ${
                                            isMine
                                                ? "mine"
                                                : "theirs"
                                        }`}
                                    >

                                        <div className="message-bubble">

                                            <p>
                                                {message.text}
                                            </p>

                                            <span>

                                                {new Date(
                                                    message.createdAt
                                                ).toLocaleTimeString(
                                                    [],
                                                    {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )}

                                            </span>

                                        </div>

                                    </div>
                                );
                            })
                        )}

                        <div
                            ref={messagesEndRef}
                        />

                    </div>


                    {/* =========================
                        MESSAGE INPUT
                    ========================= */}

                    <form
                        className="message-form"
                        onSubmit={sendMessage}
                    >

                        <input
                            type="text"
                            value={text}
                            onChange={(e) =>
                                setText(e.target.value)
                            }
                            placeholder="Type a message..."
                            disabled={sending}
                        />

                        <button
                            type="submit"
                            disabled={
                                sending ||
                                !text.trim()
                            }
                        >

                            <FiSend />

                        </button>

                    </form>

                </div>

            </div>
        </>
    );
};

export default Chat;