var API_KEY = "cd45f090-7b54-4f95-99ea-7e291c3263e2";

/*var SUMMONER_NAME = "";
var SUMMONER_NAME_2 = "";
var SUMMONER_NAME_3 = "";
var SUMMONER_NAME_4 = "";
var SUMMONER_NAME_5 = "";
var champName = "";
var champName_2 = "";
var champName_3 = "";
var champName_4 = "";
var champName_5 = "";*/

var champIDs;
var summonerNames = ["none", "none", "none", "none", "none"];
var champNames = ["none", "none", "none", "none", "none"];
var IDs = [0, 0, 0, 0, 0];
var levels = [0, 0, 0, 0, 0];

function summonerLookUp() {

	
	var SUMMONER_NAME;
	var i;
	for(i = 1; i < 6; i++)
	{
		summonerNames[i-1] = $("#userName" + i).val();
		champNames[i-1] = $("#championPlayed" + i).val();
	}
	getStatics();
	var j;
	for(j = 0; j < 5; j++)
	{
		SUMMONER_NAME = summonerNames[j];
		
	    if (SUMMONER_NAME !== "") {
			$.ajax({
				async: false,
				url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
				type: 'GET',
				dataType: 'json',
				data: {

				},
				success: function (json) {
					var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");
					SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();
					levels[j] = json[SUMMONER_NAME_NOSPACES].summonerLevel;				
					IDs[j] = json[SUMMONER_NAME_NOSPACES].id;
					document.getElementById("sLevel" + (j+1)).innerHTML = levels[j];
					playerStats(j);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("error getting Summoner data!");
				}
			});
    } else {}  	
	}

}

function playerStats(i) {
	
	var champID = 0;
	if(champNames[i] !== "")
		champID = champIDs[champNames[i]].id;
	
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + IDs[i] + "/ranked?season=SEASON2015&api_key=" + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
			//alert("hi");
			var index;
			document.getElementById("totalGames" + (i+1)).innerHTML = 0;
			document.getElementById("winRate" + (i+1)).innerHTML = 0;
			for(index = 0; index < resp["champions"].length; index++)
			{
				champStats = resp["champions"][index];
				if(champStats.id == champID)
				{
					stats = champStats.stats;
					wins = stats.totalSessionsWon;
					losses = stats.totalSessionsLost;
					winrate = wins/(losses+wins);
					gamesPlayed = wins + losses;
					document.getElementById("totalGames" + (i+1)).innerHTML = gamesPlayed;
					document.getElementById("winRate" + (i+1)).innerHTML = winrate;
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
