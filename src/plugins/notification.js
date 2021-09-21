import {store as RNCStore} from "react-notifications-component";

/**
 * A variable for creating notifications. Notifications will showed the top right corner of the web page for 5 second. Using example:
 * 
 * ->notification.add("type - danger, warning etc.", "title", "message")
 */

const notification = {
    add: function (type, title, message) {
        RNCStore.addNotification({
            title,
            message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
}

export default notification;