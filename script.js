document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const clickCountDisplay = document.getElementById("clickCount");
  const shareCompleteMsg = document.getElementById("shareCompleteMsg");
  const confirmation = document.getElementById("confirmation");
  let clickCount = 0;

  whatsappBtn.addEventListener("click", () => {
    clickCount++;
    clickCountDisplay.textContent = `Click count: ${clickCount}/5`;
    if (clickCount >= 5) {
      shareCompleteMsg.style.display = "block";
    }

    const message = encodeURIComponent("Join me in the Tech For Girls program! 🚀 Sign up now!");
    const link = `https://api.whatsapp.com/send?text=${message}`;
    window.open(link, "_blank");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (clickCount < 5) {
      alert("Please share on WhatsApp at least 5 times to continue.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const college = document.getElementById("college").value;
    const fileInput = document.getElementById("screenshot");

    if (!fileInput.files[0]) {
      alert("Please upload a screenshot.");
      return;
    }

    // Upload screenshot to Imgur anonymously OR another image hosting
    // For demo, we skip real upload — use a placeholder link
    // You can integrate with Firebase or Imgur API if you want to store real file

    const screenshotLink = "https://example.com/screenshot.jpg"; // Replace if you integrate real upload

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("screenshot", screenshotLink);

    fetch("https://script.google.com/macros/s/AKfycbwywjNvJjq-qujsk1cgo0FXklbO1LqTVJf5dj39oPtnjiGlZBFtmU2WDIbnnI6qT6HlCw/exec", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      console.log("Success:", data);
      form.style.display = "none";
      confirmation.style.display = "block";
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Failed to submit. Please try again.");
    });
  });
});
