const token = "db862fcf7c1842688e32e76e2d7fe8c0";
const baseUrl = "https://api.football-data.org/v4/competitions/2000";
function getStandings() {
  const url = `${baseUrl}/standings`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const standings = response.data.standings;
      document.getElementById("standings").innerHTML = "";
      for (standing of standings) {
        let tableContent = "";
        for (row of standing.table) {
          tableContent += `
            <li class="list-group-item">
                  <div class="row" style="align-items: center;">
                    <div
                      class="flag col-sm-4 d-flex justify-content-center align-items-center gap-1"
                      style="text-align: center"
                    >
                      <img
                        class="rounded-circle border border-2"
                        src="${row.team.crest}"
                        alt="team-img"
                        style="width: 40px; height: 40px;object-fit:cover"
                      />
                      <h6 class="m-0"><b>${row.team.tla}</b></h6>
                    </div>
                    <div class="col-sm-2" style="text-align: center">${row.won}</div>
                    <div class="col-sm-2" style="text-align: center">${row.lost}</div>
                    <div class="col-sm-2" style="text-align: center">${row.draw}</div>
                    <div class="col-sm-2" style="text-align: center">
                      <b>${row.points}</b>
                    </div>
                  </div>
                </li>
      
      
      `;
        }
        const contnet = `
       <div class="col-sm-6 mb-4">
            <div class="card shadow border-none">
              <div
                class="card-header"
                style="
                  background-color: #811538;
                  text-align: center;
                  color: white;
                "
              >
               ${standing.group}
              </div>
              <div
                class="row m-0"
                style="background-color: #5b0d25; color: white"
              >
                <div class="col-sm-4" style="text-align: center">team</div>
                <div class="col-sm-2" style="text-align: center">W</div>
                <div class="col-sm-2" style="text-align: center">L</div>
                <div class="col-sm-2" style="text-align: center">D</div>
                <div class="col-sm-2" style="text-align: center">Pts</div>
              </div>

              <ul class="list-group list-group-flush">
            
               ${tableContent}
         
           
             
              </ul>
            </div>
          </div>
    `;
        document.getElementById("standings").innerHTML += contnet;
      }
    });
}
function getMatches() {
  const url = `${baseUrl}/matches`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const matches = response.data.matches;
      document.getElementById("matches").innerHTML = "";
      let arr = ["GROUP_STAGE"];
      for (match of matches) {
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;
        const utcDate = match.utcDate;

        let hrDiv = "";
        if (arr.includes(match.stage) == false) {
          arr.push(match.stage);
          hrDiv = `<div id="hrDiv" class="hr-color "></div>`;
        }

        const matchTime = new Date(utcDate);
        const dateString = `${matchTime.getUTCFullYear()} / ${
          matchTime.getUTCMonth() + 1
        } / ${matchTime.getUTCDate()}   (${matchTime.getUTCHours()}:${matchTime.getUTCMinutes()})`;
        const content = `
       
        ${hrDiv}
        
       
        <div class="col-sm-12 ">
              <div class="card shadow rounded-pill mt-5" style="overflow: hidden">
                <div class="card-body p-0">
                  <div class="row" style="height: 120px">
                    <div
                      class="col-sm-3 d-flex flex-column justify-content-center align-items-center gap-1"
                      style="
                        background-color: #811538;
                        color: white;
                        border-right: 5px solid #5b0d25;
                      "
                    >
                      <img
                        class="rounded-circle border border-2"
                        src="${homeTeam.crest}"
                        alt="team-img"
                        style="width: 40px; height: 40px ;object-fit:cover;"
                      />
                      <h6 class="m-0"><b>${homeTeam.tla}</b></h6>
                    </div>
                    <div class="col-sm-6" style="text-align: center">
                    <div class="row align-items-center justify-content-center ">
                    <div class="col-sm-4" style="margin:auto 0px"><h3>${
                      match.score.fullTime.home ?? "-"
                    }</h3></div>
                      
                        <div class="col-sm-4 d-flex flex-column justify-content-center align-items-center  " style="">
                         <h6>${match.group ?? match.stage}</h6>
                      <h1>X</h1>
                      <h6>${dateString}</h6>
                        </div>
                           <div class="col-sm-4" style="margin:auto 0px"><h3>${
                             match.score.fullTime.away ?? "-"
                           }</h3></div>
                    </div>
                      
                    </div>
                    <div
                      class="col-sm-3 d-flex flex-column justify-content-center align-items-center gap-1"
                      style="
                        background-color: #811538;
                        color: white;
                        border-left: 5px solid #5b0d25;
                      "
                    >
                      <img
                        class="rounded-circle  border border-2"
                        src="${awayTeam.crest}"
                        alt="team-img"
                        style="width: 40px; height: 40px;object-fit:cover;"
                      />
                      <h6 class="m-0"><b>${awayTeam.tla}</b></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
        
        `;

        document.getElementById("matches").innerHTML += content;
      }
    });
}
getStandings();
getMatches();
let span = document.querySelector(".up");
window.onscroll = function () {
  this.scrollY >= 1000
    ? span.classList.add("show")
    : span.classList.remove("show");
};
span.onclick = function () {
  window.scrollTo({ top: 0 });
};
// cmd go to this path     C:\Program Files\Google\Chrome\Application> chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
