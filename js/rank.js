$(function () {

    var ScoreRank = ncmb.DataStore("HighScore");
    ScoreRank.order("score", true)
    .include("name")
    .limit(10)
    .fetchAll()
    .then(function(results){

        if (results.length > 0) {
            for(i=0; i<results.length; i++){
                var score = results[i],
                    rank = i + 1,
                    value = parseInt(score.score),
                    displayName = "NO NAME";

                if (score.name !== undefined) {
                    displayName = score.name;
                }
                $('#rankingu').append('<tr><td>' + rank + '</td><td>' + displayName + '</td><td>' + value + '</td></tr>');
                //console.log(rank + ": " + displayName + "(" + value + ")");
            }
        } else {
            console.log("ランキングの取得に失敗しました。");
        }

    })
    .catch(function(err){
      console.log(err);
    });

});