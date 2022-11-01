
const bfs = (vertices, edges) => {
    let graph = Array(vertices).fill(0).map(() => Array());

    edges.forEach((edge) => {
        let parent = edge[0];
        let child = edge[1];
        graph[parent].push(child);
        graph[child].push(parent);
    });

    //BFS traversal
    let queue = [];
    let v=0;
    let discovered = Array(vertices).fill(false);

    discovered[v] = true;
    queue.push(v);

    while(queue.length !== 0){
        v = queue.shift();
        process.stdout.write(v.toString() + ' ');

        for(let u of graph[v]){
            if(discovered[u] === false){
                discovered[u] = true;
                queue.push(u);
            }
        }
    }
}

const excludeExistingConns = (currentUser, recommendingConns, existingConns) => {
    let freshConns = recommendingConns.filter(conn => !existingConns.includes(conn._id));
    // console.log("fresh conns without existing conns --> ");
    // console.log(freshConns);

    sendersArray = [];
    receiversArray = [];

    currentUserConnReqs = currentUser.connectionRequests;
    currentUserConnReqs.forEach((connReq) => {
        sendersArray.push(connReq.senderId);
        receiversArray.push(connReq.receiverId);
    })

    freshConns.filter(conn => !(sendersArray.includes(conn._id) || receiversArray.includes(conn._id)));
    // console.log("fresh conns without existing conn Requests --> ");
    // console.log(freshConns);

    return freshConns;
};

const compareWeight = (a,b) => {
    return b.relevanceWeight - a.relevanceWeight;
};

const basicLogic = (currentUser, connections) => {
    try {
        console.log("enter basic logic");
        let weightedConns = [];

        for (let conn of connections){

            let currWeight = 1;
            console.log("enter conns");

            if (conn.schoolName === currentUser.schoolName){
                currWeight += 2;
            }
            console.log("enter school weights");
            if (conn.interests){
                for (let interest of conn.interests){
                    if (currentUser.interests.includes(interest)){
                        currWeight += 3;
                    }
                }
                console.log("enter interest weights");
            }

            conn.relevanceWeight = currWeight;
            weightedConns.push(conn);
        }

        // let finalConns = excludeExistingConns(currentUser, weightedConns, connections);
        console.log(weightedConns);
        return weightedConns.sort(compareWeight);

    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
    }
}

module.exports = basicLogic;
