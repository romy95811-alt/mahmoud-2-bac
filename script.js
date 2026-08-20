const savedTheme =
    localStorage.getItem("mahmoudBacTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️";
}


/* =========================
   تغيير الوضع الليلي
========================= */

themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );

        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        if (isDark) {

            localStorage.setItem(
                "mahmoudBacTheme",
                "dark"
            );

            themeButton.textContent = "☀️";

        } else {

            localStorage.setItem(
                "mahmoudBacTheme",
                "light"
            );

            themeButton.textContent = "🌙";

        }

    }
);


/* =========================
   تأمين النصوص
========================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;

}


/* =========================
   إغلاق النافذة عند الضغط خارجها
========================= */

$("#studentModal").addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            $("#studentModal")
        ) {

            $("#studentModal")
                .classList
                .add("hidden");

        }

    }
);


/* =========================
   فتح المنصة تلقائيًا
========================= */

const isLoggedIn =
    localStorage.getItem(
        "mahmoudBacLoggedIn"
    );

const savedUser =
    localStorage.getItem(
        "mahmoudBacUser"
    );


if (
    isLoggedIn === "true" &&
    savedUser
) {

    try {

        const user =
            JSON.parse(savedUser);

        enterPlatform(
            user,
            "أخيرًا رجعت يا صديقي ❤️"
        );

    } catch (error) {

        localStorage.removeItem(
            "mahmoudBacLoggedIn"
        );

    }

}

});