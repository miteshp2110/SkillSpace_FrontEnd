import React, { useState, useEffect } from "react";
import "./NotificationCard.css";

const NotificationCard = ({ message, type }) => {
    const [visible, setVisible] = useState(true);

    // Automatically hide the notification after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`notification-card ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default NotificationCard;
