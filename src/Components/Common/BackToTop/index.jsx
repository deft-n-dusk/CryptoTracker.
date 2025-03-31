import React, { useEffect, useRef } from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import "./style.css"

function BackToTop() {

        // Get the button:
        const buttonRef = useRef(null); // Create a reference for the button

      // When the user scrolls down 20px from the top of the document, show the button
      useEffect(() => {
        function scrollFunction() {
          if (buttonRef.current) {
            if (window.scrollY > 300) {
              buttonRef.current.style.display = "flex";
            } else {
              buttonRef.current.style.display = "none";
            }
          }
        }
    
        window.addEventListener("scroll", scrollFunction);
    
        // Cleanup event listener when the component unmounts
        return () => window.removeEventListener("scroll", scrollFunction);
      }, []);
    
      function topFunction() {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling to top
      }
    

    return (
      <div className='back-to-top-btn' id="myBtn" onClick={() => topFunction()}>
          <ArrowUpwardRoundedIcon style={{color: "var(--blue)"}}/>
      </div>
    )
  }

export default BackToTop