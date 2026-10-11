const documentInput = document.getElementById("documentInput");
const chooseButton = document.getElementById("chooseButton");
const uploadArea = document.getElementById("uploadArea");
const analyzeButton = document.getElementById("analyzeButton");
const fileName = document.getElementById("fileName");

const loadingSection = document.getElementById("loadingSection");
const resultSection = document.getElementById("resultSection");
const errorSection = document.getElementById("errorSection");

const status = document.getElementById("status");
const trustScore = document.getElementById("trustScore");
const reasons = document.getElementById("reasons");
const aiSummary = document.getElementById("aiSummary");
const errorMessage = document.getElementById("errorMessage");

const newAnalysisButton = document.getElementById("newAnalysisButton");
const retryButton = document.getElementById("retryButton");

let selectedFile = null;


// Choose File button
chooseButton.addEventListener("click", function () {
    documentInput.click();
});


// Upload area click
uploadArea.addEventListener("click", function (event) {

    if (event.target !== chooseButton) {
        documentInput.click();
    }

});


// File selected
documentInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        selectedFile = null;
        fileName.textContent = "No file selected";
        analyzeButton.disabled = true;
        return;
    }

    selectedFile = file;

    fileName.textContent = file.name;

    analyzeButton.disabled = false;

});


// Analyze document
analyzeButton.addEventListener("click", async function () {

    if (!selectedFile) {
        return;
    }

    showLoading();

    const formData = new FormData();

    formData.append("file", selectedFile);


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/upload",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                "Server error: " + response.status + " " + errorText
            );

        }


        const data = await response.json();

        console.log("Backend response:", data);

        displayResult(data);

    }

    catch (error) {

        console.error("Error:", error);

        showError(error.message);

    }

});


// Display result
function displayResult(data) {

    loadingSection.style.display = "none";

    errorSection.style.display = "none";

    resultSection.style.display = "block";


    /*
       Backend response:
       {
           final_report: "..."
       }

       We first display the complete report.
    */

    if (data.final_report) {

        aiSummary.textContent = data.final_report;

    }
    else {

        aiSummary.textContent =
            "No AI report was returned by the backend.";

    }


    /*
       If your backend later returns separate
       status, trust_score and reasons fields,
       they can be displayed here.
    */

    if (data.status) {
        status.textContent = data.status;
    }

    if (data.trust_score !== undefined) {
        trustScore.textContent = data.trust_score;
    }

    if (Array.isArray(data.reasons)) {

        reasons.innerHTML = "";

        data.reasons.forEach(function (reason) {

            const li = document.createElement("li");

            li.textContent = reason;

            reasons.appendChild(li);

        });

    }

}


// Show loading
function showLoading() {

    resultSection.style.display = "none";

    errorSection.style.display = "none";

    loadingSection.style.display = "block";

}


// Show error
function showError(message) {

    loadingSection.style.display = "none";

    resultSection.style.display = "none";

    errorSection.style.display = "block";

    errorMessage.textContent = message;

}


// Analyze another document
newAnalysisButton.addEventListener("click", function () {

    resetPage();

});


// Retry
retryButton.addEventListener("click", function () {

    resetPage();

});


// Reset page
function resetPage() {

    selectedFile = null;

    documentInput.value = "";

    fileName.textContent = "No file selected";

    analyzeButton.disabled = true;

    resultSection.style.display = "none";

    loadingSection.style.display = "none";

    errorSection.style.display = "none";

}