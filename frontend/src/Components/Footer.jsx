import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the necessary FontAwesomeIcon
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Import the necessary icons

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p>
          &copy; {new Date().getFullYear()} E-Sport-Champ. All rights reserved.
        </p>
        <div style={styles.socialIcons}>
          <a
            href='YOUR_FACEBOOK_LINK'
            target='_blank'
            rel='noopener noreferrer'
            style={styles.socialIcon}>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              size='2x'
              style={{ color: "blue" }}
            />
          </a>
          <a
            href='YOUR_TWITTER_LINK'
            target='_blank'
            rel='noopener noreferrer'
            style={styles.socialIcon}>
            <FontAwesomeIcon
              icon={faTwitter}
              size='2x'
              style={{ color: "blue" }}
            />
          </a>
          <a
            href='YOUR_INSTAGRAM_LINK'
            target='_blank'
            rel='noopener noreferrer'
            style={styles.socialIcon}>
            <FontAwesomeIcon
              icon={faInstagram}
              size='2x'
              style={{ color: "purple" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "black",
    // padding: "5px 0",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
    color: "grey",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  socialIcon: {
    margin: "0 10px",
  },
};

export default Footer;
