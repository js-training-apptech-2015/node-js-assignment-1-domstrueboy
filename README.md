https://node-js-assignment-1.herokuapp.com
the main difference with "splitmode" in "server.js" file
# Node.js assignment 1

In on of the previous assignmests you had to implement a tic-tac-toe game [client](https://github.com/js-training-apptech-2015/splitmode).
It had to work with one of the provided endpoints:
```
https://rocky-sierra-3635.herokuapp.com/games
https://polar-waters-8630.herokuapp.com/games
https://aqueous-ocean-2864.herokuapp.com/games
```
The servers are stateless and everytime provide the same answer for the same request.

In this task, implement a proxy backend that  
- provides a single endpoint 
- passes all the REST requests to one of the original endpoints
- balances the load by choosing a new endpoint everytime (e.g. using [RR](https://en.wikipedia.org/wiki/Round-robin_scheduling))
- wraps original responses into an object and provides information on which of the original endpoints was used
- in case the current original endpoint fails to respond, the proxy should automatically use another one and provide the client with valid data

### example
request:
```
http://localhost:8888/games
```
proxied to
```
https://rocky-sierra-3635.herokuapp.com/games
```
original response:
```
[
    {
        "_id":"561f3f796ffb732b5c9835f2",
        "token":"46197528478235466981444888441595",
        "field1":9,
        "field2":4,
        "state":"second-player-turn"
    },
    {
        "_id":"561f43306ffb732b5c9835f4",
        "token":"979483055887313553541444889392350",
        "field1":131074,
        "field2":128,
        "state":"second-player-turn"
    },
    ...
]
```
proxied response:
```
{
    "server": "rocky-sierra-3635",
    "data": [
        {
            "_id":"561f3f796ffb732b5c9835f2",
            "token":"46197528478235466981444888441595",
            "field1":9,
            "field2":4,
            "state":"second-player-turn"
        },
        {
            "_id":"561f43306ffb732b5c9835f4",
            "token":"979483055887313553541444889392350",
            "field1":131074,
            "field2":128,
            "state":"second-player-turn"
        },
        ...
    ]
}
```

Feel free to modify your original client.
