document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       اختصارات
    ========================== */

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* =========================
       الصفحات
    ========================== */

    const landingPage =
        $("#landingPage");

    const authPage =
        $("#authPage");

    const platformPage =
        $("#platformPage");


    /* =========================
       عناصر تسجيل الدخول
    ========================== */

    const startButton =
        $("#startButton");

    const backToLanding =
        $("#backToLanding");

    const loginTab =
        $("#loginTab");

    const registerTab =
        $("#registerTab");

    const loginForm =
        $("#loginForm");

    const registerForm =
        $("#registerForm");


    /* =========================
       عناصر المنصة
    ========================== */

    const sideMenu =
        $("#sideMenu");

    const menuButton =
        $("#menuButton");

    const closeMenu =
        $("#closeMenu");

    const themeButton =
        $("#themeButton");

    const logoutButton =
        $("#logoutButton");

    const studentDataButton =
        $("#studentDataButton");

    const subjectSection =
        $("#subjectSection");

    const subjectTitle =
        $("#subjectTitle");

    const contentList =
        $("#contentList");

    const backToSubjects =
        $("#backToSubjects");


    /* =========================
       البيانات
    ========================== */

    const subjects = {

        arabic: {
            name: "📚 اللغة العربية",

            videos: [
                "شرح الدرس الأول",
                "شرح الدرس الثاني",
                "المراجعة الشاملة"
            ],

            files: [
                "ملزمة اللغة العربية",
                "مراجعة اللغة العربية"
            ],

            tests: [
                "اختبار اللغة العربية رقم 1",
                "اختبار اللغة العربية رقم 2"
            ]
        },


        english: {
            name: "🇬🇧 اللغة الإنجليزية",

            videos: [
                "شرح Unit 1",
                "شرح Unit 2",
                "مراجعة اللغة الإنجليزية"
            ],

            files: [
                "ملزمة اللغة الإنجليزية",
                "مراجعة English"
            ],

            tests: [
                "English Test 1",
                "English Test 2"
            ]
        },


        history: {
            name: "🏛️ التاريخ",

            videos: [
                "شرح الدرس الأول",
                "شرح الدرس الثاني",
                "مراجعة التاريخ"
            ],

            files: [
                "ملزمة التاريخ",
                "مراجعة التاريخ"
            ],

            tests: [
                "اختبار التاريخ رقم 1",
                "اختبار التاريخ رقم 2"
            ]
        },


        programming: {
            name: "💻 البرمجة",

            videos: [
                "مقدمة في البرمجة",
                "شرح أساسيات البرمجة",
                "تطبيق عملي"
            ],

            files: [
                "ملزمة البرمجة",
                "ملخص البرمجة"
            ],

            tests: [
                "اختبار البرمجة رقم 1",
                "اختبار البرمجة رقم 2"
            ]
        }

    };


    /* =========================
       تغيير الصفحة
    ========================== */

    function showPage(page) {

        landingPage.classList.add("hidden");

        authPage.classList.add("hidden");

        platformPage.classList.add("hidden");

        page.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =========================
       الرسائل
    ========================== */

    let toastTimer;

    function showToast(message) {

        const toast =
            $("#toast");

        toast.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);
    }


    /* =========================
       زر اتفضل يا باشا
    ========================== */

    startButton.addEventListener(
        "click",
        function () {

            showPage(authPage);

            showLogin();

        }
    );


    /* =========================
       الرجوع للرئيسية
    ========================== */

    backToLanding.addEventListener(
        "click",
        function () {

            showPage(landingPage);

        }
    );


    /* =========================
       تسجيل الدخول / إنشاء الحساب
    ========================== */

    function showLogin() {

        loginForm.classList.remove("hidden");

        registerForm.classList.add("hidden");

        loginTab.classList.add("active");

        registerTab.classList.remove("active");

    }


    function showRegister() {

        registerForm.classList.remove("hidden");

        loginForm.classList.add("hidden");

        registerTab.classList.add("active");

        loginTab.classList.remove("active");

    }


    loginTab.addEventListener(
        "click",
        showLogin
    );


    registerTab.addEventListener(
        "click",
        showRegister
    );


    /* =========================
       إنشاء حساب
    ========================== */

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                $("#registerName")
                .value
                .trim();


            const email =
                $("#registerEmail")
                .value
                .trim()
                .toLowerCase();


            const password =
                $("#registerPassword")
                .value;


            const confirmPassword =
                $("#registerConfirm")
                .value;


            if (name.length < 2) {

                showToast(
                    "من فضلك اكتب اسمك بالكامل ✍️"
                );

                return;
            }


            if (password.length < 6) {

                showToast(
                    "كلمة المرور يجب أن تكون 6 أحرف على الأقل 🔐"
                );

                return;
            }


            if (password !== confirmPassword) {

                showToast(
                    "كلمتا المرور غير متطابقتين ❌"
                );

                return;
            }


            const existingUser =
                localStorage.getItem(
                    "mahmoudBacUser"
                );


            if (existingUser) {

                const oldUser =
                    JSON.parse(existingUser);


                if (oldUser.email === email) {

                    showToast(
                        "هذا البريد مسجل بالفعل. سجل دخولك."
                    );

                    showLogin();

                    return;
                }
            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "mahmoudBacUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "mahmoudBacLoggedIn",
                "true"
            );


            enterPlatform(
                user,
                "أهلًا بك يا " +
                name +
                " ❤️"
            );


            registerForm.reset();


            showToast(
                "تم إنشاء الحساب بنجاح 🎉"
            );

        }
    );


    /* =========================
       تسجيل الدخول
    ========================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                $("#loginEmail")
                .value
                .trim()
                .toLowerCase();


            const password =
                $("#loginPassword")
                .value;


            const savedUser =
                localStorage.getItem(
                    "mahmoudBacUser"
                );


            if (!savedUser) {

                showToast(
                    "لا يوجد حساب. قم بإنشاء حساب أولًا."
                );

                showRegister();

                return;
            }


            let user;


            try {

                user =
                    JSON.parse(savedUser);

            } catch (error) {

                localStorage.removeItem(
                    "mahmoudBacUser"
                );

                showToast(
                    "حدث خطأ في بيانات الحساب."
                );

                return;
            }


            if (
                email !== user.email ||
                password !== user.password
            ) {

                showToast(
                    "البريد الإلكتروني أو كلمة المرور غير صحيحة ❌"
                );

                return;
            }


            localStorage.setItem(
                "mahmoudBacLoggedIn",
                "true"
            );


            enterPlatform(
                user,
                "أخيرًا رجعت يا صديقي ❤️"
            );


            loginForm.reset();


            showToast(
                "تم تسجيل الدخول بنجاح 🎉"
            );

        }
    );


    /* =========================
       دخول المنصة
    ========================== */

    function enterPlatform(
        user,
        message
    ) {

        showPage(platformPage);

        $("#welcomeMessage").textContent =
            message;

        subjectSection.classList.add(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================
       نسيت كلمة المرور
    ========================== */

    $("#forgotPassword").addEventListener(
        "click",
        function () {

            showToast(
                "استرجاع كلمة المرور سيتم تفعيله مع قاعدة البيانات 🔐"
            );

        }
    );


    /* =========================
       القائمة
    ========================== */

    menuButton.addEventListener(
        "click",
        function () {

            sideMenu.classList.add("open");

        }
    );


    closeMenu.addEventListener(
        "click",
        function () {

            sideMenu.classList.remove("open");

        }
    );


    /* =========================
       بيانات الطالب
    ========================== */

    studentDataButton.addEventListener(
        "click",
        function () {

            const savedUser =
                localStorage.getItem(
                    "mahmoudBacUser"
                );


            if (!savedUser) {

                showToast(
                    "لا توجد بيانات طالب."
                );

                return;
            }


            const user =
                JSON.parse(savedUser);


            $("#studentInfo").innerHTML = `

                <div class="student-row">
                    👤 <strong>الاسم:</strong>
                    ${escapeHTML(user.name)}
                </div>

                <div class="student-row">
                    📧 <strong>البريد:</strong>
                    ${escapeHTML(user.email)}
                </div>

                <div class="student-row">
                    🎓 <strong>المسار:</strong>
                    الهندسة وعلوم الحاسب
                </div>

            `;


            $("#studentModal")
                .classList
                .remove("hidden");


            sideMenu.classList.remove("open");

        }
    );


    /* =========================
       إغلاق بيانات الطالب
    ========================== */

    $("#closeStudentModal").addEventListener(
        "click",
        function () {

            $("#studentModal")
                .classList
                .add("hidden");

        }
    );


    /* =========================
       تسجيل الخروج
    ========================== */

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "mahmoudBacLoggedIn"
            );


            sideMenu.classList.remove(
                "open"
            );


            showPage(
                landingPage
            );


            showToast(
                "يعز علينا خروجك يا باشا ❤️"
            );

        }
    );


    /* =========================
       المواد
    ========================== */

    $$(".subject-card").forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const subjectID =
                        card.dataset.subject;


                    openSubject(
                        subjectID
                    );

                }
            );

        }
    );


    /* =========================
       فتح المادة
    ========================== */

    let currentSubject = null;


    function openSubject(subjectID) {

        const subject =
            subjects[subjectID];


        if (!subject) {

            showToast(
                "المادة غير موجودة."
            );

            return;
        }


        currentSubject =
            subjectID;


        subjectTitle.textContent =
            subject.name;


        subjectSection.classList.remove(
            "hidden"
        );


        $$(".content-tab").forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        const firstTab =
            document.querySelector(
                '.content-tab[data-type="videos"]'
            );


        firstTab.classList.add(
            "active"
        );


        showContent(
            subject,
            "videos"
        );


        subjectSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    /* =========================
       عرض المحتوى
    ========================== */

    function showContent(
        subject,
        type
    ) {

        contentList.innerHTML = "";


        const items =
            subject[type] || [];


        if (items.length === 0) {

            contentList.innerHTML = `

                <div class="content-item">

                    <strong>
                        لا يوجد محتوى حاليًا 📭
                    </strong>

                    <small>
                        سيتم إضافة المحتوى قريبًا.
                    </small>

                </div>

            `;

            return;
        }


        items.forEach(
            function (item) {

                let icon = "🎥";

                let description =
                    "فيديو شرح";


                if (type === "files") {

                    icon = "📄";

                    description =
                        "ملزمة شرح";

                }


                if (type === "tests") {

                    icon = "📝";

                    description =
                        "اختبار تدريبي";

                }


                const contentItem =
                    document.createElement(
                        "div"
                    );


                contentItem.className =
                    "content-item";


                contentItem.innerHTML = `

                    <strong>
                        ${icon}
                        ${escapeHTML(item)}
                    </strong>

                    <small>
                        ${description}
                        — سيتم ربط المحتوى الحقيقي لاحقًا.
                    </small>

                `;


                contentList.appendChild(
                    contentItem
                );

            }
        );

    }


    /* =========================
       تبويبات المادة
    ========================== */

    $$(".content-tab").forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    $$(".content-tab")
                        .forEach(
                            function (tab) {

                                tab.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    if (!currentSubject) {
                        return;
                    }


                    showContent(
                        subjects[currentSubject],
                        button.dataset.type
                    );

                }
            );

        }
    );


    /* =========================
       الرجوع للمواد
    ========================== */

    backToSubjects.addEventListener(
        "click",
        function () {

            subjectSection.classList.add(
                "hidden"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       الوضع الليلي
    ========================== */

    const savedTheme =
        localStorage.getItem(
            "mahmoudBacTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

        themeButton.textContent =
            "☀️";

    }


    themeButton.addEventListener(
        "click",
        function () {

            const dark =
                document.body.classList.toggle(
                    "dark"
                );


            if (dark) {

                themeButton.textContent =
                    "☀️";

                localStorage.setItem(
                    "mahmoudBacTheme",
                    "dark"
                );

            } else {

                themeButton.textContent =
                    "🌙";

                localStorage.setItem(
                    "mahmoudBacTheme",
                    "light"
                );

            }

        }
    );


    /* =========================
       استعادة الجلسة
    ========================== */

    const loggedIn =
        localStorage.getItem(
            "mahmoudBacLoggedIn"
        );


    const savedUser =
        localStorage.getItem(
            "mahmoudBacUser"
        );


    if (
        loggedIn === "true" &&
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

    } else {

        /*
         * مهم:
         * لو الطالب مش مسجل دخول،
         * يظل خارج المنصة.
         */

        showPage(
            landingPage
        );

    }


    /* =========================
       حماية بسيطة من إدخال HTML
    ========================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});