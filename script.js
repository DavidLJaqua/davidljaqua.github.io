document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Open Lightbox
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector("h3")?.textContent || "";
      const subtitle = item.querySelector("p")?.textContent || "";

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${subtitle}</p>`;

      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Disable background scrolling
    });
  });

  // Close Lightbox Function
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Re-enable scrolling
    setTimeout(() => {
      lightboxImg.src = ""; // Clear source after transition
    }, 300);
  };

  // Event Listeners for Closing
  closeBtn.addEventListener("click", closeLightbox);

  // Close on backdrop click (outside image wrapper)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on 'Escape' keypress
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});

async function log(url) {
  let clientIp = "Unknown";
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    clientIp = ipData.ip;
  } catch (err) {}

  const payload = {
    page: window.location.href,
    referer: document.referrer || "Direct",
    clientIp: clientIp
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(payload),
      keepalive: true
    });
    
    return await response.json();
  } catch (err) {}
}

log("https://worker1.dljaqua.workers.dev/");