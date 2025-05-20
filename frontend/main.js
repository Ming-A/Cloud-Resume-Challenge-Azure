window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionApi = 'https://azure.mingshome.xyz';

const getVisitCount = () => {
    fetch(functionApi)
    .then(response => {
        // Check if the HTTP response status is OK (200-299)
        if (!response.ok) {
            // If not OK, log the status and throw an error to be caught by .catch()
            console.error("HTTP Error Status:", response.status);
            // You could try to get more error details if your function provides them
            return response.text().then(errorText => {
                 throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            });
        }
        // If the response is OK, get the body as plain text
        return response.text();
    })
    .then(countValue => {
        // countValue is the string returned by your Azure Function (e.g., "1", "42")
        console.log("Website called function API. Raw response (count):", countValue);
        
        // Update the HTML element with the ID "counter"
        const counterElement = document.getElementById("counter");
        if (counterElement) {
            counterElement.innerText = countValue;
        } else {
            console.error("Element with ID 'counter' not found.");
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch operation or in the .then() blocks
        console.error("Failed to fetch or process visit count:", error);
        
        const counterElement = document.getElementById("counter");
        if (counterElement) {
            counterElement.innerText = "Error"; // Display an error message on the page
        }
    });
}