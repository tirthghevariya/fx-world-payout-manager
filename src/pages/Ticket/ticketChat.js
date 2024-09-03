import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  getTicketChatList,
  getOneTicketList,
  createTicketChat,
  editTicketChat,
} from "../../slices/thunks";
import { useParams } from "react-router-dom";

const TicketModule = () => {
  const dispatch = useDispatch();
  const [, setFetchingData] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState({
    isEditing: false,
    id: null,
    content: "",
  });
  const chatListRef = useRef(null);

  const { filterParams, ticketChatList, oneTicketList } = useSelector(
    (state) => state.ticket
  );
  const { id } = useParams();

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  useEffect(() => {
    scrollToBottom();
  }, [ticketChatList]);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getTicketChatList(id));
    dispatch(getOneTicketList(id));
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      ticketId: id,
      senderId: 1,
      receiverId: 3,
      message: message,
      status: "unread",
    };

    dispatch(createTicketChat(newMessage)).then(() => {
      setMessage("");
      fetchData();
    });
  };

  const handleEditClick = (commentId, content) => {
    setEditMode({ isEditing: true, id: commentId, content });
  };

  const handleEditChange = (e) => {
    setEditMode({ ...editMode, content: e.target.value });
  };

  const handleEditSend = () => {
    const updatedMessage = {
      id: editMode.id,
      ticketId: id,
      senderId: 1,
      receiverId: 3,
      message: editMode.content,
      status: "unread",
    };

    dispatch(editTicketChat(updatedMessage)).then(() => {
      setEditMode({ isEditing: false, id: null, content: "" });
      fetchData();
    });
  };

  const handleEditCancel = () => {
    setEditMode({ isEditing: false, id: null, content: "" });
  };

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editMode.isEditing) {
        handleEditSend();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="ticket-container margin-top">
      <main className="ticket-main-content">
        <h5>{`Ticket #${
          oneTicketList && oneTicketList.data && oneTicketList.data.id
        }: ${
          oneTicketList && oneTicketList.data && oneTicketList.data.subject
        } || Priority - ${
          oneTicketList && oneTicketList.data && oneTicketList.data.priority
        }`}</h5>
        <p className="ticket-last-updated">Last Updated 1 Hr ago</p>
        <div className="ticket-chat-list" ref={chatListRef}>
          {ticketChatList &&
            ticketChatList.data &&
            ticketChatList.data.map((comment) => (
              <div
                key={comment.id}
                className={`ticket-comment ${
                  comment.senderId === 1 ? "user-message" : ""
                }`}
              >
                {editMode.isEditing && editMode.id === comment.id ? (
                  <>
                    <input
                      value={editMode.content}
                      onChange={handleEditChange}
                      style={{
                        width: "100%",
                        backgroundColor:
                          comment.senderId === 1 ? "" : "#F0F0F0",
                        border: "none",
                        padding: "5px 10px",
                      }}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="edit-buttons">
                      <Button
                        outline
                        color="primary"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" onClick={handleEditSend}>
                        Send
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{comment.message}</p>
                    <p className="ticket-timestamp">{comment.createdAt}</p>
                    <div className="">
                      <>
                        <FontAwesomeIcon
                          icon={faPen}
                          className={`edit-icon ${
                            comment.senderId === 1 ? "user-edit-icon" : ""
                          }`}
                          onClick={() =>
                            handleEditClick(comment.id, comment.message)
                          }
                        />
                      </>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="ticket-comment-input">
          <input
            type="text"
            placeholder="Type a message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="btn btn-primary add-button-margin"
            color="primary"
            type="button"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TicketModule;
