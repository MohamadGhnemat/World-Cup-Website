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
      console.log(response.data);
    });
}
getStandings();
