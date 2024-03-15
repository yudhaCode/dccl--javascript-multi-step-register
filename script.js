// Define variables at the top
const userDataArr = [];
const userData = document.getElementById("user-data");
const btnInputData = document.getElementById("btnInputData");
const chooseTopics = document.getElementById("choose-topics");
const btnChooseTopics = document.getElementById("btn-choose-topics");
const summary = document.getElementById("summary");
let currentStep = 1;

// Function to update steps
function updateSteps() {
  const circles = document.querySelectorAll(".circles .circle");

  circles.forEach((circle, index) => {
    const isActive = index < currentStep;
    circle.classList.toggle("active", isActive);

    const activeBgSpan = circle.querySelector(".active-bg");
    if (activeBgSpan) {
      circle.removeChild(activeBgSpan); // Remove active-bg span if it exists
    }

    if (isActive) {
      if (index === currentStep - 1) {
        const activeBgSpan = document.createElement("span");
        activeBgSpan.classList.add("active-bg");
        circle.appendChild(activeBgSpan); // Add active-bg span to active circle
      }
    }
  });

  const stepCounter = document.querySelector(".steps p");
  stepCounter.textContent = `Step ${currentStep} of ${circles.length}`;
}

// Function to validate form inputs
function validateFormInputs(input, errorElement, errorMessage) {
  if (input.value.trim() === "") {
    errorElement.textContent = errorMessage;
    return false;
  }
  errorElement.textContent = "";
  return true;
}

// Event listener for input data form submission
btnInputData.addEventListener("click", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const isValidName = validateFormInputs(
    nameInput,
    nameError,
    "Name is required"
  );
  const isValidEmail = validateFormInputs(
    emailInput,
    emailError,
    "Email is required"
  );

  if (isValidName && isValidEmail) {
    userDataArr.push({
      name: nameInput.value,
      email: emailInput.value,
      topics: [],
    });
    userData.reset();
    userData.classList.add("hide");
    chooseTopics.classList.remove("hide");
    currentStep = 2;
    updateSteps();
  }
});

// Event listener for choosing topics
document
  .querySelectorAll('.choose-topic input[type="checkbox"]')
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const chooseTopic = this.parentNode;
      chooseTopic.classList.toggle("active");
      const userIndex = userDataArr.length - 1;
      if (this.checked) {
        userDataArr[userIndex].topics.push(this.value);
      } else {
        const index = userDataArr[userIndex].topics.indexOf(this.value);
        if (index !== -1) {
          userDataArr[userIndex].topics.splice(index, 1);
        }
      }
      console.log(userDataArr);
    });
  });

// Event listener for choosing topics form submission
btnChooseTopics.addEventListener("click", (event) => {
  event.preventDefault();

  // Check if the user has chosen at least one topic
  if (
    userDataArr.length > 0 &&
    userDataArr[userDataArr.length - 1].topics.length > 0
  ) {
    chooseTopics.classList.add("hide");
    summary.classList.remove("hide");
    currentStep = 3; // Move to the next step
    updateSteps(); // Update the steps
    displayLatestUserData();
  } else {
    alert("Please choose at least one topic before proceeding.");
  }
});

// Function to display latest user data
function displayLatestUserData() {
  if (userDataArr.length > 0) {
    const latestUserData = userDataArr[userDataArr.length - 1];
    const userNameElement = document.querySelector(
      ".user-data p:nth-child(1) span"
    );
    const userEmailElement = document.querySelector(
      ".user-data p:nth-child(2) span"
    );
    userNameElement.textContent = latestUserData.name || "---";
    userEmailElement.textContent = latestUserData.email || "---";
    const topicsList = document.querySelector(".form-section ul");
    topicsList.innerHTML = "";
    latestUserData.topics.forEach(function (topic) {
      const li = document.createElement("li");
      li.textContent = topic;
      topicsList.appendChild(li);
    });
  }
}

// Event listener for summary form submission
document.getElementById("btn-summary").addEventListener("click", (event) => {
  event.preventDefault();
  alert("✅ Success");
  location.reload();
});

// Initial call to update steps
updateSteps();
