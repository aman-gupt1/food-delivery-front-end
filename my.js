document.getElementById("sendBtn").addEventListener("click", function() {
  const msg = document.getElementById("msg").value.trim();
  const statusEl = document.getElementById("status");

  if (!msg) {
    statusEl.textContent = "Please type a message!";
    statusEl.style.color = "red";
    return;
  }

  // Variables to match your EmailJS template
  const params = {
    message: msg
  };

  emailjs.send("service_qh7029r", "template_ts14i4c", params)
    .then(() => {
      statusEl.textContent = "Message sent successfully 🎉";
      statusEl.style.color = "green";
      document.getElementById("msg").value = "";
    })
    .catch(err => {
      console.error(err);
      statusEl.textContent = "Failed to send. Try again.";
      statusEl.style.color = "red";
    });
});
