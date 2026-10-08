/* =================================
   EMERGENCY HELP HUB
   JAVASCRIPT
================================= */


/* =================================
   FIRST AID
================================= */

function showInfo(type) {

    let title = "";
    let message = "";

    if (type === "bleeding") {

        title = "🩸 Bleeding";

        message =
            "For serious bleeding, seek emergency medical help immediately.\n\n" +
            "Apply firm, continuous pressure with a clean cloth " +
            "or dressing while waiting for professional help.";
    }

    else if (type === "burns") {

        title = "🔥 Burns";

        message =
            "Cool the affected area with cool running water.\n\n" +
            "Do not apply ice directly to the burn.\n\n" +
            "For serious burns, seek medical care.";
    }

    else if (type === "fainting") {

        title = "😵 Fainting";

        message =
            "Check whether the person responds and is breathing normally.\n\n" +
            "If the person does not respond or is not breathing normally, " +
            "call emergency services immediately.";
    }

    else if (type === "cpr") {

        title = "🫀 CPR";

        message =
            "If an adult is unresponsive and not breathing normally, " +
            "call emergency services immediately.\n\n" +
            "Follow the emergency dispatcher's instructions.";
    }

    alert(title + "\n\n" + message);
}


/* =================================
   LOCATION
================================= */

function getLocation() {

    const result = document.getElementById("location-result");

    console.log("Location button clicked");

    if (!navigator.geolocation) {

        result.innerHTML = `
            <div class="location-success">
                ❌ Your browser does not support location services.
            </div>
        `;

        return;
    }

    result.innerHTML = `
        <div class="location-success">
            📍 Detecting your location...<br>
            Please allow location permission if Chrome asks.
        </div>
    `;

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            window.userLatitude = latitude;
            window.userLongitude = longitude;

            result.innerHTML = `
                <div class="location-success">

                    <h3>✅ Location Detected</h3>

                    <p>Your location has been detected successfully.</p>

                    <p>
                        Latitude: ${latitude.toFixed(5)}<br>
                        Longitude: ${longitude.toFixed(5)}
                    </p>

                    <p>
                        You can now choose a nearby emergency resource.
                    </p>

                </div>
            `;
        },

        function(error) {

            console.error("Location Error:", error);

            let message = "";

            if (error.code === 1) {

                message =
                    "❌ Location permission was denied.<br><br>" +
                    "Please allow Location permission in Chrome site settings.";
            }

            else if (error.code === 2) {

                message =
                    "❌ Your device could not determine your location.<br><br>" +
                    "Check that Location Services are enabled on Windows.";
            }

            else if (error.code === 3) {

                message =
                    "❌ Location request timed out.<br><br>" +
                    "Please try again.";
            }

            else {

                message =
                    "❌ Unable to detect your location.<br><br>" +
                    "Please check your browser and Windows location settings.";
            }

            result.innerHTML = `
                <div class="location-success">
                    ${message}
                </div>
            `;
        },

        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }
    );
}


/* =================================
   NEARBY SEARCH
================================= */

function findNearby(place) {

    if (
        window.userLatitude === undefined ||
        window.userLongitude === undefined
    ) {

        alert("Please click 'Use My Location' first.");

        return;
    }

    const latitude = window.userLatitude;
    const longitude = window.userLongitude;

    const mapsURL =
        "https://www.google.com/maps/search/" +
        encodeURIComponent(place) +
        "/@" +
        latitude +
        "," +
        longitude +
        ",14z";

    window.open(mapsURL, "_blank");
}
