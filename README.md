vod log
=======
worker - a worker that pulls from twitch and riot apis to at vods to database
site - frontend react site that hosts vod info

set-up
------
Need:
* `env.json`
* `worker/cert/firebase.json`
* `worker/cert/riotgamesapi.json`

site
----
```
$npm start
```
Then go to localhost:8080.

worker
------
```
$node worker/worker.js
```

helper
------
```
$node worker/helper.js [command]
```
**Commands:**
* copyDB
* clearMatches
* addChannel -n [channel] [-f]
* addAccount -c [channel] -n [account] -r [region] [-f]
* directory [-f]
