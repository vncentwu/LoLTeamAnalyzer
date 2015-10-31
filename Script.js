var API_KEY = "cd45f090-7b54-4f95-99ea-7e291c3263e2";
var SUMMONER_NAME = "";
var champIDs;

function summonerLookUp() {
    
    SUMMONER_NAME = $("#userName").val();
	champName = $("#championPlayed").val();
	getStatics();
	//alert("hello");
    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

                SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

                summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
                summonerID = json[SUMMONER_NAME_NOSPACES].id;
                iconID = json[SUMMONER_NAME_NOSPACES].profileIconId;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;
                //document.getElementById("iID").innerHTML = iconID;

                //letsGetMasteries();
				//alert(champName);
				//alert(champID)
				playerStats(champIDs[champName]);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    } else {}  
}

function playerStats(champID) {
	
	//alert("hello");
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + summonerID + "/ranked?season=SEASON2015&api_key=" + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
			//champStats = resp["champions"][0].id;
			var index;
			for(index = 0; index < resp["champions"].length; index++)
			{
				champStats = resp["champions"][index];
				if(champStats.id == champID)
				{
					//alert("success");
					//document.getElementById("cID0").innerHTML = champStats.id;
					stats = champStats.stats;
					wins = stats.totalSessionsWon;
					losses = stats.totalSessionsLost;
					winrate = wins/(losses+wins);
					gamesPlayed = wins + losses;
					
					//document.getElementById("totalWins").innerHTML = wins;
					//document.getElementById("totalLosses").innerHTML = losses;
					document.getElementById("totalGames").innerHTML = gamesPlayed;
					document.getElementById("winRate").innerHTML = winrate;
				}
					
			} 
            

        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });	
}

function getStatics() {
	
	//alert("hello");
    $.ajax({
		async: false,
        url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + API_KEY, 
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
			champIDs = resp["data"];
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });	
}

function letsGetMasteries() {
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + "/masteries?api_key=" + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
            numberOfPages = resp[summonerID].pages.length;
            numberOfPage1 = resp[summonerID].pages[0].name;
            mastery0id = resp[summonerID].pages[0].masteries[0].id;
            
            document.getElementById("masteryPageCount").innerHTML = numberOfPages;
            document.getElementById("masteryPages1st").innerHTML = numberOfPage1;
            document.getElementById("m0id").innerHTML = mastery0id;
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}
