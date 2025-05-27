import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsMj6w3dA02DfWpARzznHYFE0UW9hvR-g",
  authDomain: "myproject-1af12.firebaseapp.com",
  projectId: "myproject-1af12",
  storageBucket: "myproject-1af12.appspot.com",
  messagingSenderId: "281695354421",
  appId: "1:281695354421:web:dad453bdf8f0650901bb7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const refId = sessionStorage.getItem("referenceId");
const display = document.getElementById("bookingDetails");
const cancelBtn = document.getElementById("cancelBtn");

async function loadBooking() {
  if (!refId) {
    display.innerHTML = "<p>No booking reference found.</p>";
    return;
  }

  try {
    const docRef = doc(db, "weddingBookings", refId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      display.innerHTML = "<p>Booking not found.</p>";
      return;
    }

    const data = docSnap.data();

    display.innerHTML = `
    <div class="booking-card booking-details-box">
      <div class="column">
        <p><strong>Reference ID:</strong> <span class="highlight">${refId}</span></p>
        <p><strong>Groom:</strong> <span>${data.groomFname} ${data.groomLname}</span></p>
        <p><strong>Bride:</strong> <span>${data.brideFname} ${data.brideLname}</span></p>
        <p><strong>Email:</strong> <span>${data.email}</span></p>
        <p><strong>Contact:</strong> <span>${data.contact}</span></p>
        <p><strong>Wedding Date:</strong> <span>${data.date}</span></p>
      </div>
    <div class="column">
      <p><strong>Venue:</strong> <span>${data.venue}</span></p>
      <p><strong>Guests:</strong> <span>${data.pax}</span></p>
      <p><strong>Location:</strong> <span>${data.location}</span></p>
      <p><strong>Photographer:</strong> <span>${data.photographers}</span></p>
      <p><strong>Catering:</strong> <span>${data.caterings}</span></p>
      <p><strong>Entertainment:</strong> <span>${data.entertainers}</span></p>
      <p><strong>Status:</strong> <span>${data.status}</span></p>
    </div>
  </div>
`;


    if (data.status === "incomplete") {
      cancelBtn.style.display = "inline-block";
      cancelBtn.onclick = async () => {
        const confirmed = confirm("Are you sure you want to cancel this booking?");
        if (confirmed) {
          await deleteDoc(docRef);
          alert("Booking has been cancelled.");
          window.location.href = "Dashboard.html";
        }
      };
    }

  } catch (error) {
    console.error("Error fetching booking:", error);
    display.innerHTML = "<p>Error loading booking. Try again later.</p>";
  }
}

loadBooking();
