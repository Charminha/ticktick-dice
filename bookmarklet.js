(function() {
    function getRandomTask() {
        let tasks = document.querySelectorAll(".taskItemWrapper_36-ES:not(.checked) .title span");
        if (tasks.length === 0) {
            taskDisplay.innerHTML = "No incomplete tasks found!";
            return;
        }
        let randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        taskDisplay.innerHTML = randomTask.textContent.trim();
    }

    // If the task box already exists, just show a new task
    let taskBox = document.getElementById("randomTaskBox");
    if (taskBox) {
        getRandomTask();
        return;
    }

    // Create the floating task box
    taskBox = document.createElement("div");
    taskBox.id = "randomTaskBox";
    Object.assign(taskBox.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "320px",
        padding: "20px",
        borderRadius: "12px",
        background: "rgba(0, 0, 0, 0.85)",  // Dark background
        color: "#ffffff",  // White text for readability
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        zIndex: "10000",
        textAlign: "center",
        cursor: "pointer",
        transition: "opacity 0.3s ease-in-out"
    });

    // Create task text area
    let taskDisplay = document.createElement("div");
    taskDisplay.id = "randomTaskDisplay";
    taskDisplay.style.padding = "15px";
    taskDisplay.style.marginBottom = "30px";  // Extra space below text
    taskDisplay.style.fontWeight = "bold";
    taskDisplay.style.color = "#ffffff";  // Explicitly white text
    taskDisplay.innerHTML = "Loading task...";

    // Create close button (❌)
    let closeButton = document.createElement("div");
    closeButton.innerHTML = "❌";
    Object.assign(closeButton.style, {
        position: "absolute",
        top: "8px",
        right: "10px",
        cursor: "pointer",
        fontSize: "18px",
        color: "#ffffff"  // White for visibility
    });
    closeButton.onclick = function() {
        document.body.removeChild(taskBox);
        document.removeEventListener("keydown", handleKeyPress);
    };

    // Create "Let's Do This!" Button (💪🏽 → 🎉)
    let checkButton = document.createElement("div");
    checkButton.innerHTML = "💪🏽";
    Object.assign(checkButton.style, {
        position: "absolute",
        bottom: "20px", 
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "22px",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "opacity 0.3s ease-in-out"
    });

    // Animation & Close when clicked
    checkButton.onclick = function() {
        checkButton.style.opacity = "0";
        setTimeout(() => {
            checkButton.innerHTML = "🎉";  // Change from 💪🏽 to 🎉
            checkButton.style.opacity = "1";
        }, 300); // Fade transition time

        setTimeout(() => {
            document.body.removeChild(taskBox);
            document.removeEventListener("keydown", handleKeyPress);
        }, 800);  // Delay to see animation
    };

    // Add elements to the floating box
    taskBox.appendChild(closeButton);
    taskBox.appendChild(taskDisplay);
    taskBox.appendChild(checkButton);
    document.body.appendChild(taskBox);

    // Function to handle keypress (press 'R' for new task)
    function handleKeyPress(event) {
        if (event.key === "r" || event.key === "R") {
            getRandomTask();
        }
    }

    // Add key event listener
    document.addEventListener("keydown", handleKeyPress);

    // Get the first random task
    getRandomTask();
})();
