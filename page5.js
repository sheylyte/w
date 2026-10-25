/* =========================================
   LARCK ME JAVASCRIPT
========================================= */


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://hxtwdzvnqtxoutdetfoy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_hEot0ds6XIcLYo7Fj8xtUQ_0ICFxMBV";

const larckSupabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    ); 


/* =========================================
   CURRENT USER PROFILE
========================================= */

let currentProfile = null;


/* =========================================
   LOAD USER PROFILE
========================================= */

async function loadUserProfile() {

    try {

        /* GET CURRENT USER */

        const {
            data: {
                user
            },
            error: userError
        } = await larckSupabase.auth.getUser();


        if (userError || !user) {

            window.location.href = "page1.html";

            return;

        }


        /* GET PROFILE */

        const {
            data: profile,
            error: profileError
        } = await larckSupabase
            .from("profiles")
            .select(
                "username, larck_id, country, profile_picture"
            )
            .eq("id", user.id)
            .maybeSingle();


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

            alert(
                "Something went wrong while loading your profile."
            );

            return;

        }


        if (!profile) {

            console.error(
                "No profile found."
            );

            return;

        }


        /* =====================================
           SAVE PROFILE
        ====================================== */

        currentProfile = profile;


        /* =====================================
           USERNAME
        ====================================== */

        const usernameElement =
            document.getElementById("username");


        if (usernameElement) {

            usernameElement.textContent =
                profile.username || "LARCK User";

        }


        /* =====================================
           LARCK ID
        ====================================== */

        const profileId =
            document.getElementById("profileId");


        if (profileId) {

            profileId.textContent =
                "ID: " +
                (profile.larck_id || "--------");

        }


        /* =====================================
           COUNTRY FLAG
        ====================================== */

        const countryFlag =
            document.getElementById("countryFlag");


        if (countryFlag) {

            const country =
                String(profile.country || "")
                    .trim()
                    .toLowerCase();


            const flags = {

                "nigeria": "🇳🇬",
                "ghana": "🇬🇭",
                "kenya": "🇰🇪",
                "south africa": "🇿🇦",
                "ethiopia": "🇪🇹",
                "philippines": "🇵🇭",
                "united kingdom": "🇬🇧",
                "united states": "🇺🇸",
                "canada": "🇨🇦",
                "india": "🇮🇳",
                "united arab emirates": "🇦🇪",
                "germany": "🇩🇪",
                "france": "🇫🇷",
                "italy": "🇮🇹",
                "spain": "🇪🇸",
                "australia": "🇦🇺",

                "ng": "🇳🇬",
                "gh": "🇬🇭",
                "ke": "🇰🇪",
                "za": "🇿🇦",
                "et": "🇪🇹",
                "ph": "🇵🇭",
                "gb": "🇬🇧",
                "uk": "🇬🇧",
                "us": "🇺🇸",
                "usa": "🇺🇸",
                "ca": "🇨🇦",
                "in": "🇮🇳",
                "ae": "🇦🇪",
                "uae": "🇦🇪",
                "de": "🇩🇪",
                "fr": "🇫🇷",
                "it": "🇮🇹",
                "es": "🇪🇸",
                "au": "🇦🇺"

            };


            countryFlag.textContent =
                flags[country] || "🌍";

        }


        /* =====================================
           PROFILE AVATAR
        ====================================== */

        const avatar =
            document.getElementById("profileAvatar");


        if (avatar) {

            if (profile.profile_picture) {

                avatar.innerHTML =
                    `
                    <img
                        src="${profile.profile_picture}"
                        alt="Profile"
                        style="
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            object-position:center;
                            border-radius:50%;
                            display:block;

                        "
                    >
                    `;

            } else {

                avatar.textContent =
                    getAvatarLetter(
                        profile.username
                    );

            }

        }


        /* =====================================
           SAVE CURRENT LARCK ID
        ====================================== */

        window.currentLarckId =
            profile.larck_id || "";


    } catch (error) {

        console.error(
            "ME page error:",
            error
        );

        alert(
            "Something went wrong while loading your profile."
        );

    }

}


/* =========================================
   AVATAR LETTER
========================================= */

function getAvatarLetter(username) {

    if (!username) {

        return "L";

    }


    return username
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =========================================
   COPY USER ID
========================================= */

const copyId =
    document.getElementById("copyId");


if (copyId) {

    copyId.addEventListener(
        "click",
        function () {

            const userId =
                window.currentLarckId || "";


            if (!userId) {

                alert(
                    "Your LARCK ID is still loading."
                );

                return;

            }


            if (navigator.clipboard) {

                navigator.clipboard
                    .writeText(userId)

                    .then(function () {

                        alert(
                            "LARCK ID copied: " +
                            userId
                        );

                    })

                    .catch(function () {

                        alert(
                            "Your LARCK ID is: " +
                            userId
                        );

                    });

            } else {

                alert(
                    "Your LARCK ID is: " +
                    userId
                );

            }

        }
    );

}



/* =========================================
   OPEN LARCK WALLET
========================================= */

const coinsCard = document.getElementById("coinsCard");

if (coinsCard) {
    coinsCard.addEventListener("click", function () {
        window.location.href = "wallet.html";
    });
}




/* =========================================
   OPEN LARCK POINTS PAGE
========================================= */

const pointsCard = document.getElementById("pointsCard");

if (pointsCard) {
    pointsCard.addEventListener("click", function () {
        window.location.href = "points.html";
    });
}


/* =========================================
   FEATURE BUTTONS
========================================= */

const featureItems =
    document.querySelectorAll(
        ".feature-item"
    );


featureItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const feature =
                    item.dataset.feature;


                if (feature === "level") {
                  openLevelOverlay();
                }

                else if (feature === "store") {

                    alert("LARCK Store");

                }

                else if (feature === "dress") {

                    alert(
                        "LARCK Dress & Profile Items"
                    );

                }

                else if (feature === "host") {
                   openHostCenterOverlay();
                }

                else if (feature === "recharge") {
                    openCoinSellerOverlay();
                }

                else if (feature === "task") {

                    alert("LARCK Tasks");

                }

                else if (feature === "invite") {

                    alert(
                        "Invite friends to LARCK"
                    );

                }

            }
        );

    }
);


/* =========================================
   ACCOUNT MENU
========================================= */

const menuRows =
    document.querySelectorAll(
        ".menu-row"
    );


menuRows.forEach(
    function (row) {

        row.addEventListener(
            "click",
            function () {

                const menu =
                    row.dataset.menu;


               
if (menu === "agent") {
    openAgencyOwnerArea();
}


                else if (menu === "settings") {

                    alert(
                        "LARCK Settings"
                    );

                }

                else if (menu === "support") {
                 openSupportPage();


                }

            }
        );

    }
);


/* =========================================
   LARCK PAGE NAVIGATION
========================================= */

const bottomNavItems =
    document.querySelectorAll(
        ".bottom-nav-item"
    );


bottomNavItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const page =
                    item.dataset.page;


                if (page === "home") {

                    window.location.href =
                        "page2.html";

                }

                else if (page === "party") {

                    window.location.href =
                        "page3.html";

                }

                else if (page === "message") {

                    window.location.href =
                        "page4.html";

                }

                else if (page === "me") {

                    window.location.href =
                        "page5.html";

                }

            }
        );

    }
);


/* =========================================
   START PROFILE LOADING
========================================= */

loadUserProfile();

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            const {
                data: { user }
            } = await larckSupabase.auth.getUser();

            if (user) {

                const { error } =
                    await larckSupabase
                    .from("room_members")
                    .delete()
                    .eq("user_id", user.id);

                if (error) {

                    console.error(
                        "Error removing user from room:",
                        error
                    );

                }

            }

            localStorage.removeItem(
                "larckActiveRoom"
            );

            localStorage.removeItem(
                "larckRoomMinimized"
            );

            const {
                error: signOutError
            } =
                await larckSupabase.auth.signOut();

            if (signOutError) {

                console.error(
                    "Logout error:",
                    signOutError
                );

                return;
            }

            window.location.href =
                "index.html";

        }
    );

}

/* =========================================================
   OPEN PROFILE PAGE
========================================================= */

const profileArrow = document.getElementById("profileArrow");

if (profileArrow) {

    profileArrow.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}

/* =========================================
   LOAD FOLLOWING, FANS AND VISITORS COUNTS
========================================= */

async function loadProfileStats() {
    try {
        const {
            data: { user },
            error: userError
        } = await larckSupabase.auth.getUser();

        if (userError || !user) {
            return;
        }

        // FOLLOWING COUNT
        const { count: followingCount, error: followingError } =
            await larckSupabase
                .from("follows")
                .select("*", { count: "exact", head: true })
                .eq("follower_id", user.id);

        if (followingError) {
            console.error("Following count error:", followingError);
        } else {
            const element = document.getElementById("followingCount");
            if (element) {
                element.textContent = followingCount ?? 0;
            }
        }

        // FANS COUNT
        const { count: fansCount, error: fansError } =
            await larckSupabase
                .from("follows")
                .select("*", { count: "exact", head: true })
                .eq("following_id", user.id);

        if (fansError) {
            console.error("Fans count error:", fansError);
        } else {
            const element = document.getElementById("fansCount");
            if (element) {
                element.textContent = fansCount ?? 0;
            }
        }

        // VISITORS COUNT
        const { count: visitorsCount, error: visitorsError } =
            await larckSupabase
                .from("profile_visitors")
                .select("*", { count: "exact", head: true })
                .eq("profile_owner_id", user.id);

        if (visitorsError) {
            console.error("Visitors count error:", visitorsError);
        } else {
            const element = document.getElementById("visitorsCount");
            if (element) {
                element.textContent = visitorsCount ?? 0;
            }
        }

    } catch (error) {
        console.error("Profile statistics error:", error);
    }
}

// Load the statistics
loadProfileStats();


/* =========================================
   FULL-SCREEN FOLLOWING / FANS / VISITORS
========================================= */

const connectionsOverlay =
    document.getElementById("connectionsOverlay");

const connectionsTitle =
    document.getElementById("connectionsTitle");

const connectionsList =
    document.getElementById("connectionsList");

const connectionsEmpty =
    document.getElementById("connectionsEmpty");

const closeConnections =
    document.getElementById("closeConnections");


/* OPEN THE OVERLAY */

async function openConnections(type) {
    if (!connectionsOverlay) return;

    const titles = {
        following: "Following",
        fans: "Fans",
        visitors: "Visitors"
    };

    connectionsTitle.textContent = titles[type] || "Connections";
    connectionsList.innerHTML = "";
    connectionsEmpty.hidden = true;

    connectionsOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    connectionsList.innerHTML =
        '<p style="text-align:center;padding:24px;color:#777;">Loading...</p>';

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError || !user) {
            connectionsList.innerHTML = "";
            connectionsEmpty.textContent = "Please log in again.";
            connectionsEmpty.hidden = false;
            return;
        }

        let userIds = [];

        /* FOLLOWING */
        if (type === "following") {
            const { data, error } = await larckSupabase
                .from("follows")
                .select("following_id")
                .eq("follower_id", user.id);

            if (error) throw error;

            userIds = (data || []).map(row => row.following_id);
        }

        /* FANS */
        else if (type === "fans") {
            const { data, error } = await larckSupabase
                .from("follows")
                .select("follower_id")
                .eq("following_id", user.id);

            if (error) throw error;

            userIds = (data || []).map(row => row.follower_id);
        }

        /* VISITORS */
        else if (type === "visitors") {
            const { data, error } = await larckSupabase
                .from("profile_visitors")
                .select("visitor_id, created_at")
                .eq("profile_owner_id", user.id)
                .neq("visitor_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Show each visitor once, keeping their most recent visit.
            const seen = new Set();

            userIds = (data || [])
                .filter(row => {
                    if (!row.visitor_id || seen.has(row.visitor_id)) {
                        return false;
                    }

                    seen.add(row.visitor_id);
                    return true;
                })
                .map(row => row.visitor_id);
        }

        // Remove duplicate IDs and the current user.
        userIds = [...new Set(userIds)]
            .filter(id => id && id !== user.id);

        if (userIds.length === 0) {
            connectionsList.innerHTML = "";
            connectionsEmpty.textContent = "No users to display yet.";
            connectionsEmpty.hidden = false;
            return;
        }

        /* LOAD THE MATCHING PROFILES */
        const { data: profiles, error: profilesError } =
            await larckSupabase
                .from("profiles")
                .select("id, username, larck_id, profile_picture")
                .in("id", userIds);

        if (profilesError) throw profilesError;

        connectionsList.innerHTML = "";

        // Keep the order returned by the follows/visitors records.
        const profileById = new Map(
            (profiles || []).map(profile => [profile.id, profile])
        );

        const orderedProfiles = userIds
            .map(id => profileById.get(id))
            .filter(Boolean);

        if (orderedProfiles.length === 0) {
            connectionsEmpty.textContent =
                "User profiles could not be found.";
            connectionsEmpty.hidden = false;
            return;
        }

        orderedProfiles.forEach(profile => {
            const row = document.createElement("div");
            row.className = "connection-user";
            row.tabIndex = 0;
            row.setAttribute(
                "aria-label",
                "Open " + (profile.username || "user") + "'s profile"
            );

            const avatar = document.createElement("div");
            avatar.className = "connection-avatar";

            if (profile.profile_picture) {
                const img = document.createElement("img");
                img.src = profile.profile_picture;
                img.alt = "";
                img.loading = "lazy";
                img.onerror = () => {
                    avatar.textContent =
                        (profile.username || "L").trim().charAt(0).toUpperCase();
                };
                avatar.appendChild(img);
            } else {
                avatar.textContent =
                    (profile.username || "L").trim().charAt(0).toUpperCase();
            }

           
const userInfo = document.createElement("div");
userInfo.className = "connection-user-info";

const name = document.createElement("div");
name.className = "connection-username";
name.textContent = profile.username || "LARCK User";

const larckId = document.createElement("div");
larckId.className = "connection-larck-id";
larckId.textContent = "ID: " + (profile.larck_id || "--------");

userInfo.append(name, larckId);
row.append(avatar, userInfo);

            const openUserProfile = () => {
                if (!profile.larck_id) {
                    alert("This user does not have a LARCK ID available.");
                    return;
                }

                window.location.href =
                    "profile.html?id=" +
                    encodeURIComponent(profile.larck_id);
            };

            row.addEventListener("click", openUserProfile);

            row.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openUserProfile();
                }
            });

            connectionsList.appendChild(row);
        });

    } catch (error) {
        console.error("Unable to load connections:", error);

        connectionsList.innerHTML = "";
        connectionsEmpty.textContent =
            "Unable to load this list. Please try again.";
        connectionsEmpty.hidden = false;
    }
}


/* MAKE THE THREE STATISTICS CLICKABLE */

const followingStat =
    document.getElementById("followingStat");

const fansStat =
    document.getElementById("fansStat");

const visitorsStat =
    document.getElementById("visitorsStat");

if (followingStat) {
    followingStat.style.cursor = "pointer";
    followingStat.addEventListener("click", () => {
        openConnections("following");
    });
}

if (fansStat) {
    fansStat.style.cursor = "pointer";
    fansStat.addEventListener("click", () => {
        openConnections("fans");
    });
}

if (visitorsStat) {
    visitorsStat.style.cursor = "pointer";
    visitorsStat.addEventListener("click", () => {
        openConnections("visitors");
    });
}


/* CLOSE THE OVERLAY */

function closeConnectionsOverlay() {
    if (!connectionsOverlay) return;

    connectionsOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

if (closeConnections) {
    closeConnections.addEventListener(
        "click",
        closeConnectionsOverlay
    );
}


/* =========================================
   LARCK YOUR LEVEL OVERLAY
========================================= */

const levelOverlay = document.getElementById("levelOverlay");
const closeLevelButton = document.getElementById("closeLevelOverlay");
const sendingTab = document.getElementById("sendingTab");
const receivingTab = document.getElementById("receivingTab");
const levelCards = document.getElementById("levelCards");
const levelGrid = document.getElementById("levelGrid");
const levelInfoButton = document.getElementById("levelInfoButton");

let currentLevelTab = "sending";
let previousLevelBodyOverflow = "";

/* SENDING LEVEL REQUIREMENTS */
const sendingLevels = [
    { name: "Level 1", level: 0, amount: 0 },
    { name: "Level 1", level: 1, amount: 10000 },
    { name: "Level 2", level: 2, amount: 20000 },
    { name: "Level 3", level: 3, amount: 40000 },
    { name: "Level 4", level: 4, amount: 80000 },
    { name: "Level 5", level: 5, amount: 160000 },
    { name: "Level 6", level: 6, amount: 250000 },
    { name: "Level 7", level: 7, amount: 400000 },
    { name: "Level 8", level: 8, amount: 500000 },
    { name: "Level 9", level: 9, amount: 700000 },
    { name: "Level 10", level: 10, amount: 1000000 },
    { name: "Level 11", level: 11, amount: 1100000 },
    { name: "Level 12", level: 12, amount: 1300000 },
    { name: "Level 13", level: 13, amount: 1600000 },
    { name: "Level 14", level: 14, amount: 2000000 },
    { name: "Level 15", level: 15, amount: 2600000 }
];

/* RECEIVING LEVEL REQUIREMENTS */
const receivingLevels = [
    { name: "Level 1", amount: 3000 },
    { name: "Level 2", amount: 5000 },
    { name: "Level 3", amount: 18000 },
    { name: "Level 4", amount: 30000 },
    { name: "Level 5", amount: 66000 },
    { name: "Level 6", amount: 166000 },
    { name: "Level 7", amount: 330000 },
    { name: "Level 8", amount: 500000 },
    { name: "Level 9", amount: 700000 },
    { name: "Level 10", amount: 1000000 }
];

/* FORMAT AMOUNTS */
function formatLevelAmount(amount) {
    return amount.toLocaleString("en-US");
}

/* OPEN THE FULL-SCREEN OVERLAY */
function openLevelOverlay() {
    if (!levelOverlay) {
        console.error("Your Level overlay HTML was not found.");
        return;
    }

    previousLevelBodyOverflow = document.body.style.overflow;

    levelOverlay.classList.add("active");
    levelOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    showLevelTab("sending");
}

/* CLOSE THE OVERLAY */
function closeLevelOverlay() {
    if (!levelOverlay) return;

    levelOverlay.classList.remove("active");
    levelOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousLevelBodyOverflow;
}

/* SWITCH BETWEEN SENDING AND RECEIVING */
function showLevelTab(type) {
    if (!levelCards || !levelGrid) return;

    currentLevelTab = type;

    const isSending = type === "sending";

    sendingTab.classList.toggle("active", isSending);
    receivingTab.classList.toggle("active", !isSending);

    sendingTab.setAttribute("aria-selected", String(isSending));
    receivingTab.setAttribute("aria-selected", String(!isSending));

    renderLevelCards();

    /* Return the list to the top when switching tabs */
    levelGrid.scrollTop = 0;
}

/* DRAW THE LEVEL CARDS */
function renderLevelCards() {
    if (!levelCards) return;

    levelCards.innerHTML = "";

    const isSending = currentLevelTab === "sending";
    const levels = isSending ? sendingLevels : receivingLevels;

    levels.forEach((level, index) => {
        const card = document.createElement("article");

        card.className = "level-card";

        if (!isSending) {
            card.classList.add("receiving-card");
        }

        /* First Sending level uses the locked appearance */
        if (isSending && index === 0) {
            card.classList.add("locked");
        }

        const badge = document.createElement("div");
        badge.className = "level-card-badge";
        badge.textContent = isSending ? "◆" : "▲";

        const info = document.createElement("div");
        info.className = "level-card-info";

        const name = document.createElement("span");
        name.className = "level-card-name";
        name.textContent = level.name;

        const title = document.createElement("strong");
        title.className = "level-card-title";
        title.textContent = isSending
            ? "Lv " + level.level
            : "HOST LV";

        const amount = document.createElement("span");
        amount.className = "level-card-amount";

        const amountIcon = document.createElement("span");
        amountIcon.className = "level-amount-icon";
        amountIcon.textContent = isSending ? "🪙" : "🟡";

        const amountText = document.createElement("span");
        amountText.textContent =
            formatLevelAmount(level.amount) +
            (isSending ? " coins" : " points");

        amount.append(amountIcon, amountText);
        info.append(name, title, amount);
        card.append(badge, info);

        levelCards.appendChild(card);
    });
}

/* TAB BUTTONS */
if (sendingTab) {
    sendingTab.addEventListener("click", () => {
        showLevelTab("sending");
    });
}

if (receivingTab) {
    receivingTab.addEventListener("click", () => {
        showLevelTab("receiving");
    });
}

/* BACK BUTTON */
if (closeLevelButton) {
    closeLevelButton.addEventListener("click", closeLevelOverlay);
}

/* LEVEL INFORMATION */
if (levelInfoButton) {
    levelInfoButton.addEventListener("click", () => {
        alert(
            "Sending levels are based on Coins spent. " +
            "Receiving levels are based on Points earned. " +
            "Your current balance and level progress will update " +
            "when your transaction data is connected."
        );
    });
}

/* CLOSE WITH THE ESCAPE KEY */
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        levelOverlay &&
        levelOverlay.classList.contains("active")
    ) {
        closeLevelOverlay();
    }
});

/* INITIALIZE THE LEVEL LIST */
renderLevelCards();


/* LARCK HOST CENTER */
const hostCenterOverlay = document.getElementById("hostCenterOverlay");
const closeHostCenterButton = document.getElementById("closeHostCenter");
const agencyCodeInput = document.getElementById("agencyCodeInput");
const submitAgencyCodeButton = document.getElementById("submitAgencyCode");

let previousHostBodyOverflow = "";


async function openHostCenterOverlay() {
    if (!hostCenterOverlay) {
        console.error("Host Center HTML was not found.");
        return;
    }

    previousHostBodyOverflow = document.body.style.overflow;

    hostCenterOverlay.classList.add("active");
    hostCenterOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    await loadHostCenterStatus();
}



/* =====================================
   HOST CENTER STATUS AND DASHBOARD
===================================== */

async function loadHostCenterStatus() {
    const requestView =
        document.getElementById("hostAgencyRequestView");

    const dashboardView =
        document.getElementById("hostDashboardView");

    const message =
        document.getElementById("hostRequestMessage");

    const submitButton =
        document.getElementById("submitAgencyCode");

    if (!requestView || !dashboardView) return;

    requestView.hidden = false;
    dashboardView.hidden = true;

    if (message) {
        message.textContent = "Checking your agency status...";
    }

    if (submitButton) submitButton.disabled = true;

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: acceptedRequest, error: requestError } =
            await larckSupabase
                .from("agency_join_requests")
                .select("id, agency_id, status")
                .eq("host_id", user.id)
                .eq("status", "accepted")
                .maybeSingle();

        if (requestError) throw requestError;

        if (acceptedRequest) {
            await loadAcceptedHostDashboard(user, acceptedRequest);
            requestView.hidden = true;
            dashboardView.hidden = false;
            return;
        }

        const { data: pendingRequest, error: pendingError } =
            await larckSupabase
                .from("agency_join_requests")
                .select("id")
                .eq("host_id", user.id)
                .eq("status", "pending")
                .limit(1)
                .maybeSingle();

        if (pendingError) throw pendingError;

        if (message) {
            message.textContent = pendingRequest
                ? "Your request is waiting for the agency owner to approve it."
                : "Enter the agency code provided by your agency to submit a join request.";
        }

    } catch (error) {
        console.error("Host Center status error:", error);

        if (message) {
            message.textContent =
                "Unable to check your agency status. Please close and reopen Host Center.";
        }
    } finally {
        if (submitButton) submitButton.disabled = false;
    }
}


async function loadAcceptedHostDashboard(user, acceptedRequest) {
    const { data: profile, error: profileError } =
        await larckSupabase
            .from("profiles")
            .select("username, profile_picture, larck_id")
            .eq("id", user.id)
            .maybeSingle();

            console.log("Host profile data:", profile);
console.log("Host profile picture URL:", profile?.profile_picture);

    if (profileError) throw profileError;

    const { data: agency, error: agencyError } =
        await larckSupabase
            .from("agencies")
            .select("agency_id, username")
            .eq("id", acceptedRequest.agency_id)
            .maybeSingle();

    if (agencyError) throw agencyError;

    const username = profile?.username || "LARCK Host";
    const larckId = profile?.larck_id || "-------";
    const picture = profile?.profile_picture || "";

    const usernameElement =
        document.getElementById("hostDashboardUsername");
    const larckIdElement =
        document.getElementById("hostDashboardLarckId");
    const avatar =
        document.getElementById("hostDashboardAvatar");
    const avatarLetter =
        document.getElementById("hostDashboardAvatarLetter");

        if (avatarLetter) {
    avatarLetter.style.display = "none";
}

    if (usernameElement) usernameElement.textContent = username;
    if (larckIdElement) larckIdElement.textContent = larckId;



if (avatar && avatarLetter) {
    avatarLetter.hidden = true;

    avatar.style.display = "block";
    avatar.style.visibility = "visible";
    avatar.style.opacity = "1";
    avatar.style.objectFit = "cover";

    if (picture) {
        avatar.src = picture;
        avatar.alt = username + " profile picture";
        avatar.hidden = false;
    } else {
        avatar.removeAttribute("src");
        avatar.hidden = true;
        avatarLetter.hidden = false;
        avatarLetter.textContent =
            username.trim().charAt(0).toUpperCase() || "H";
    }

    avatar.onerror = function () {
        console.error(
            "Host profile picture failed to load:",
            avatar.src
        );
    };
}

    const agencyName =
        document.getElementById("hostDashboardAgencyName");
    const agencyId =
        document.getElementById("hostDashboardAgencyId");

    if (agencyName) {
        agencyName.textContent = agency?.username || "My Agency";
    }

    if (agencyId) {
        agencyId.textContent = agency?.agency_id || "-----";
    }

    const dateElement =
        document.getElementById("hostDashboardDate");

    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString(
            "en-CA",
            { year: "numeric", month: "2-digit" }
        );
    }

    // Income is deliberately zero until real transaction data is connected.
    const coins = document.getElementById("hostDashboardCoins");
    const weeklyPoints =
        document.getElementById("hostDashboardWeeklyPoints");

    if (coins) coins.textContent = "0";
    if (weeklyPoints) weeklyPoints.textContent = "0";
}


/* Copy the host's LARCK ID */
const hostDashboardCopyButton =
    document.getElementById("hostDashboardCopyId");

if (hostDashboardCopyButton) {
    hostDashboardCopyButton.addEventListener("click", async function () {
        const larckId =
            document.getElementById("hostDashboardLarckId")?.textContent;

        if (!larckId || larckId === "-------") return;

        try {
            await navigator.clipboard.writeText(larckId);
            alert("LARCK ID copied!");
        } catch (error) {
            console.error("Could not copy LARCK ID:", error);
            alert("Unable to copy the ID on this browser.");
        }
    });
}


/* Switch the income tab labels and empty-state text */
document.querySelectorAll("[data-host-income-tab]").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll("[data-host-income-tab]").forEach(tab => {
            tab.classList.toggle("active", tab === button);
        });

        const title =
            document.getElementById("hostIncomeEmptyTitle");
        const description =
            document.getElementById("hostIncomeEmptyDescription");

        const tab = button.dataset.hostIncomeTab;

        if (title) {
            title.textContent = tab === "payments"
                ? "No income this month"
                : tab === "daily"
                    ? "No daily income yet"
                    : "No audio call income yet";
        }

        if (description) {
            description.textContent =
                "Your income records will appear here when available.";
        }
    });
});




function closeHostCenterOverlay() {
    if (!hostCenterOverlay) return;

    hostCenterOverlay.classList.remove("active");
    hostCenterOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = previousHostBodyOverflow;
}

if (closeHostCenterButton) {
    closeHostCenterButton.addEventListener("click", closeHostCenterOverlay);
}


if (submitAgencyCodeButton && agencyCodeInput) {
    submitAgencyCodeButton.addEventListener("click", async function () {
        const agencyCode = agencyCodeInput.value.trim();

        if (!agencyCode) {
            alert("Please enter your agency code.");
            agencyCodeInput.focus();
            return;
        }

        submitAgencyCodeButton.disabled = true;

        try {
            const {
                data: { user },
                error: authError
            } = await larckSupabase.auth.getUser();

            if (authError) throw authError;
            if (!user) throw new Error("Please sign in again.");

            // Find the agency using the entered agency code.
            const { data: agency, error: agencyError } =
                await larckSupabase
                    .from("agencies")
                    .select("id, owner_id, agency_id")
                    .eq("agency_id", agencyCode)
                    .maybeSingle();

            if (agencyError) throw agencyError;

            if (!agency) {
                alert("Agency code not found. Please check the code.");
                return;
            }

            if (agency.owner_id === user.id) {
                alert("You cannot send a host request to your own agency.");
                return;
            }

            // Check whether a request already exists.
            const { data: existing, error: existingError } =
                await larckSupabase
                    .from("agency_join_requests")
                    .select("id, status")
                    .eq("host_id", user.id)
                    .eq("agency_id", agency.id)
                    .maybeSingle();

            if (existingError) throw existingError;

            if (existing?.status === "pending") {
                alert("You have already sent a request to this agency.");
                return;
            }

            if (existing?.status === "accepted") {
                alert("You are already connected to this agency.");
                return;
            }

            if (existing) {
                alert(
                    "Your previous request was declined. " +
                    "Please contact the agency owner."
                );
                return;
            }

            // Save the host request for the agency owner.
            const { error: insertError } = await larckSupabase
                .from("agency_join_requests")
                .insert({
                    host_id: user.id,
                    agency_id: agency.id,
                    status: "pending"
                });

            if (insertError) throw insertError;

            alert("Host request sent successfully!");

            agencyCodeInput.value = "";
            closeHostCenterOverlay();

        } catch (error) {
            console.error("Host request error:", error);
            alert(
                "Unable to send your host request. " +
                (error.message || "Please try again.")
            );
        } finally {
            submitAgencyCodeButton.disabled = false;
        }
    });
}


document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        hostCenterOverlay &&
        hostCenterOverlay.classList.contains("active")
    ) {
        closeHostCenterOverlay();
    }
});




/* =====================================
   AGENCY INVITATIONS OVERLAY
===================================== */

const agencyInvitationsOverlay =
    document.getElementById("agencyInvitationsOverlay");

const closeAgencyInvitations =
    document.getElementById("closeAgencyInvitations");

const agencyInvitationsContent =
    agencyInvitationsOverlay?.querySelector(
        ".agency-invitations-content"
    );

const agencyInvitationsEmpty =
    document.getElementById("agencyInvitationsEmpty");

let agencyPreviousBodyOverflow = "";


/* LOAD PENDING INVITATIONS */

async function loadAgencyOwnerInvitations() {
    if (!agencyInvitationsContent) return;

    // Keep the existing empty-state element in the HTML.
    agencyInvitationsContent
        .querySelectorAll(".agency-invitation-card, .agency-invitations-message")
        .forEach(element => element.remove());

    if (agencyInvitationsEmpty) {
        agencyInvitationsEmpty.hidden = true;
    }

    const loading = document.createElement("p");
    loading.className = "agency-invitations-message";
    loading.textContent = "Loading invitations...";
    loading.style.cssText =
        "text-align:center;padding:24px;color:#777;";

    agencyInvitationsContent.appendChild(loading);

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
            throw new Error("Please sign in again.");
        }

        const { data, error } = await larckSupabase.rpc(
            "get_my_agency_owner_invitations"
        );

        if (error) throw error;

        loading.remove();

        const invitations = data || [];

       if (invitations.length === 0) {
    if (agencyInvitationsEmpty) {
        agencyInvitationsEmpty.hidden = false;
        agencyInvitationsEmpty.style.display = "";

        const emptyText =
            agencyInvitationsEmpty.querySelector("p");

        if (emptyText) {
            emptyText.textContent = "No invitations right now.";
        }
    }
    return;
}

/* Hide the empty message when invitations exist */
if (agencyInvitationsEmpty) {
    agencyInvitationsEmpty.hidden = true;
    agencyInvitationsEmpty.style.display = "none";
}
        invitations.forEach(invitation => {
            const card = document.createElement("article");
            card.className = "agency-invitation-card";

            card.style.cssText = `
                display:flex;
                align-items:center;
                gap:12px;
                padding:14px;
                margin:12px 0;
                background:#fff;
                border-radius:14px;
                box-shadow:0 3px 12px rgba(0,0,0,.07);
            `;

            const avatar = document.createElement("div");

            avatar.style.cssText = `
                width:48px;
                height:48px;
                min-width:48px;
                border-radius:50%;
                overflow:hidden;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#7b22c8;
                color:white;
                font-weight:bold;
            `;

            if (invitation.inviter_picture) {
                const image = document.createElement("img");
                image.src = invitation.inviter_picture;
                image.alt = "";
                image.style.cssText =
                    "width:100%;height:100%;object-fit:cover;";

                image.onerror = () => {
                    image.remove();
                    avatar.textContent =
                        (invitation.inviter_username || "L")
                            .trim().charAt(0).toUpperCase();
                };

                avatar.appendChild(image);
            } else {
                avatar.textContent =
                    (invitation.inviter_username || "L")
                        .trim().charAt(0).toUpperCase();
            }

            const details = document.createElement("div");
            details.style.cssText = "flex:1;min-width:0;";

            const name = document.createElement("strong");
            name.textContent =
                invitation.inviter_username || "LARCK User";

            name.style.cssText =
                "display:block;color:#24202b;font-size:14px;";

            const description = document.createElement("p");
            description.textContent =
                "Invited you to become an agency owner.";

            description.style.cssText =
                "margin:5px 0 0;color:#777;font-size:12px;";

            details.append(name, description);

            const actions = document.createElement("div");
            actions.style.cssText = `
                display:flex;
                flex-direction:column;
                gap:6px;
            `;

            const acceptButton = document.createElement("button");
            acceptButton.type = "button";
            acceptButton.textContent = "Accept";
            acceptButton.style.cssText = `
                border:0;
                border-radius:8px;
                padding:8px 12px;
                background:#08c9c5;
                color:#fff;
                font-weight:600;
            `;

            const declineButton = document.createElement("button");
            declineButton.type = "button";
            declineButton.textContent = "Decline";
            declineButton.style.cssText = `
                border:1px solid #ddd;
                border-radius:8px;
                padding:7px 12px;
                background:#fff;
                color:#555;
            `;

            async function respondToInvitation(accept) {
                acceptButton.disabled = true;
                declineButton.disabled = true;

                acceptButton.textContent = accept
                    ? "Please wait..."
                    : "Accept";

                declineButton.textContent = accept
                    ? "Decline"
                    : "Please wait...";

                try {
                    const { data, error } = await larckSupabase.rpc(
                        "respond_to_agency_owner_invitation",
                        {
                            p_invitation_id: invitation.invitation_id,
                            p_accept: accept
                        }
                    );

                    if (error) throw error;

                    card.remove();

                    const remainingCards =
                        agencyInvitationsContent.querySelector(
                            ".agency-invitation-card"
                        );

                    if (!remainingCards && agencyInvitationsEmpty) {
    agencyInvitationsEmpty.hidden = false;
    agencyInvitationsEmpty.style.display = "";

    const emptyText =
        agencyInvitationsEmpty.querySelector("p");

    if (emptyText) {
        emptyText.textContent = "No invitations right now.";
    }
}
                   
if (accept) {
    alert(
        "Invitation accepted! Your Agency ID is: " +
        data
    );

    closeAgencyInvitationsOverlay();
    openAgencyCenterOverlay();

} else {
    alert("Invitation declined.");
}


                } catch (error) {
                    console.error(
                        "Unable to respond to agency invitation:",
                        error
                    );

                    alert(
                        error.message ||
                        "Could not process the invitation. Please try again."
                    );

                    acceptButton.disabled = false;
                    declineButton.disabled = false;
                    acceptButton.textContent = "Accept";
                    declineButton.textContent = "Decline";
                }
            }

            acceptButton.addEventListener("click", () => {
                respondToInvitation(true);
            });

            declineButton.addEventListener("click", () => {
                respondToInvitation(false);
            });

            actions.append(acceptButton, declineButton);
            card.append(avatar, details, actions);
            agencyInvitationsContent.appendChild(card);
        });

    } catch (error) {
        console.error(
            "Unable to load agency invitations:",
            error
        );

        loading.remove();

        const message = document.createElement("p");
        message.className = "agency-invitations-message";
        message.textContent =
            error.message ||
            "Unable to load invitations. Please try again.";

        message.style.cssText =
            "text-align:center;padding:24px;color:#b42318;";

        agencyInvitationsContent.appendChild(message);
    }
}


/* OPEN OVERLAY */

function openAgencyInvitationsOverlay() {
    if (!agencyInvitationsOverlay) {
        console.error("Agency Invitations HTML was not found.");
        return;
    }

    agencyPreviousBodyOverflow = document.body.style.overflow;

    agencyInvitationsOverlay.classList.add("active");
    agencyInvitationsOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    loadAgencyOwnerInvitations();
}


/* CLOSE OVERLAY */

function closeAgencyInvitationsOverlay() {
    if (!agencyInvitationsOverlay) return;

    agencyInvitationsOverlay.classList.remove("active");
    agencyInvitationsOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = agencyPreviousBodyOverflow;
}


/* BACK BUTTON */

if (closeAgencyInvitations) {
    closeAgencyInvitations.addEventListener(
        "click",
        closeAgencyInvitationsOverlay
    );
}


/* CLOSE WITH ESCAPE */

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        agencyInvitationsOverlay &&
        agencyInvitationsOverlay.classList.contains("active")
    ) {
        closeAgencyInvitationsOverlay();
    }
});



/* =====================================
   AGENCY CENTER
===================================== */

const agencyCenterOverlay =
    document.getElementById("agencyCenterOverlay");

const closeAgencyCenterButton =
    document.getElementById("closeAgencyCenter");

let agencyCenterPreviousOverflow = "";


function openAgencyCenterOverlay() {
    if (!agencyCenterOverlay) {
        console.error("Agency Center HTML was not found.");
        return;
    }

    agencyCenterPreviousOverflow = document.body.style.overflow;

    agencyCenterOverlay.classList.add("active");
    agencyCenterOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Make Home the default active navigation button.
    const agencyHomeButton = agencyCenterOverlay.querySelector(
        '[data-agency-nav="home"]'
    );

    if (agencyHomeButton && typeof setActiveAgencyNav === "function") {
        setActiveAgencyNav(agencyHomeButton);
    }

    loadAgencyCenterDetails();
    loadAgencyHomeHosts();
}


function closeAgencyCenterOverlay() {
    if (!agencyCenterOverlay) return;

    agencyCenterOverlay.classList.remove("active");
    agencyCenterOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = agencyCenterPreviousOverflow;
}

if (closeAgencyCenterButton) {
    closeAgencyCenterButton.addEventListener(
        "click",
        closeAgencyCenterOverlay
    );
}

async function loadAgencyCenterDetails() {
    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("agency_id, username, created_at")
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;

        if (!agency) {
            alert("You do not have an active agency yet.");
            closeAgencyCenterOverlay();
            return;
        }

        const { data: profile, error: profileError } =
            await larckSupabase
                .from("profiles")
                .select("username, profile_picture")
                .eq("id", user.id)
                .maybeSingle();

        if (profileError) throw profileError;

        const username =
            agency.username ||
            profile?.username ||
            "LARCK User";

        const agencyId = String(agency.agency_id || "-----");

        const usernameElement =
            document.getElementById("agencyUsername");

        const agencyIdElement =
            document.getElementById("agencyIdText");

        const avatarElement =
            document.getElementById("agencyProfileAvatar");

        if (usernameElement) {
            usernameElement.textContent = username;
        }

        if (agencyIdElement) {
            agencyIdElement.textContent = "ID: " + agencyId;
        }

        const detailName =
            document.getElementById("agencyDetailName");

        const detailId =
            document.getElementById("agencyDetailId");

        const createdDate =
            document.getElementById("agencyCreatedDate");

        if (detailName) detailName.textContent = username;
        if (detailId) detailId.textContent = agencyId;

        if (createdDate) {
            createdDate.textContent = agency.created_at
                ? new Date(agency.created_at).toLocaleDateString()
                : "Not available";
        }

        if (avatarElement) {
            avatarElement.replaceChildren();

            if (profile?.profile_picture) {
                const image = document.createElement("img");
                image.src = profile.profile_picture;
                image.alt = "Agency owner profile picture";

                image.onerror = () => {
                    avatarElement.textContent =
                        username.trim().charAt(0).toUpperCase() || "L";
                };

                avatarElement.appendChild(image);
            } else {
                avatarElement.textContent =
                    username.trim().charAt(0).toUpperCase() || "L";
            }
        }

    } catch (error) {
        console.error("Agency Center loading error:", error);

        alert(
            error.message ||
            "Unable to load your Agency Center."
        );
    }
}



/* =====================================
   LOAD ACCEPTED HOSTS ON AGENCY HOME
===================================== */

async function loadAgencyHomeHosts() {
    const totalHostsElement =
        document.getElementById("agencyTotalHosts");

    const topHostsSubtitle =
        document.getElementById("agencyTopHostsSubtitle");

    const topHostsList =
        document.getElementById("agencyTopHostsList");

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("id")
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;
        if (!agency) throw new Error("Agency not found.");

        const { data: requests, error: requestsError } =
            await larckSupabase
                .from("agency_join_requests")
                .select("host_id")
                .eq("agency_id", agency.id)
                .eq("status", "accepted");

        if (requestsError) throw requestsError;

        const hostIds = [
            ...new Set((requests || []).map(request => request.host_id))
        ];

        let hosts = [];

        if (hostIds.length) {
            const { data: profiles, error: profilesError } =
                await larckSupabase
                    .from("profiles")
                    .select("id, username, larck_id, profile_picture")
                    .in("id", hostIds);

            if (profilesError) throw profilesError;

            hosts = profiles || [];
        }

        // Update the Home dashboard's real accepted-host count.
        if (totalHostsElement) {
            totalHostsElement.textContent = String(hostIds.length);
        }

        if (topHostsSubtitle) {
            topHostsSubtitle.textContent =
                `${hostIds.length} ${hostIds.length === 1 ? "host" : "hosts"} · host income`;
        }

        if (!topHostsList) return;

        if (!hosts.length) {
            topHostsList.innerHTML =
                '<p class="agency-empty-text">No hosts yet.</p>';
            return;
        }

        topHostsList.innerHTML = hosts.map(host => {
            const username = escapeAgencyHostHtml(
                host.username || "LARCK User"
            );

            const larckId = escapeAgencyHostHtml(
                host.larck_id || "—"
            );

            const picture = escapeAgencyHostHtml(
                host.profile_picture || ""
            );

            const avatar = picture
                ? `<img src="${picture}" alt=""
                    style="width:42px;height:42px;border-radius:50%;object-fit:cover;"
                    onerror="this.style.display='none'">`
                : `<span class="agency-request-avatar-letter">${
                    username.charAt(0).toUpperCase()
                }</span>`;

            return `
                <article class="agency-request-card">
                    <div class="agency-request-host">
                        <div class="agency-request-avatar">
                            ${avatar}
                        </div>

                        <div class="agency-request-details">
                            <strong>${username}</strong>
                            <span>ID: ${larckId}</span>
                        </div>
                    </div>

                    <strong>0 coins</strong>
                </article>
            `;
        }).join("");

    } catch (error) {
        console.error("Agency Home hosts failed to load:", error);

        if (topHostsList) {
            topHostsList.innerHTML =
                '<p class="agency-empty-text">Unable to load hosts. Please reopen Agency Center.</p>';
        }
    }
}



/* CLOSE WITH ESCAPE */
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        agencyCenterOverlay?.classList.contains("active")
    ) {
        closeAgencyCenterOverlay();
    }
});

/* AGENCY CENTER ACTIONS */
document.querySelectorAll("[data-agency-action]").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.agencyAction;

        if (action === "add-host") {
             openAddHostSheet();

        } else if (action === "requests") {
           openAgencyApplicationsPage();
       } else if (action === "history") {
            openAgencyHistoryPage();
       } else if (action === "payouts") {
            openAgencyPayoutsPage();
       } else if (action === "earnings") {
           openAgencyCommissionPage();
       } else if (action === "all-hosts") {
    console.log("All Hosts button clicked");

    const hostsPage = document.getElementById("agencyHostsPage");
    console.log("Hosts page found:", hostsPage);

    openAgencyHostsPage();

    console.log(
        "Hosts page hidden after opening:",
        hostsPage ? hostsPage.hidden : "Page not found"
    );
}
    });
});


async function openAgencyOwnerArea() {
    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: agency, error } = await larckSupabase
            .from("agencies")
            .select("id")
            .eq("owner_id", user.id)
            .maybeSingle();

        if (error) throw error;

        if (agency) {
            openAgencyCenterOverlay();
        } else {
            openAgencyInvitationsOverlay();
        }

    } catch (error) {
        console.error("Unable to open agency area:", error);
        alert("Unable to open your agency area. Please try again.");
    }
}



/* =====================================
   ADD AGENCY PAGE FUNCTIONALITY
===================================== */

const addAgencyPage =
    document.getElementById("addAgencyPage");

const closeAddAgencyButton =
    document.getElementById("closeAddAgency");

const addAgencyPersonId =
    document.getElementById("addAgencyPersonId");

const searchAgencyPersonButton =
    document.getElementById("searchAgencyPerson");

const addAgencySearchMessage =
    document.getElementById("addAgencySearchMessage");

const addAgencyPersonName =
    document.getElementById("addAgencyPersonName");

const addAgencyForm =
    document.getElementById("addAgencyForm");

let foundAgencyPerson = null;


/* OPEN ADD AGENCY */

function openAddAgencyPage() {
    if (!addAgencyPage) {
        console.error("Add Agency HTML was not found.");
        return;
    }

    foundAgencyPerson = null;

    addAgencyPage.classList.add("active");
    addAgencyPage.setAttribute("aria-hidden", "false");

    if (addAgencySearchMessage) {
        addAgencySearchMessage.textContent = "";
    }

    if (addAgencyPersonName) {
        addAgencyPersonName.value = "";
    }

    const nameInput = document.getElementById("addAgencyName");
    const phoneInput = document.getElementById("addAgencyWhatsApp");

    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";

    if (addAgencyPersonId) {
        addAgencyPersonId.value = "";
        addAgencyPersonId.focus();
    }
}


/* CLOSE ADD AGENCY */


function closeAddAgencyPage() {
    if (!addAgencyPage) return;

    addAgencyPage.classList.remove("active");
    addAgencyPage.setAttribute("aria-hidden", "true");

    // Returning to Agency Center means returning to Home.
    const agencyHomeButton = document.querySelector(
        '#agencyCenterOverlay [data-agency-nav="home"]'
    );

    if (agencyHomeButton) {
        setActiveAgencyNav(agencyHomeButton);
    }
}



/* OPEN WHEN ADD SUB AGENT IS TAPPED */

document.querySelectorAll('[data-agency-nav="add-sub-agent"]')
    .forEach(button => {
        button.addEventListener("click", openAddAgencyPage);
    });


/* BACK ARROW */

if (closeAddAgencyButton) {
    closeAddAgencyButton.addEventListener(
        "click",
        closeAddAgencyPage
    );
}


/* SEARCH FOR A LARCK USER */

if (searchAgencyPersonButton) {
    searchAgencyPersonButton.addEventListener("click", async function () {
        const personId = addAgencyPersonId.value.trim();

        if (!personId) {
            addAgencySearchMessage.textContent =
                "Please enter the user's LARCK ID.";
            addAgencySearchMessage.style.color = "#d92d45";
            addAgencyPersonId.focus();
            return;
        }

        searchAgencyPersonButton.disabled = true;
        addAgencySearchMessage.textContent = "Searching for user...";
        addAgencySearchMessage.style.color = "#777181";

        try {
            const { data: profile, error } = await larckSupabase
                .from("profiles")
                .select("id, username, larck_id")
                .eq("larck_id", personId)
                .maybeSingle();

            if (error) throw error;

            if (!profile) {
                foundAgencyPerson = null;
                addAgencySearchMessage.textContent =
                    "No user found with this LARCK ID.";
                addAgencySearchMessage.style.color = "#d92d45";
                return;
            }

            foundAgencyPerson = profile;

            if (addAgencyPersonName) {
                addAgencyPersonName.value = profile.username || "";
            }

            addAgencySearchMessage.textContent =
                "User found: " + (profile.username || "LARCK User");
            addAgencySearchMessage.style.color = "#159447";

        } catch (error) {
            console.error("Person ID search error:", error);

            addAgencySearchMessage.textContent =
                "Unable to search right now. Please try again.";
            addAgencySearchMessage.style.color = "#d92d45";

        } finally {
            searchAgencyPersonButton.disabled = false;
        }
    });
}


/* RESET SEARCH WHEN THE ID CHANGES */

if (addAgencyPersonId) {
    addAgencyPersonId.addEventListener("input", function () {
        foundAgencyPerson = null;

        if (addAgencySearchMessage) {
            addAgencySearchMessage.textContent = "";
        }
    });
}


/* SUBMIT FORM */

if (addAgencyForm) {
    addAgencyForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const personId = addAgencyPersonId.value.trim();
        const agencyName =
            document.getElementById("addAgencyName").value.trim();

        const personName =
            addAgencyPersonName.value.trim();

        const whatsapp =
            document.getElementById("addAgencyWhatsApp").value.trim();

        if (!personId) {
            alert("Please enter the user's Person ID.");
            addAgencyPersonId.focus();
            return;
        }

        if (!foundAgencyPerson ||
            String(foundAgencyPerson.larck_id) !== personId) {
            alert("Please search for and confirm the user first.");
            return;
        }

        if (!agencyName) {
            alert("Please enter an agency name.");
            document.getElementById("addAgencyName").focus();
            return;
        }

        alert(
            "Form completed successfully!\n\n" +
            "Person ID: " + personId + "\n" +
            "Agency name: " + agencyName + "\n" +
            "Name: " + (personName || foundAgencyPerson.username || "Not provided") + "\n" +
            "WhatsApp: " + (whatsapp || "Not provided") +
            "\n\nAgency creation will be connected next."
        );
    });
}


/* ESCAPE CLOSES THE ADD AGENCY PAGE */

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        addAgencyPage &&
        addAgencyPage.classList.contains("active")
    ) {
        closeAddAgencyPage();
    }
});





function closeAllAgencySubPages() {
    closeAgencyHostsPage();
    closeAgencyApplicationsPage();
    closeAgencyHistoryPage();
    closeAgencyPayoutsPage();
    closeAgencyCommissionPage();
    closeAddAgencyPage();
}

function navigateAgency(destination) {
    closeAllAgencySubPages();

    const mainButton = document.querySelector(
        `#agencyCenterOverlay [data-agency-nav="${destination}"]`
    );

    if (mainButton) {
        setActiveAgencyNav(mainButton);
    }

    if (destination === "home") {
        return;
    }

    if (destination === "hosts") {
        openAgencyHostsPage();
    } else if (destination === "add-sub-agent") {
        openAddAgencyPage();
    } else if (destination === "requests") {
        openAgencyApplicationsPage();
    } else if (destination === "earnings") {
        openAgencyCommissionPage();
    }
}



/* =====================================
   AGENCY CENTER BOTTOM NAVIGATION
   ACTIVE BUTTON HIGHLIGHT
===================================== */

const agencyNavButtons = document.querySelectorAll(
    "#agencyCenterOverlay [data-agency-nav]"
);

function setActiveAgencyNav(activeButton) {
   
agencyNavButtons.forEach(button => {
    button.addEventListener("click", function () {
        navigateAgency(button.dataset.agencyNav);
    });
});

}




agencyNavButtons.forEach(button => {
    button.addEventListener("click", function () {
        const nav = button.dataset.agencyNav;

        if (nav === "hosts") {
            closeAgencyApplicationsPage();
            closeAgencyHistoryPage();
            closeAgencyPayoutsPage();
            closeAgencyCommissionPage();

            openAgencyHostsPage();

        } else if (nav === "earnings") {
            closeAgencyApplicationsPage();
            closeAgencyHistoryPage();
            closeAgencyPayoutsPage();
            openAgencyCommissionPage();

        } else if (nav === "requests") {
            closeAgencyHistoryPage();
            closeAgencyPayoutsPage();
            closeAgencyCommissionPage();
            openAgencyApplicationsPage();

        } else if (nav === "home") {
            closeAgencyHostsPage();
            closeAgencyApplicationsPage();
            closeAgencyHistoryPage();
            closeAgencyPayoutsPage();
            closeAgencyCommissionPage();
        }

        // Set the selected button last so close functions
        // cannot reset it to Home.
        setActiveAgencyNav(button);
    });
});


console.log("Hosts page:", document.getElementById("agencyHostsPage"));
console.log(
  "All Hosts buttons:",
  document.querySelectorAll('[data-agency-action="all-hosts"]').length
);
console.log(
  "Open Hosts function:",
  typeof openAgencyHostsPage
);



/* =====================================
   ADD HOST BOTTOM SHEET
===================================== */

const addHostBackdrop =
    document.getElementById("addHostBackdrop");

const addHostSheet =
    document.getElementById("addHostSheet");

const closeAddHostButton =
    document.getElementById("closeAddHost");

const addHostForm =
    document.getElementById("addHostForm");

const addHostUserId =
    document.getElementById("addHostUserId");

const addHostMessage =
    document.getElementById("addHostMessage");

const sendHostInviteButton =
    document.getElementById("sendHostInvite");

let previousAddHostOverflow = "";

function openAddHostSheet() {
    if (!addHostBackdrop) {
        console.error("Add host HTML was not found.");
        return;
    }

    previousAddHostOverflow = document.body.style.overflow;

    addHostBackdrop.classList.add("active");
    addHostBackdrop.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (addHostMessage) {
        addHostMessage.textContent = "";
    }

    if (sendHostInviteButton) {
        sendHostInviteButton.disabled = false;
    }

    if (addHostUserId) {
        addHostUserId.focus();
    }
}

function closeAddHostSheet() {
    if (!addHostBackdrop) return;

    addHostBackdrop.classList.remove("active");
    addHostBackdrop.setAttribute("aria-hidden", "true");

    document.body.style.overflow = previousAddHostOverflow;
}

/* Connect the existing Add host quick-action button */
document.querySelectorAll(
    '#agencyCenterOverlay [data-agency-action="add-host"]'
).forEach(button => {
    button.addEventListener("click", openAddHostSheet);
});

/* Close with X */
if (closeAddHostButton) {
    closeAddHostButton.addEventListener(
        "click",
        closeAddHostSheet
    );
}

/* Close when the backdrop itself is tapped */
if (addHostBackdrop) {
    addHostBackdrop.addEventListener("click", event => {
        if (event.target === addHostBackdrop) {
            closeAddHostSheet();
        }
    });
}

/* Close with Escape */
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        addHostBackdrop?.classList.contains("active")
    ) {
        closeAddHostSheet();
    }
});

/* Temporary form validation until the request system is connected */
if (addHostForm) {
    addHostForm.addEventListener("submit", event => {
        event.preventDefault();

        const userId = addHostUserId.value.trim();

        if (!userId) {
            addHostMessage.textContent =
                "Please enter a user's LARCK ID.";
            addHostMessage.style.color = "#d92d45";
            addHostUserId.focus();
            return;
        }

        addHostMessage.textContent =
            "The user search and host request system will be connected next.";
        addHostMessage.style.color = "#777181";
    });
}


/* =====================================
   AGENCY APPLICATIONS PAGE FUNCTIONALITY
===================================== */

const agencyApplicationsPage =
    document.getElementById("agencyApplicationsPage");

const closeAgencyApplicationsButton =
    document.getElementById("closeAgencyApplications");

const applicationTabButtons =
    document.querySelectorAll("[data-application-tab]");

const applicationPanels = {
    pending: document.getElementById("pendingApplicationsPanel"),
    accepted: document.getElementById("acceptedApplicationsPanel"),
    declined: document.getElementById("declinedApplicationsPanel")
};

const pendingApplicationsBadge =
    document.getElementById("pendingApplicationsBadge");

function openAgencyApplicationsPage() {
    if (!agencyApplicationsPage) {
        console.error("Applications page HTML was not found.");
        return;
    }

    agencyHistoryPage.hidden = true;
    agencyApplicationsPage.classList.add("active");
    agencyApplicationsPage.setAttribute("aria-hidden", "false");

    // Requests is the active Agency Center destination.
    setApplicationTab("pending");

    document.querySelectorAll("[data-app-nav]").forEach(button => {
        const active = button.dataset.appNav === "requests";

        button.classList.toggle("active", active);
        button.setAttribute(
            "aria-current",
            active ? "page" : "false"
        );
    });

    // Keep the main Agency Center navigation in sync.
    const requestsButton = document.querySelector(
        '#agencyCenterOverlay [data-agency-nav="requests"]'
    );

    if (requestsButton && typeof setActiveAgencyNav === "function") {
        setActiveAgencyNav(requestsButton);
    }
}

function closeAgencyApplicationsPage() {
    if (!agencyApplicationsPage) return;

    agencyApplicationsPage.classList.remove("active");
    agencyApplicationsPage.setAttribute("aria-hidden", "true");

    // Returning to Agency Center means Home is active again.
    const homeButton = document.querySelector(
        '#agencyCenterOverlay [data-agency-nav="home"]'
    );

    if (homeButton && typeof setActiveAgencyNav === "function") {
        setActiveAgencyNav(homeButton);
    }
}

function setApplicationTab(tabName) {
    applicationTabButtons.forEach(button => {
        const active = button.dataset.applicationTab === tabName;

        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
    });

    Object.entries(applicationPanels).forEach(([name, panel]) => {
        if (!panel) return;

        const active = name === tabName;

        panel.classList.toggle("active", active);
        panel.hidden = !active;
    });
}

/* Switch Pending / Accepted / Declined */
applicationTabButtons.forEach(button => {
    button.addEventListener("click", () => {
        setApplicationTab(button.dataset.applicationTab);
    });
});

/* Back arrow */
if (closeAgencyApplicationsButton) {
    closeAgencyApplicationsButton.addEventListener(
        "click",
        closeAgencyApplicationsPage
    );
}

/* Agency Center Requests quick action */
document.querySelectorAll(
    '#agencyCenterOverlay [data-agency-action="requests"]'
).forEach(button => {
    button.addEventListener("click", openAgencyApplicationsPage);
});

/* Applications page bottom navigation */
document.querySelectorAll("[data-app-nav]").forEach(button => {
    button.addEventListener("click", () => {
        const destination = button.dataset.appNav;

        if (destination === "requests") {
            setApplicationTab("pending");
            return;
        }

        if (destination === "add-sub-agent") {
    closeAgencyApplicationsPage();
    openAddAgencyPage();
    return;
}
        if (destination === "home") {
            closeAgencyApplicationsPage();
            return;
        }

        // Keep the tapped item visibly selected until its page is connected.
        document.querySelectorAll("[data-app-nav]").forEach(navButton => {
            const active = navButton === button;

            navButton.classList.toggle("active", active);
            navButton.setAttribute(
                "aria-current",
                active ? "page" : "false"
            );
        });
    });
});

/* Escape closes Applications */
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        agencyApplicationsPage &&
        agencyApplicationsPage.classList.contains("active")
    ) {
        closeAgencyApplicationsPage();
    }
});

/* Pending count starts at zero until real requests are connected. */
if (pendingApplicationsBadge) {
    pendingApplicationsBadge.textContent = "0";
}



/* =====================================
   LOAD REAL AGENCY HOST REQUESTS
===================================== */

let currentAgencyRequestsId = null;

async function loadAgencyApplications() {
    const panels = {
        pending: document.getElementById("pendingApplicationsPanel"),
        accepted: document.getElementById("acceptedApplicationsPanel"),
        declined: document.getElementById("declinedApplicationsPanel")
    };

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        // Find the agency owned by the signed-in user.
        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("id")
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;
        if (!agency) throw new Error("Your agency was not found.");

        currentAgencyRequestsId = agency.id;

        // Get requests submitted to this agency.
        const { data: requests, error: requestsError } =
            await larckSupabase
                .from("agency_join_requests")
                .select("id, host_id, agency_id, status")
                .eq("agency_id", agency.id);

        if (requestsError) throw requestsError;

        const allRequests = requests || [];

        // Update the real Pending badge.
        if (pendingApplicationsBadge) {
            pendingApplicationsBadge.textContent = String(
                allRequests.filter(
                    request => request.status === "pending"
                ).length
            );
        }

        // Get the host profiles without assuming a foreign-key join.
        const hostIds = [
            ...new Set(allRequests.map(request => request.host_id))
        ];

        let profilesById = {};

        if (hostIds.length) {
            const { data: profiles, error: profilesError } =
                await larckSupabase
                    .from("profiles")
                    .select("id, username, larck_id, profile_picture")
                    .in("id", hostIds);

            if (profilesError) throw profilesError;

            (profiles || []).forEach(profile => {
                profilesById[profile.id] = profile;
            });
        }

        ["pending", "accepted", "declined"].forEach(status => {
            const panel = panels[status];
            if (!panel) return;

            const matching = allRequests.filter(
                request => request.status === status
            );

            if (!matching.length) {
                panel.innerHTML = `
                    <div class="agency-applications-empty">
                        <strong>No ${status} requests</strong>
                        <p>Host requests will appear here.</p>
                    </div>
                `;
                return;
            }

            panel.innerHTML = matching.map(request => {
                const host = profilesById[request.host_id] || {};
                const username = escapeAgencyHostHtml(
                    host.username || "LARCK User"
                );
                const larckId = escapeAgencyHostHtml(
                    host.larck_id || "—"
                );
                const picture = escapeAgencyHostHtml(
                    host.profile_picture || ""
                );

                const avatar = picture
                    ? `<img src="${picture}" alt=""
                            onerror="this.style.display='none'">`
                    : `<span class="agency-request-avatar-letter">${
                        username.charAt(0).toUpperCase()
                    }</span>`;

                const actions = status === "pending"
                    ? `
                        <div class="agency-request-actions">
                            <button type="button"
                                data-request-action="accept"
                                data-request-id="${request.id}">
                                Accept
                            </button>
                            <button type="button"
                                data-request-action="decline"
                                data-request-id="${request.id}">
                                Decline
                            </button>
                        </div>
                    `
                    : "";

               
return `
    <article class="agency-request-card">
        <div class="agency-request-host">
            <div class="agency-request-avatar">
                ${avatar}
            </div>

            <div class="agency-request-details">
                <strong>${username}</strong>
                <span>ID: ${larckId}</span>
                ${status !== "pending"
                    ? `<small>Status: ${status}</small>`
                    : ""}
            </div>
        </div>

        ${actions}
    </article>
`;

            }).join("");
        });

    } catch (error) {
        console.error("Loading agency requests failed:", error);
        alert(
            "Unable to load agency requests. " +
            (error.message || "Please try again.")
        );
    }
}

/* Load requests whenever the Requests page opens. */
const originalOpenAgencyApplicationsPage =
    openAgencyApplicationsPage;

openAgencyApplicationsPage = function () {
    originalOpenAgencyApplicationsPage();
    loadAgencyApplications();
};

/* Handle Accept and Decline buttons. */
document.addEventListener("click", async event => {
    const button = event.target.closest("[data-request-action]");
    if (!button) return;

    const action = button.dataset.requestAction;
    const requestId = button.dataset.requestId;

    if (!["accept", "decline"].includes(action)) return;
    if (!currentAgencyRequestsId || !requestId) return;

    const newStatus = action === "accept" ? "accepted" : "declined";

    button.disabled = true;

    try {
        // Confirm this signed-in user still owns this agency.
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("id")
                .eq("id", currentAgencyRequestsId)
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;
        if (!agency) {
            throw new Error("You are not authorized to manage these requests.");
        }

        const { data: updatedRequest, error: updateError } =
            await larckSupabase
                .from("agency_join_requests")
                .update({ status: newStatus })
                .eq("id", requestId)
                .eq("agency_id", agency.id)
                .eq("status", "pending")
                .select("id")
                .maybeSingle();

        if (updateError) throw updateError;

        if (!updatedRequest) {
            throw new Error(
                "This request has already changed or is no longer available."
            );
        }

        await loadAgencyApplications();

    } catch (error) {
        console.error("Updating agency request failed:", error);
        alert(
            "Unable to " + action + " this request. " +
            (error.message || "Please try again.")
        );
    } finally {
        button.disabled = false;
    }
});



/* ===== LARCK AGENCY HISTORY LOGIC ===== */
const agencyHistoryPage = document.getElementById("agencyHistoryPage");
const closeAgencyHistoryButton = document.getElementById("closeAgencyHistory");

const historyTabs = document.querySelectorAll(
  "#agencyHistoryPage [data-history-tab]"
);

const historyPanels = {
  gift: document.getElementById("giftHistoryPanel"),
  calls: document.getElementById("callsHistoryPanel"),
  "audio-live": document.getElementById("audioLiveHistoryPanel")
};

const historySummary = document.getElementById("historyRecordSummary");
const historyNavigation = document.querySelectorAll(
  "#agencyHistoryPage [data-history-nav]"
);

function setHistoryTab(tabName) {
  historyTabs.forEach(function (tab) {
    const selected = tab.dataset.historyTab === tabName;

    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });

  Object.keys(historyPanels).forEach(function (key) {
    historyPanels[key].hidden = key !== tabName;
  });

  if (historySummary) {
    historySummary.textContent =
      "0 records · 01 Oct – 31 Oct 2026";
  }
}

function openAgencyHistoryPage() {
  if (!agencyHistoryPage) return;
   
  agencyHistoryPage.hidden = false;
  agencyHistoryPage.classList.add("active");
  agencyHistoryPage.setAttribute("aria-hidden", "false");

  setHistoryTab("gift");

 historyNavigation.forEach(function (button) {
  button.classList.remove("active");
  button.setAttribute("aria-current", "false");
});

  if (typeof setActiveAgencyNav === "function") {
    const earningsButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="earnings"]'
    );

    if (earningsButton) setActiveAgencyNav(earningsButton);
  }
}

function closeAgencyHistoryPage() {
  if (!agencyHistoryPage) return;

  agencyHistoryPage.classList.remove("active");
  agencyHistoryPage.setAttribute("aria-hidden", "true");

  if (typeof setActiveAgencyNav === "function") {
    const homeButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="home"]'
    );

    if (homeButton) setActiveAgencyNav(homeButton);
  }
}

historyTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    setHistoryTab(tab.dataset.historyTab);
  });
});

if (closeAgencyHistoryButton) {
  closeAgencyHistoryButton.addEventListener(
    "click",
    closeAgencyHistoryPage
  );
}

historyNavigation.forEach(function (button) {
  button.addEventListener("click", function () {
    const destination = button.dataset.historyNav;

    if (destination === "earnings") {
      setHistoryTab("gift");
      return;
    }

    closeAgencyHistoryPage();

    if (destination === "home") {
      return;
    }

   if (destination === "add-sub-agent") {
    closeAgencyApplicationsPage();
    openAddAgencyPage();
    return;
}

    if (destination === "requests") {
      if (typeof openAgencyApplicationsPage === "function") {
        openAgencyApplicationsPage();
      }
    }

    // Hosts will open its page when that page is implemented.
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    agencyHistoryPage &&
    agencyHistoryPage.classList.contains("active")
  ) {
    closeAgencyHistoryPage();
  }
});



/* ===== LARCK AGENCY PAYOUTS LOGIC ===== */
const agencyPayoutsPage = document.getElementById("agencyPayoutsPage");
const closeAgencyPayoutsButton = document.getElementById("closeAgencyPayouts");

const weeklyIncomeButton = document.getElementById("weeklyIncomeButton");
const requestPayoutButton = document.getElementById("requestPayoutButton");

const payoutRequestsView = document.getElementById("payoutRequestsView");
const weeklyIncomeView = document.getElementById("weeklyIncomeView");

const payoutNavigation = document.querySelectorAll(
  "#agencyPayoutsPage [data-payout-nav]"
);

function setPayoutView(viewName) {
  const showingWeeklyIncome = viewName === "weekly";

  payoutRequestsView.hidden = showingWeeklyIncome;
  weeklyIncomeView.hidden = !showingWeeklyIncome;

  weeklyIncomeButton.classList.toggle("active", showingWeeklyIncome);
  weeklyIncomeButton.setAttribute(
    "aria-pressed",
    String(showingWeeklyIncome)
  );
}

function openAgencyPayoutsPage() {
  if (!agencyPayoutsPage) return;
  
  agencyPayoutsPage.hidden = false;
  agencyPayoutsPage.classList.add("active");
  agencyPayoutsPage.setAttribute("aria-hidden", "false");

  setPayoutView("requests");

  payoutNavigation.forEach(function (button) {
    const active = button.dataset.payoutNav === "earnings";
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });

  if (typeof setActiveAgencyNav === "function") {
    const earningsButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="earnings"]'
    );

    if (earningsButton) setActiveAgencyNav(earningsButton);
  }
}

function closeAgencyPayoutsPage() {
  if (!agencyPayoutsPage) return;

  agencyPayoutsPage.classList.remove("active");
  agencyPayoutsPage.setAttribute("aria-hidden", "true");

  if (typeof setActiveAgencyNav === "function") {
    const homeButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="home"]'
    );

    if (homeButton) setActiveAgencyNav(homeButton);
  }
}

if (weeklyIncomeButton) {
  weeklyIncomeButton.addEventListener("click", function () {
    setPayoutView("weekly");
  });
}

if (requestPayoutButton) {
  requestPayoutButton.addEventListener("click", function () {
    alert(
      "Payout requests will be available when payout submission is connected."
    );
  });
}

if (closeAgencyPayoutsButton) {
  closeAgencyPayoutsButton.addEventListener(
    "click",
    closeAgencyPayoutsPage
  );
}

payoutNavigation.forEach(function (button) {
  button.addEventListener("click", function () {
    const destination = button.dataset.payoutNav;

    if (destination === "earnings") {
      setPayoutView("requests");
      return;
    }

    closeAgencyPayoutsPage();

    if (destination === "home") return;

   if (destination === "add-sub-agent") {
    closeAgencyApplicationsPage();
    openAddAgencyPage();
    return;
}

    if (destination === "requests") {
      if (typeof openAgencyApplicationsPage === "function") {
        openAgencyApplicationsPage();
      }
    }

    // Hosts will open its page when that page is implemented.
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    agencyPayoutsPage &&
    agencyPayoutsPage.classList.contains("active")
  ) {
    closeAgencyPayoutsPage();
  }
});



/* ===== LARCK AGENCY COMMISSION LOGIC ===== */
const agencyCommissionPage = document.getElementById("agencyCommissionPage");
const closeAgencyCommissionButton = document.getElementById("closeAgencyCommission");

const commissionPeriodButtons = document.querySelectorAll(
  "#agencyCommissionPage [data-commission-period]"
);

const commissionDateRange = document.getElementById("commissionDateRange");

const commissionNavigation = document.querySelectorAll(
  "#agencyCommissionPage [data-commission-nav]"
);

function formatCommissionDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  return day + " " + month + " " + date.getFullYear();
}

function setCommissionPeriod(period) {
  commissionPeriodButtons.forEach(function (button) {
    const selected = button.dataset.commissionPeriod === period;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (!commissionDateRange) return;

  // Reference date requested for the Commission report.
  const today = new Date(2026, 9, 14);
  let start;
  let end = new Date(today);

  if (period === "week") {
    start = new Date(today);
    const day = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - day);
  } else if (period === "year") {
    start = new Date(today.getFullYear(), 0, 1);
  } else if (period === "custom") {
    // Custom date selection can be connected later.
    commissionDateRange.textContent = "Select a custom date range";
    return;
  } else {
    start = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  commissionDateRange.textContent =
    formatCommissionDate(start) + " → " + formatCommissionDate(end);
}

function openAgencyCommissionPage() {
  if (!agencyCommissionPage) return;
  agencyCommissionPage.hidden = false;
  agencyCommissionPage.classList.add("active");
  agencyCommissionPage.setAttribute("aria-hidden", "false");

  setCommissionPeriod("month");

  commissionNavigation.forEach(function (button) {
    const active = button.dataset.commissionNav === "earnings";
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });

  if (typeof setActiveAgencyNav === "function") {
    const earningsButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="earnings"]'
    );

    if (earningsButton) setActiveAgencyNav(earningsButton);
  }
}

function closeAgencyCommissionPage() {
  if (!agencyCommissionPage) return;

  agencyCommissionPage.classList.remove("active");
  agencyCommissionPage.setAttribute("aria-hidden", "true");

  if (typeof setActiveAgencyNav === "function") {
    const homeButton = document.querySelector(
      '#agencyCenterOverlay [data-agency-nav="home"]'
    );

    if (homeButton) setActiveAgencyNav(homeButton);
  }
}

commissionPeriodButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setCommissionPeriod(button.dataset.commissionPeriod);
  });
});

if (closeAgencyCommissionButton) {
  closeAgencyCommissionButton.addEventListener(
    "click",
    closeAgencyCommissionPage
  );
}

commissionNavigation.forEach(function (button) {
  button.addEventListener("click", function () {
    const destination = button.dataset.commissionNav;

    if (destination === "earnings") {
      setCommissionPeriod("month");
      return;
    }

    closeAgencyCommissionPage();

    if (destination === "home") return;

    if (destination === "add-sub-agent") {
    closeAgencyApplicationsPage();
    openAddAgencyPage();
    return;
    }
    if (destination === "requests") {
      if (typeof openAgencyApplicationsPage === "function") {
        openAgencyApplicationsPage();
      }
    }

    // Hosts will open its page when that page is implemented.
  });
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    agencyCommissionPage &&
    agencyCommissionPage.classList.contains("active")
  ) {
    closeAgencyCommissionPage();
  }
});



/* =========================
   AGENCY HOSTS PAGE
========================= */


let agencyHostsCurrentFilter = "all";
let agencyHostsData = [];

async function loadAgencyHosts() {
    const list = document.getElementById("agencyHostsList");

    if (list) {
        list.innerHTML = "<p>Loading hosts...</p>";
    }

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        // Find the agency belonging to this owner.
        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("id")
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;
        if (!agency) throw new Error("Your agency was not found.");

        // Only accepted hosts count as official agency hosts.
        const { data: requests, error: requestsError } =
            await larckSupabase
                .from("agency_join_requests")
                .select("host_id, status")
                .eq("agency_id", agency.id)
                .eq("status", "accepted");

        if (requestsError) throw requestsError;

        // Remove duplicate host IDs so one host counts only once.
        const hostIds = [
            ...new Set((requests || []).map(request => request.host_id))
        ];

        if (!hostIds.length) {
            agencyHostsData = [];
            renderAgencyHostsList();
            return;
        }

        // Load the accepted hosts' real profile details.
        const { data: profiles, error: profilesError } =
            await larckSupabase
                .from("profiles")
                .select("id, username, larck_id, profile_picture")
                .in("id", hostIds);

        if (profilesError) throw profilesError;

        const profilesById = {};

        (profiles || []).forEach(profile => {
            profilesById[profile.id] = profile;
        });

        agencyHostsData = hostIds.map(hostId => {
            const profile = profilesById[hostId] || {};

            return {
                id: hostId,
                username: profile.username || "LARCK User",
                larck_id: profile.larck_id || "—",
                profile_picture: profile.profile_picture || "",
                status: "active",
                income: 0,
                online: false
            };
        });

        renderAgencyHostsList();

    } catch (error) {
        console.error("Loading agency hosts failed:", error);

        if (list) {
            list.innerHTML = `
                <div class="agency-hosts-empty">
                    <strong>Unable to load hosts</strong>
                    <p>Please check your connection and try again.</p>
                    <button type="button" id="retryAgencyHosts">
                        Try again
                    </button>
                </div>
            `;

            document.getElementById("retryAgencyHosts")
                ?.addEventListener("click", loadAgencyHosts);
        }
    }
}

function openAgencyHostsPage() {
  const page = document.getElementById("agencyHostsPage");
  if (!page) return;

  // Hide other nested Agency Center pages.
  [
    "agencyApplicationsPage",
    "agencyHistoryPage",
    "agencyPayoutsPage",
    "agencyCommissionPage"
  ].forEach(id => {
    const otherPage = document.getElementById(id);
    if (otherPage) otherPage.hidden = true;
  });

  page.hidden = false;
page.classList.add("active");
page.setAttribute("aria-hidden", "false");

agencyHostsCurrentFilter = "all";

  const search = document.getElementById("agencyHostsSearch");
  if (search) search.value = "";

  setAgencyHostsFilter("all");
  loadAgencyHosts();
}

function closeAgencyHostsPage() {
    const page = document.getElementById("agencyHostsPage");

    if (page) {
        page.hidden = true;
        page.classList.remove("active");
        page.setAttribute("aria-hidden", "true");
    }
}

function setAgencyHostsFilter(filter) {
  agencyHostsCurrentFilter = filter;

  document.querySelectorAll("[data-host-filter]").forEach(button => {
    const selected = button.dataset.hostFilter === filter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  renderAgencyHostsList();
}


function renderAgencyHostsList() {
    const list = document.getElementById("agencyHostsList");
    if (!list) return;

    const searchInput = document.getElementById("agencyHostsSearch");
    const query = (searchInput?.value || "").trim().toLowerCase();

    const hosts = agencyHostsData;

    const filteredHosts = hosts.filter(host => {
        const matchesFilter =
            agencyHostsCurrentFilter === "all" ||
            (agencyHostsCurrentFilter === "active" &&
                host.status === "active") ||
            (agencyHostsCurrentFilter === "blocked" &&
                host.status === "blocked");

        const matchesSearch =
            String(host.username).toLowerCase().includes(query) ||
            String(host.larck_id).toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });

    const totalCount = document.getElementById("totalHostsCount");
    const activeCount = document.getElementById("activeHostsCount");
    const incomeCount = document.getElementById("totalHostsIncome");

    if (totalCount) {
        totalCount.textContent = String(hosts.length);
    }

    if (activeCount) {
        activeCount.textContent = String(
            hosts.filter(host => host.status === "active").length
        );
    }

    // Income is not connected to real earnings transactions yet.
    if (incomeCount) {
        incomeCount.textContent = "0";
    }

    if (!filteredHosts.length) {
        list.innerHTML = `
            <div class="agency-hosts-empty">
                <div class="agency-hosts-empty-icon">&#9825;</div>
                <strong>${hosts.length ? "No matching hosts" : "No host yet"}</strong>
                <p>${
                    hosts.length
                        ? "Try another name or LARCK ID."
                        : "Accepted hosts will appear here."
                }</p>
            </div>
        `;
        return;
    }

    list.innerHTML = filteredHosts.map(host => {
        const username = escapeAgencyHostHtml(host.username);
        const larckId = escapeAgencyHostHtml(host.larck_id);
        const picture = escapeAgencyHostHtml(host.profile_picture);

        const avatar = picture
            ? `<img class="agency-host-avatar"
                    src="${picture}"
                    alt="${username}"
                    onerror="this.style.display='none'">`
            : `<div class="agency-host-avatar agency-host-avatar-fallback">
                    ${username.charAt(0).toUpperCase()}
               </div>`;

        return `
            <article class="agency-host-row">
                <div class="agency-host-avatar-wrap">
                    ${avatar}
                    <span class="agency-host-online"
                        style="display:none"></span>
                </div>

                <div class="agency-host-details">
                    <strong class="agency-host-name">${username}</strong>
                    <span class="agency-host-id">ID: ${larckId}</span>
                </div>

                <div class="agency-host-income">
                    <strong>0</strong>
                    <small>Host income</small>
                </div>
            </article>
        `;
    }).join("");
}

function escapeAgencyHostHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

document.querySelectorAll("[data-host-filter]").forEach(button => {
  button.addEventListener("click", () => {
    setAgencyHostsFilter(button.dataset.hostFilter);
  });
});

document.getElementById("agencyHostsSearch")?.addEventListener(
  "input",
  renderAgencyHostsList
);



document.addEventListener("click", function (event) {
    const button = event.target.closest(
        "#agencyCenterOverlay [data-agency-nav]," +
        "#agencyApplicationsPage [data-app-nav]," +
        "#agencyHistoryPage [data-history-nav]," +
        "#agencyPayoutsPage [data-payout-nav]," +
        "#agencyCommissionPage [data-commission-nav]," +
        "#agencyHostsPage [data-host-nav]"
    );

    if (!button) return;

    const destination =
        button.dataset.agencyNav ||
        button.dataset.appNav ||
        button.dataset.historyNav ||
        button.dataset.payoutNav ||
        button.dataset.commissionNav ||
        button.dataset.hostNav;

    if (
        ![
            "home",
            "hosts",
            "add-sub-agent",
            "requests",
            "earnings"
        ].includes(destination)
    ) {
        return;
    }

    navigateAgency(destination);
});




document.querySelectorAll("[data-host-nav]").forEach(button => {
    button.addEventListener("click", () => {
        const nav = button.dataset.hostNav;

        if (nav === "home") {
            closeAgencyHostsPage();
        } else if (nav === "hosts") {
            setAgencyHostsFilter("all");
            renderAgencyHostsList();
        } else if (nav === "add-sub-agent") {
            closeAgencyHostsPage();
            openAddAgencyPage();
        } else if (nav === "requests") {
            closeAgencyHostsPage();
            openAgencyApplicationsPage();
        } else if (nav === "earnings") {
            closeAgencyHostsPage();
            openAgencyCommissionPage();
        }
    });
});



/* LARCK — Agency Center navigation correction */
(function fixAgencyCenterNavigation() {
    const navSelector = [
        "[data-agency-nav]",
        "[data-app-nav]",
        "[data-history-nav]",
        "[data-payout-nav]",
        "[data-commission-nav]",
        "[data-host-nav]"
    ].join(",");

    function setAgencyNavigationActive(destination) {
        document.querySelectorAll(navSelector).forEach(button => {
            const value = (
                button.dataset.agencyNav ||
                button.dataset.appNav ||
                button.dataset.historyNav ||
                button.dataset.payoutNav ||
                button.dataset.commissionNav ||
                button.dataset.hostNav ||
                ""
            ).toLowerCase();

            const isActive = value === destination;

            button.classList.toggle("active", isActive);

            if (isActive) {
                button.setAttribute("aria-current", "page");
            } else {
                button.removeAttribute("aria-current");
            }
        });
    }

    function closeAgencySubpages() {
        if (typeof closeAgencyApplicationsPage === "function") {
            closeAgencyApplicationsPage();
        }

        if (typeof closeAgencyHistoryPage === "function") {
            closeAgencyHistoryPage();
        }

        if (typeof closeAgencyPayoutsPage === "function") {
            closeAgencyPayoutsPage();
        }

        if (typeof closeAgencyCommissionPage === "function") {
            closeAgencyCommissionPage();
        }

        if (typeof closeAgencyHostsPage === "function") {
            closeAgencyHostsPage();
        }

        if (typeof closeAddAgencyPage === "function") {
            closeAddAgencyPage();
        }
    }

    function navigateAgency(destination) {
        closeAgencySubpages();

        switch (destination) {
            case "home":
                setAgencyNavigationActive("home");
                break;

            case "hosts":
                if (typeof openAgencyHostsPage === "function") {
                    openAgencyHostsPage();
                }
                setAgencyNavigationActive("hosts");
                break;

            case "requests":
            case "applications":
                if (typeof openAgencyApplicationsPage === "function") {
                    openAgencyApplicationsPage();
                }
                setAgencyNavigationActive("requests");
                break;

            case "earnings":
            case "commission":
                if (typeof openAgencyCommissionPage === "function") {
                    openAgencyCommissionPage();
                }
                setAgencyNavigationActive("earnings");
                break;

            case "history":
                if (typeof openAgencyHistoryPage === "function") {
                    openAgencyHistoryPage();
                }
                setAgencyNavigationActive("history");
                break;

            case "payouts":
                if (typeof openAgencyPayoutsPage === "function") {
                    openAgencyPayoutsPage();
                }
                setAgencyNavigationActive("payouts");
                break;

            case "add-sub-agent":
            case "add-agency":
                if (typeof openAddAgencyPage === "function") {
                    openAddAgencyPage();
                }
                setAgencyNavigationActive("add-sub-agent");
                break;

            default:
                return;
        }
    }

    document.addEventListener("click", function (event) {
        const button = event.target.closest(navSelector);
        if (!button) return;

        const destination = (
            button.dataset.agencyNav ||
            button.dataset.appNav ||
            button.dataset.historyNav ||
            button.dataset.payoutNav ||
            button.dataset.commissionNav ||
            button.dataset.hostNav ||
            ""
        ).toLowerCase();

        const destinations = [
            "home", "hosts", "requests", "applications",
            "earnings", "commission", "history", "payouts",
            "add-sub-agent", "add-agency"
        ];

        if (!destinations.includes(destination)) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        navigateAgency(destination);
    }, true);

    /* Correct the Applications page visibility typo. */
    if (typeof openAgencyApplicationsPage === "function") {
        const originalOpenApplications = openAgencyApplicationsPage;

        window.openAgencyApplicationsPage = function () {
            const page = document.getElementById("agencyApplicationsPage");

            if (page) page.hidden = false;

            originalOpenApplications();
        };
    }
})();


/* =====================================
   LARCK SUPPORT FORM
===================================== */

const supportPage = document.getElementById("supportPage");
const closeSupportPageButton =
    document.getElementById("closeSupportPage");
const supportForm = document.getElementById("supportForm");
const supportCategory = document.getElementById("supportCategory");
const supportSubject = document.getElementById("supportSubject");
const supportMessage = document.getElementById("supportMessage");
const supportAttachments = document.getElementById("supportAttachments");
const supportImagePreview = document.getElementById("supportImagePreview");
const supportFormStatus = document.getElementById("supportFormStatus");
const submitSupportButton = document.getElementById("submitSupport");

let supportPreviousOverflow = "";
let supportSelectedImages = [];

function openSupportPage() {
    if (!supportPage) {
        console.error("Support page HTML was not found.");
        alert("The Support screen could not open.");
        return;
    }

    supportPreviousOverflow = document.body.style.overflow;
    supportPage.classList.add("active");
    supportPage.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeSupportPage() {
    if (!supportPage) return;

    supportPage.classList.remove("active");
    supportPage.setAttribute("aria-hidden", "true");
    document.body.style.overflow = supportPreviousOverflow;
}

closeSupportPageButton?.addEventListener("click", closeSupportPage);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        supportPage?.classList.contains("active")) {
        closeSupportPage();
    }
});

supportAttachments?.addEventListener("change", () => {
    const files = Array.from(supportAttachments.files || []);
    supportImagePreview.replaceChildren();
    supportSelectedImages = [];

    if (files.length > 3) {
        supportFormStatus.textContent = "Please select no more than 3 images.";
        supportFormStatus.style.color = "#d92d45";
        supportAttachments.value = "";
        return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    for (const file of files) {
        if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
            supportFormStatus.textContent =
                "Use JPG, PNG, or WEBP images, each no larger than 5 MB.";
            supportFormStatus.style.color = "#d92d45";
            supportAttachments.value = "";
            supportImagePreview.replaceChildren();
            return;
        }
    }

    supportSelectedImages = files;
    supportFormStatus.textContent = "";

    files.forEach(file => {
        const image = document.createElement("img");
        image.alt = "Selected screenshot";
        image.src = URL.createObjectURL(file);
        supportImagePreview.appendChild(image);
    });
});

supportForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const category = supportCategory.value;
    const subject = supportSubject.value.trim();
    const message = supportMessage.value.trim();

    if (!subject || !message) {
        supportFormStatus.textContent = "Please complete the subject and message.";
        supportFormStatus.style.color = "#d92d45";
        return;
    }

    submitSupportButton.disabled = true;
    supportFormStatus.textContent = "Submitting your message...";
    supportFormStatus.style.color = "#6d6877";

    const uploadedPaths = [];

    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in before contacting Support.");

        const { data: profile, error: profileError } = await larckSupabase
            .from("profiles")
            .select("username, larck_id")
            .eq("id", user.id)
            .maybeSingle();

        if (profileError) throw profileError;

        for (const file of supportSelectedImages) {
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;

            const { error: uploadError } = await larckSupabase.storage
                .from("larck-support")
                .upload(path, file, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: file.type
                });

            if (uploadError) throw uploadError;
            uploadedPaths.push(path);
        }

        /*
          This insert assumes support_submissions has these columns:
          user_id, username, larck_id, category, subject, message,
          attachment_paths, status, created_at.

          Confirm the actual columns in Step 1 before testing.
        */
       
        const { error: insertError } = await larckSupabase
            .from("support_submissions")
            .insert({
                user_id: user.id,
                contact: user.email || "",
                category: category,
                message: `${subject}\n\n${message}`,
                attachment_url: uploadedPaths.length
                    ? uploadedPaths[0]
                    : null,
                attachment_paths: uploadedPaths,
                status: "open"
            });

        if (insertError) throw insertError;

        supportForm.reset();
        supportSelectedImages = [];
        supportImagePreview.replaceChildren();

        supportFormStatus.textContent =
            "Your message was submitted successfully. Thank you for contacting LARCK Support.";
        supportFormStatus.style.color = "#168347";

    } catch (error) {
        console.error("LARCK Support submission failed:", error);

        /*
          Do not automatically delete uploaded files here:
          the database insert may have succeeded before a network error.
        */
        supportFormStatus.textContent =
            "We couldn't submit your message. " +
            (error.message || "Please check your connection and try again.");
        supportFormStatus.style.color = "#d92d45";

    } finally {
        submitSupportButton.disabled = false;
    }
});

/* =====================================
   COIN SELLER OVERLAY
===================================== */

const coinSellerOverlay =
    document.getElementById("coinSellerOverlay");

const closeCoinSellerButton =
    document.getElementById("closeCoinSeller");

const meRechargeButton =
    document.querySelector(
        '.feature-item[data-feature="recharge"]'
    );

let coinSellerIsAgencyOwner = false;


/* HIDE RECHARGE UNTIL AGENCY OWNERSHIP IS VERIFIED */

if (meRechargeButton) {
    meRechargeButton.hidden = true;
}


/* CHECK THE SIGNED-IN USER'S AGENCY */

async function initializeCoinSellerAccess() {
    try {
        const {
            data: { user },
            error: authError
        } = await larckSupabase.auth.getUser();

        if (authError) throw authError;

        if (!user) return;

        const { data: agency, error: agencyError } =
            await larckSupabase
                .from("agencies")
                .select("id, agency_id, username")
                .eq("owner_id", user.id)
                .maybeSingle();

        if (agencyError) throw agencyError;

        if (!agency) return;

        coinSellerIsAgencyOwner = true;

        if (meRechargeButton) {
            meRechargeButton.hidden = false;
        }

        document.getElementById("csAgencyName").textContent =
            agency.username || "My Agency";

        document.getElementById("csAgencyId").textContent =
            agency.agency_id || "—";

       const { data: sellerProfile, error: profileError } =
    await larckSupabase
        .from("profiles")
        .select("profile_picture")
        .eq("id", user.id)
        .maybeSingle();

const logoImage = document.getElementById("csAgencyLogo");
const logoFallback = document.getElementById("csAgencyLogoFallback");

logoFallback.textContent =
    (agency.username || "A").trim().charAt(0).toUpperCase();

if (!profileError && sellerProfile?.profile_picture) {
    logoImage.src = sellerProfile.profile_picture;
    logoImage.hidden = false;
    logoFallback.hidden = true;

    logoImage.onerror = function () {
        logoImage.hidden = true;
        logoFallback.hidden = true;
    };
} else {
    logoImage.hidden = true;
    logoFallback.hidden = true;
}
        await loadCoinSellerBalance(user.id);

    } catch (error) {
        // Fail closed: keep Recharge hidden if verification fails.
        coinSellerIsAgencyOwner = false;

        if (meRechargeButton) {
            meRechargeButton.hidden = true;
        }

        console.error("Coin Seller access check failed:", error);
    }
}


/* LOAD SELLER INVENTORY BALANCE */

async function loadCoinSellerBalance(userId) {
    const balanceElement =
        document.getElementById("csCoinBalance");

    try {
        const { data: seller, error } =
            await larckSupabase
                .from("coin_sellers")
                .select("inventory_balance, status")
                .eq("user_id", userId)
                .maybeSingle();

        if (error) throw error;

        // Only show inventory for an active seller.
        if (!seller || seller.status !== "active") {
            balanceElement.textContent = "0";
            return;
        }

        balanceElement.textContent =
            Number(seller.inventory_balance || 0).toLocaleString();

    } catch (error) {
        console.error("Unable to load seller balance:", error);
        balanceElement.textContent = "—";
    }
}


/* OPEN OVERLAY */

function openCoinSellerOverlay() {
    if (!coinSellerIsAgencyOwner || !coinSellerOverlay) {
        return;
    }

    coinSellerOverlay.classList.add("active");
    coinSellerOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}


/* CLOSE OVERLAY */

function closeCoinSellerOverlay() {
    if (!coinSellerOverlay) return;

    coinSellerOverlay.classList.remove("active");
    coinSellerOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (closeCoinSellerButton) {
    closeCoinSellerButton.addEventListener(
        "click",
        closeCoinSellerOverlay
    );
}


/* CLOSE WITH ESCAPE KEY */

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        coinSellerOverlay &&
        coinSellerOverlay.classList.contains("active")
    ) {
        closeCoinSellerOverlay();
    }
});


/* HELP AND TEMPORARY ACTION MESSAGES */

function setCoinSellerMessage(message) {
    const messageElement =
        document.getElementById("csCoinSellerMessage");

    if (messageElement) {
        messageElement.textContent = message;
    }
}

document.getElementById("coinSellerHelp")
    ?.addEventListener("click", function () {
        setCoinSellerMessage(
            "Coin Seller help: contact LARCK Support if you need assistance."
        );
    });

document.getElementById("csLevelUp")
    ?.addEventListener("click", function () {
        setCoinSellerMessage(
            "Seller level upgrades will be connected here."
        );
    });

document.getElementById("csBalanceDetails")
    ?.addEventListener("click", function () {
        setCoinSellerMessage(
            "Your balance shows your available seller coin inventory."
        );
    });


document.querySelectorAll("[data-coin-action]")
    .forEach(function (button) {
        button.addEventListener("click", function () {
            const action = button.dataset.coinAction;

            if (action === "transfer") {
                openCoinSellerTransfer();
                return;
            }

            if (action === "recharge") {
                openCoinSellerRecharge();
                return;
            }

            if (action === "exchange") {
                openCoinSellerExchange();
                return;
            }

            const messages = {
                recharge: "Seller coin recharge will be connected here.",
                exchange: "Coin exchange will be connected here."
            };

            setCoinSellerMessage(
                messages[action] || "This feature is coming soon."
            );
        });
    });


document.getElementById("csPaymentMethodButton")
    ?.addEventListener("click", function () {
        setCoinSellerMessage(
            "Payment method selection will be connected here."
        );
    });

/* VERIFY AGENCY ACCESS WHEN THE ME PAGE LOADS */

initializeCoinSellerAccess();


/* =====================================
   COIN SELLER TRANSFER SCREEN
===================================== */

const ctOverlay = document.getElementById("coinTransferOverlay");
const ctHistoryOverlay = document.getElementById("ctHistoryOverlay");
const ctAmountInput = document.getElementById("ctAmount");
const ctUserIdInput = document.getElementById("ctUserId");
const ctRecipientInfo = document.getElementById("ctRecipientInfo");
const ctMessage = document.getElementById("ctMessage");

let ctRecipient = null;
let ctRecipientChecked = false;
let ctCurrentUserId = null;
let ctActiveTab = "transfer";

function ctShowMessage(message) {
    if (ctMessage) ctMessage.textContent = message;
}

function ctOpenOverlay() {
    if (!coinSellerIsAgencyOwner || !ctOverlay) return;

    ctOverlay.classList.add("active");
    ctOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    ctMessage.textContent = "";
    ctRefreshBalance();
}

function ctCloseOverlay() {
    ctOverlay?.classList.remove("active");
    ctOverlay?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function ctOpenHistory() {
    ctHistoryOverlay?.classList.add("active");
    ctHistoryOverlay?.setAttribute("aria-hidden", "false");
    ctLoadHistory();
}

function ctCloseHistory() {
    ctHistoryOverlay?.classList.remove("active");
    ctHistoryOverlay?.setAttribute("aria-hidden", "true");
}

document.getElementById("closeCoinTransfer")
    ?.addEventListener("click", ctCloseOverlay);

document.getElementById("ctCloseHistory")
    ?.addEventListener("click", ctCloseHistory);

document.getElementById("ctHelp")
    ?.addEventListener("click", () => {
        ctShowMessage("Contact LARCK Support if you need help.");
    });

/* Open the new screen from the existing Coin Seller action.
   Update the existing transfer action listener to call this function. */
function openCoinSellerTransfer() {
    ctOpenOverlay();
}

/* Balance display */
async function ctRefreshBalance() {
    try {
        const { data: { user }, error: authError } =
            await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) return;

        ctCurrentUserId = user.id;

        const { data: seller, error } = await larckSupabase
            .from("coin_sellers")
            .select("inventory_balance, status")
            .eq("user_id", user.id)
            .maybeSingle();

        if (error) throw error;

        const balance = seller?.status === "active"
            ? Number(seller.inventory_balance || 0)
            : 0;

        document.getElementById("ctBalance").textContent =
            balance.toLocaleString();

    } catch (error) {
        console.error("Transfer balance load failed:", error);
        document.getElementById("ctBalance").textContent = "—";
        ctShowMessage("Unable to load your balance. Please try again.");
    }
}

/* Tabs */


document.querySelectorAll("[data-ct-tab]").forEach(button => {
    button.addEventListener("click", () => {
        const selectedTab = button.dataset.ctTab;

        // RECHARGE
        if (selectedTab === "recharge") {
            ctCloseOverlay();
            openCoinSellerRecharge();
            return;
        }

        // EXCHANGE
        if (selectedTab === "exchange") {
            ctCloseOverlay();
            openCoinSellerExchange();
            return;
        }

        // TRANSFER
        ctActiveTab = "transfer";

        document.querySelectorAll("[data-ct-tab]").forEach(tab => {
            const active = tab.dataset.ctTab === "transfer";
            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
        });

        document.getElementById("ctTransferContent").hidden = false;
        document.getElementById("ctOtherTabMessage").hidden = true;

        ctShowMessage("");
    });
});

/* Reset recipient verification whenever ID or method changes */
function ctResetRecipient() {
    ctRecipient = null;
    ctRecipientChecked = false;
    ctRecipientInfo.hidden = true;
    ctRecipientInfo.textContent = "";
}

ctUserIdInput?.addEventListener("input", () => {
    ctResetRecipient();
    ctShowMessage("");
});

document.querySelectorAll('input[name="ctSalesMethod"]')
    .forEach(radio => {
        radio.addEventListener("change", () => {
            ctResetRecipient();
            ctShowMessage("");
        });
    });

/* Amount input is entered in units of 1,000 coins */
function ctGetAmount() {
    const entered = Number(ctAmountInput.value);

    if (!ctAmountInput.value.trim() ||
        !Number.isSafeInteger(entered) ||
        entered <= 0) {
        return 0;
    }

    const calculated = entered * 1000;

    return Number.isSafeInteger(calculated) ? calculated : 0;
}

function ctUpdateAmount() {
    const entered = Number(ctAmountInput.value);
    const amount = ctGetAmount();
    const message = document.getElementById("ctAmountMessage");

    document.getElementById("ctCalculatedAmount").textContent =
        amount.toLocaleString();

    if (!ctAmountInput.value.trim()) {
        message.textContent = "Please enter a multiple of 1";
        return;
    }

    if (!Number.isSafeInteger(entered) || entered <= 0 || !amount) {
        message.textContent = "Enter a valid positive whole number.";
        return;
    }

    message.textContent = "You will transfer " +
        amount.toLocaleString() + " coins.";
}

ctAmountInput?.addEventListener("input", ctUpdateAmount);

/* Recipient lookup.
   This uses profiles.id and profiles.larck_id.
   If your real schema uses different column names, adjust these two names. */
document.getElementById("ctCheckUser")
    ?.addEventListener("click", async () => {
        ctResetRecipient();
        ctShowMessage("");

        const larckId = ctUserIdInput.value.trim();

        if (!larckId) {
            ctShowMessage("Enter the recipient's LARCK ID.");
            return;
        }

        const method = document.querySelector(
            'input[name="ctSalesMethod"]:checked'
        )?.value;

        const checkButton = document.getElementById("ctCheckUser");
        checkButton.disabled = true;
        checkButton.textContent = "Checking...";

        try {
            const { data: profile, error } = await larckSupabase
                .from("profiles")
                .select("id, username, larck_id")
                .eq("larck_id", larckId)
                .maybeSingle();

            if (error) throw error;

            if (!profile) {
                ctShowMessage("No user found with that LARCK ID.");
                return;
            }

            if (profile.id === ctCurrentUserId) {
                ctShowMessage("You cannot transfer coins to yourself.");
                return;
            }

            if (method === "coinseller") {
                const { data: seller, error: sellerError } =
                    await larckSupabase
                        .from("coin_sellers")
                        .select("user_id, status")
                        .eq("user_id", profile.id)
                        .eq("status", "active")
                        .maybeSingle();

                if (sellerError) throw sellerError;

                if (!seller) {
                    ctShowMessage("This recipient is not an active Coin Seller.");
                    return;
                }
            }

            ctRecipient = profile;
            ctRecipientChecked = true;
            ctRecipientInfo.textContent =
                (profile.username || "LARCK user") +
                " · ID: " + (profile.larck_id || larckId);
            ctRecipientInfo.hidden = false;

            ctShowMessage("Recipient verified.");

        } catch (error) {
            console.error("Recipient check failed:", error);
            ctShowMessage(
                "Could not verify the recipient. Check your profile table and column names."
            );
        } finally {
            checkButton.disabled = false;
            checkButton.textContent = "Check";
        }
    });

/* Transfer confirmation and execution */
document.getElementById("ctTransferButton")
    ?.addEventListener("click", async () => {
        if (!ctRecipientChecked || !ctRecipient) {
            ctShowMessage("Enter a valid User ID and tap Check first.");
            return;
        }

        const amount = ctGetAmount();

        if (!amount) {
            ctShowMessage("Enter a valid positive whole-number amount.");
            return;
        }

        const method = document.querySelector(
            'input[name="ctSalesMethod"]:checked'
        )?.value;

        if (method === "coinseller") {
            ctShowMessage(
                "Coinseller-to-coinseller transfer needs a dedicated secure Supabase transaction function. No coins were moved."
            );
            return;
        }

        const confirmed = window.confirm(
            "Transfer " + amount.toLocaleString() +
            " coins to " + (ctRecipient.username || ctRecipient.larck_id) +
            " (ID: " + ctRecipient.larck_id + ")?"
        );

        if (!confirmed) return;

        const transferButton = document.getElementById("ctTransferButton");
        transferButton.disabled = true;
        transferButton.textContent = "Processing...";

        try {
            /* Server-side function validates seller inventory and performs
               the wallet credit and ledger entry. */
            const { data, error } = await larckSupabase.rpc(
                "sell_larck_coins",
                {
                    p_customer_id: ctRecipient.id,
                    p_amount: amount,
                    p_idempotency_key: crypto.randomUUID()
                }
            );

            if (error) throw error;

            const result = Array.isArray(data) ? data[0] : data;
            const resultText = typeof result === "string"
                ? result
                : JSON.stringify(result ?? "");

            if (/success|already processed/i.test(resultText)) {
                ctShowMessage("Transfer completed. " + resultText);
                ctAmountInput.value = "";
                ctUpdateAmount();
                ctResetRecipient();
                await ctRefreshBalance();
            } else {
                ctShowMessage("Transfer was not confirmed: " + resultText);
            }

        } catch (error) {
            console.error("Transfer failed:", error);
            ctShowMessage(
                error.message || "Transfer failed. No success was confirmed."
            );
        } finally {
            transferButton.disabled = false;
            transferButton.textContent = "Transfer";
        }
    });

/* Transfer history */
document.getElementById("ctTransferDetails")
    ?.addEventListener("click", ctOpenHistory);

async function ctLoadHistory() {
    const list = document.getElementById("ctHistoryList");
    list.textContent = "Loading transfer history...";

    try {
        const { data: { user }, error: authError } =
            await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) {
            list.textContent = "Please sign in to view transfer history.";
            return;
        }

        const { data, error } = await larckSupabase
            .from("coin_transactions")
            .select("coin_quantity, to_user_id, created_at, transaction_type, description")
            .eq("from_user_id", user.id)
            .eq("transaction_type", "seller_sale")
            .order("created_at", { ascending: false })
            .limit(50);

        if (error) throw error;

        list.replaceChildren();

        if (!data?.length) {
            list.textContent = "No transfer records yet.";
            return;
        }

        data.forEach(record => {
            const card = document.createElement("article");
            card.className = "ct-history-item";

            const heading = document.createElement("strong");
            heading.textContent =
                Number(record.coin_quantity).toLocaleString() + " coins";

            const recipient = document.createElement("p");
            recipient.textContent = "Recipient ID: " +
                (record.to_user_id || "—");

            const date = document.createElement("p");
            date.textContent = record.created_at
                ? new Date(record.created_at).toLocaleString()
                : "Date unavailable";

            const status = document.createElement("p");
            status.textContent = "Status: Recorded in ledger";

            card.append(heading, recipient, date, status);
            list.appendChild(card);
        });

    } catch (error) {
        console.error("Transfer history failed:", error);
        list.textContent =
            "Unable to load history. Check the ledger read permissions.";
    }
}


/* =====================================
   COIN SELLER RECHARGE SCREEN
===================================== */

const crOverlay = document.getElementById("coinRechargeOverlay");
const crPaymentOverlay = document.getElementById("crPaymentOverlay");
const crConfirmOverlay = document.getElementById("crConfirmOverlay");
const crHistoryOverlay = document.getElementById("crHistoryOverlay");

let crSelectedPackage = null;
let crSelectedPayment = "TRC20";
let crCategory = "official";

function crShowMessage(message) {
    document.getElementById("crMessage").textContent = message;
}

function crOpen(element) {
    if (!element) return;
    element.classList.add("active");
    element.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function crClose(element) {
    if (!element) return;
    element.classList.remove("active");
    element.setAttribute("aria-hidden", "true");

    const anotherOpen = [
        crOverlay,
        crPaymentOverlay,
        crConfirmOverlay,
        crHistoryOverlay
    ].some(item => item?.classList.contains("active"));

    if (!anotherOpen) document.body.style.overflow = "";
}

/* Open from the Coin Seller page */
function openCoinSellerRecharge() {
    if (!coinSellerIsAgencyOwner) return;

    crOpen(crOverlay);
    crShowMessage("");
    crLoadBalance();
}

/* Close buttons */
document.getElementById("closeCoinRecharge")
    ?.addEventListener("click", () => crClose(crOverlay));

document.getElementById("crClosePayment")
    ?.addEventListener("click", () => crClose(crPaymentOverlay));

document.getElementById("crCloseConfirm")
    ?.addEventListener("click", () => crClose(crConfirmOverlay));

document.getElementById("crCloseHistory")
    ?.addEventListener("click", () => crClose(crHistoryOverlay));

document.getElementById("crHelp")
    ?.addEventListener("click", () => {
        crShowMessage("Contact LARCK Support if you need recharge assistance.");
    });

/* Load the active seller's inventory balance */
async function crLoadBalance() {
    const balanceElement = document.getElementById("crBalance");

    try {
        const { data: { user }, error: authError } =
            await larckSupabase.auth.getUser();

        if (authError) throw authError;
        if (!user) throw new Error("Please sign in again.");

        const { data: seller, error } = await larckSupabase
            .from("coin_sellers")
            .select("inventory_balance, status")
            .eq("user_id", user.id)
            .maybeSingle();

        if (error) throw error;

        const balance = seller?.status === "active"
            ? Number(seller.inventory_balance || 0)
            : 0;

        balanceElement.textContent = balance.toLocaleString();

    } catch (error) {
        console.error("Recharge balance error:", error);
        balanceElement.textContent = "—";
        crShowMessage("Could not load your balance.");
    }
}

/* Main navigation tabs */
document.querySelectorAll("[data-cr-main-tab]").forEach(button => {
    button.addEventListener("click", () => {
        const tab = button.dataset.crMainTab;

        if (tab === "transfer") {
            crClose(crOverlay);
            openCoinSellerTransfer();
            return;
        }

       if (tab === "exchange") {
            crClose();
            openCoinSellerExchange();
            return;
        }

        document.querySelectorAll("[data-cr-main-tab]").forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-selected", String(active));
        });

        crShowMessage("");
    });
});

/* Official / Coin Seller categories */
document.querySelectorAll("[data-cr-category]").forEach(button => {
    button.addEventListener("click", () => {
        crCategory = button.dataset.crCategory;

        document.querySelectorAll("[data-cr-category]").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        const official = crCategory === "official";

        document.getElementById("crPackageGrid").hidden = !official;
        document.getElementById("crSellerPackages").hidden = official;

        document.getElementById("crPaymentMethod").hidden = !official;
        document.getElementById("crRechargeButton").hidden = !official;
        document.getElementById("crRechargeDetails").hidden = !official;

        crSelectedPackage = null;

        document.querySelectorAll(".cr-package").forEach(item => {
            item.classList.remove("selected");
        });

        crShowMessage(
            official
                ? ""
                : "Coin Seller package options are not enabled yet."
        );
    });
});

/* Select a package */
document.querySelectorAll(".cr-package").forEach(button => {
    button.addEventListener("click", () => {
        crSelectedPackage = {
            id: button.dataset.package,
            coins: Number(button.dataset.coins),
            price: Number(button.dataset.price),
            level: button.dataset.level
        };

        document.querySelectorAll(".cr-package").forEach(item => {
            item.classList.toggle("selected", item === button);
        });

        crShowMessage(
            crSelectedPackage.coins.toLocaleString() +
            " coins selected."
        );
    });
});

/* Payment method selector */
document.getElementById("crPaymentMethod")
    ?.addEventListener("click", () => {
        crOpen(crPaymentOverlay);
    });

document.querySelectorAll("[data-cr-payment]").forEach(button => {
    button.addEventListener("click", () => {
        crSelectedPayment = button.dataset.crPayment;

        document.querySelectorAll("[data-cr-payment]").forEach(item => {
            item.classList.toggle("active", item === button);
            const check = item.querySelector(".cr-option-check");
            if (check) {
                check.textContent = item === button ? "✓" : "";
            }
        });
    });
});

document.getElementById("crConfirmPaymentMethod")
    ?.addEventListener("click", () => {
        const label = crSelectedPayment === "TRC20"
            ? "USDT (TRC20)"
            : crSelectedPayment;

        document.querySelector(".cr-payment-right .cr-binance-icon")
            .textContent = "◆";

        document.querySelector(".cr-payment-right").setAttribute(
            "aria-label", label
        );

        crClose(crPaymentOverlay);
        crShowMessage("Payment method selected: " + label);
    });

/* Review selected package */
document.getElementById("crRechargeButton")
    ?.addEventListener("click", () => {
        if (crCategory !== "official") {
            crShowMessage("Select an available recharge category.");
            return;
        }

        if (!crSelectedPackage) {
            crShowMessage("Please select a recharge package first.");
            return;
        }

        document.getElementById("crConfirmCoins").textContent =
            crSelectedPackage.coins.toLocaleString() + " coins";

        document.getElementById("crConfirmPrice").textContent =
            "$" + crSelectedPackage.price.toLocaleString();

        document.getElementById("crConfirmMethod").textContent =
            crSelectedPayment === "TRC20"
                ? "USDT (TRC20)"
                : crSelectedPayment;

        document.getElementById("crConfirmMessage").textContent = "";

        crOpen(crConfirmOverlay);
    });

/* Payment must not credit coins until the secure payment backend exists. */
document.getElementById("crProceedPayment")
    ?.addEventListener("click", () => {
        document.getElementById("crConfirmMessage").textContent =
            "Payment processing is not connected yet. No payment request " +
            "was submitted and no coins were credited. Connect the secure " +
            "Supabase payment-request flow before accepting payments.";
    });

/* Recharge history */
document.getElementById("crRechargeDetails")
    ?.addEventListener("click", async () => {
        crOpen(crHistoryOverlay);
        await crLoadHistory();
    });

async function crLoadHistory() {
    const list = document.getElementById("crHistoryList");
    list.replaceChildren();

    const loading = document.createElement("p");
    loading.className = "cr-empty";
    loading.textContent = "Loading recharge history...";
    list.appendChild(loading);

    try {
        const { data: { user }, error: authError } =
            await larckSupabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
            list.textContent = "Please sign in to view recharge history.";
            return;
        }

        /*
         * The exact customer ownership column and package metadata in
         * coin_payment_requests must be confirmed before this query can
         * safely be enabled. Do not guess a column name here.
         */
        list.replaceChildren();

        const message = document.createElement("p");
        message.className = "cr-empty";
        message.textContent =
            "Recharge history will appear here after we connect this page " +
            "to your existing coin_payment_requests table and its actual " +
            "customer, package, and payment-status columns.";
        list.appendChild(message);

    } catch (error) {
        console.error("Recharge history error:", error);
        list.textContent = "Could not load recharge history.";
    }
}


/* =========================================
   LARCK COIN SELLER EXCHANGE
========================================= */

const ceOverlay = document.getElementById("coinExchangeOverlay");
const ceReviewOverlay = document.getElementById("ceReviewOverlay");
const ceHistoryOverlay = document.getElementById("ceHistoryOverlay");

let ceSellerLevel = "";
let cePointsAvailable = null;
let ceExchangeQuote = null;

function ceShowOverlay(overlay) {
    if (!overlay) return;
    overlay.classList.add("ce-visible");
    overlay.setAttribute("aria-hidden", "false");
}

function ceHideOverlay(overlay) {
    if (!overlay) return;
    overlay.classList.remove("ce-visible");
    overlay.setAttribute("aria-hidden", "true");
}

function openCoinSellerExchange() {
    ceShowOverlay(ceOverlay);
    ceHideOverlay(ceReviewOverlay);
    ceHideOverlay(ceHistoryOverlay);

    ceLoadExchangeInfo();
}

function ceCloseAll() {
    ceHideOverlay(ceOverlay);
    ceHideOverlay(ceReviewOverlay);
    ceHideOverlay(ceHistoryOverlay);
}

async function ceLoadExchangeInfo() {
    const balanceEl = document.getElementById("cePointsBalance");
    const levelEl = document.getElementById("ceSellerLevel");
    const progressEl = document.getElementById("ceRequirementProgress");
    const requirementMessage = document.getElementById("ceRequirementMessage");
    const reviewButton = document.getElementById("ceReviewExchange");

    balanceEl.textContent = "Unavailable";
    levelEl.textContent = "Not verified";
    progressEl.textContent = "Not verified / 2.2M";
    requirementMessage.textContent =
        "Your points balance, seller level, and withdrawal eligibility must be verified before an exchange can be approved.";

    cePointsAvailable = null;
    ceSellerLevel = "";
    ceExchangeQuote = null;
    reviewButton.disabled = true;

    // Confirm the signed-in user exists.
    const { data: { user }, error } = await larckSupabase.auth.getUser();

    if (error || !user) {
        requirementMessage.textContent =
            "Please sign in to check your exchange eligibility.";
        return;
    }

    /*
      The existing coin_sellers table only confirms seller status
      and inventory_balance. It does not establish the turquoise
      points balance, seller level, or qualifying recharge history.
      Do not treat coin inventory as points.
    */

    requirementMessage.textContent =
        "Exchange is awaiting connection to your verified points balance, seller level, and recharge history.";
    document.getElementById("ceExchangeMessage").textContent =
        "Exchange is not enabled until the secure balance checks are connected.";

    ceUpdateQuote();
}

function ceGetRate(level, dailyPointsAlreadyUsed, pointsToExchange) {
    const normalizedLevel = String(level || "").toLowerCase();

    if (normalizedLevel.includes("senior")) {
        const fullRatePoints = Math.max(0, 50000000 - dailyPointsAlreadyUsed);
        const pointsAtFullRate = Math.min(pointsToExchange, fullRatePoints);
        const pointsAtReducedRate = pointsToExchange - pointsAtFullRate;

        const coinsAtFullRate = Math.floor(pointsAtFullRate / 10000) * 10000;
        const coinsAtReducedRate = Math.floor(pointsAtReducedRate / 10000) * 9900;

        return {
            coins: coinsAtFullRate + coinsAtReducedRate,
            label: "10,000 points = 10,000 coins up to daily limit; then 9,900",
            dailyLimit: 50000000
        };
    }

    if (normalizedLevel.includes("standard")) {
        return {
            coins: Math.floor(pointsToExchange / 10000) * 9800,
            label: "10,000 points = 9,800 coins"
        };
    }

    if (normalizedLevel.includes("junior")) {
        return {
            coins: Math.floor(pointsToExchange / 10000) * 9600,
            label: "10,000 points = 9,600 coins"
        };
    }

    return {
        coins: 0,
        label: "Seller level not verified"
    };
}

function ceUpdateQuote() {
    const input = document.getElementById("cePointsInput");
    const rateEl = document.getElementById("ceRate");
    const outputEl = document.getElementById("ceCoinsOutput");
    const reviewButton = document.getElementById("ceReviewExchange");

    const points = Number(input.value);

    // No verified points or level means no valid quote can be approved.
    if (
        !Number.isSafeInteger(points) ||
        points <= 0 ||
        cePointsAvailable === null ||
        !ceSellerLevel
    ) {
        rateEl.textContent = ceSellerLevel
            ? ceGetRate(ceSellerLevel, 0, 0).label
            : "Awaiting verification";
        outputEl.textContent = "0";
        reviewButton.disabled = true;
        ceExchangeQuote = null;
        return;
    }

    if (points > cePointsAvailable) {
        rateEl.textContent = "Insufficient points";
        outputEl.textContent = "0";
        reviewButton.disabled = true;
        ceExchangeQuote = null;
        return;
    }

    // Daily usage must come from the server before a senior quote
    // can be considered final.
    const quote = ceGetRate(ceSellerLevel, 0, points);

    rateEl.textContent = quote.label;
    outputEl.textContent = quote.coins.toLocaleString("en-US");
    reviewButton.disabled = true;
    ceExchangeQuote = { points, coins: quote.coins, rate: quote.label };
}

document.getElementById("cePointsInput").addEventListener("input", ceUpdateQuote);

document.getElementById("ceBack").addEventListener("click", ceCloseAll);
document.getElementById("ceReviewBack").addEventListener("click", () => {
    ceHideOverlay(ceReviewOverlay);
    ceShowOverlay(ceOverlay);
});
document.getElementById("ceHistoryBack").addEventListener("click", () => {
    ceHideOverlay(ceHistoryOverlay);
    ceShowOverlay(ceOverlay);
});

document.getElementById("ceHelp").addEventListener("click", () => {
    document.getElementById("ceExchangeMessage").textContent =
        "Exchanges require a verified seller level, qualifying recharge history, and sufficient points.";
});

document.querySelectorAll("[data-ce-tab]").forEach(button => {
    button.addEventListener("click", () => {
        const tab = button.dataset.ceTab;

        if (tab === "transfer") {
            ceCloseAll();
            openCoinSellerTransfer();
            return;
        }

        if (tab === "recharge") {
            ceCloseAll();
            openCoinSellerRecharge();
            return;
        }

        document.querySelectorAll("[data-ce-tab]").forEach(item => {
            const active = item.dataset.ceTab === "exchange";
            item.classList.toggle("active", active);
            item.setAttribute("aria-selected", String(active));
        });
    });
});

document.getElementById("ceReviewExchange").addEventListener("click", () => {
    if (!ceExchangeQuote || cePointsAvailable === null || !ceSellerLevel) {
        document.getElementById("ceExchangeMessage").textContent =
            "Your balance and eligibility have not been verified. No exchange can be submitted.";
        return;
    }

    document.getElementById("ceReviewPoints").textContent =
        ceExchangeQuote.points.toLocaleString("en-US");
    document.getElementById("ceReviewCoins").textContent =
        ceExchangeQuote.coins.toLocaleString("en-US");
    document.getElementById("ceReviewRate").textContent = ceExchangeQuote.rate;
    document.getElementById("ceReviewMessage").textContent =
        "Final eligibility and daily limits must be checked securely before processing.";

    ceShowOverlay(ceReviewOverlay);
});

document.getElementById("ceConfirmExchange").addEventListener("click", () => {
    document.getElementById("ceReviewMessage").textContent =
        "Exchange processing is not connected yet. No points were deducted and no coins were credited.";
});

document.getElementById("ceExchangeHistory").addEventListener("click", () => {
    ceShowOverlay(ceHistoryOverlay);
    document.getElementById("ceHistoryList").textContent =
        "Exchange history will appear here once the secure exchange transaction table is connected.";
});
