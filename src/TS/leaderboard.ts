import getLeaderboardDetails from "./functions/getLeaderboardDetails.ts";
import getUserDetails from "./functions/getUserData.ts";

const podiumContainer = document.getElementById('podium-container') as HTMLDivElement;
const rankContainer = document.getElementById('rank-container') as HTMLDivElement;
const stickyUser = document.getElementById('sticky-user') as HTMLDivElement

const leaderboardData = await getLeaderboardDetails()

let currentUser: any;
const localData: string | null = localStorage.getItem('userData')
if (localData != null) {
    currentUser = JSON.parse(localData)
} else {
    currentUser = await getUserDetails();
    localStorage.setItem("userData", JSON.stringify(leaderboardData))
}


// console.log(leaderboardData, currentUser)

leaderboardData.forEach((user: any) => {
    // console.log(user.username, currentUser.username)

    if (user.username == currentUser.username) {
        rankContainer.innerHTML += `
        <div class="list-item highlight">
            <div class="item-left">
                <span class="rank-bubble">${user.rank}</span>
                <span class="item-name">${user.username}</span>
            </div>
            <span class="item-score">${user.total_points} PTS</span>
        </div>
    `
        stickyUser.innerHTML = `
            <span class="name">${user.username}</span>
                <div class="rank-center">
                    <span class="rank">${user.rank}</span>
                </div>
            <span class="score">${user.total_points} PTS</span>
        `

    } else {
        rankContainer.innerHTML += `
        <div class="list-item">
            <div class="item-left">
                <span class="rank-bubble">${user.rank}</span>
                <span class="item-name">${user.username}</span>
            </div>
            <span class="item-score">${user.total_points} PTS</span>
        </div>
    `
    }
})

podiumContainer.innerHTML = `
                        <div class="podium-item rank-2">
                            <div class="avatar-wrapper">
                                <div class="crown">👑</div>
                                <img class="avatar" src="${leaderboardData[1].avatar_url}">
                                <div class="medal">2</div>
                            </div>
                            <div class="podium-block">
                                <div class="podium-name">${leaderboardData[1].username}</div>
                                <div class="podium-score">${leaderboardData[1].total_points} PTS</div>
                            </div>
                        </div>

                        <div class="podium-item rank-1">
                            <div class="avatar-wrapper">
                                <div class="crown">👑</div>
                                <img class="avatar" src="${leaderboardData[0].avatar_url}">
                                <div class="medal" style="color: var(--gold)">1</div>
                            </div>
                            <div class="podium-block">
                                <div class="podium-name">${leaderboardData[0].username}</div>
                                <div class="podium-score">${leaderboardData[0].total_points} PTS</div>
                            </div>
                        </div>

                        <div class="podium-item rank-3">
                            <div class="avatar-wrapper">
                                <div class="crown">👑</div>
                                <img class="avatar" src="${leaderboardData[2].avatar_url}">
                                <div class="medal">3</div>
                            </div>
                            <div class="podium-block">
                                <div class="podium-name">${leaderboardData[2].username}</div>
                                <div class="podium-score">${leaderboardData[2].total_points} PTS</div>
                            </div>
                        </div>
`
