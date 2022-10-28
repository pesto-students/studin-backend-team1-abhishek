// Manage core logic by this variable
var Settlement = [];
// ------------------------
// Function : default_key
// This is an alternate function which 
// is find default key of map.
// We assume that passing parameter is a 
// Object of javascript.
Settlement.default_key = function (obj) {
	var result = 0;
	Object.entries(obj).map(item => {
		// It's not 100 % accurate when 
		// given key = 1 or key = "1" 
		// both same in javascript.
		// Or key is an string in javascript object.
		const num = Number(item[0]);
	    // Check key is integer and key 
    	// is not less than result
	  	if(Number.isInteger(num) && 
    		num >= result)
    	{
    		// Get new key
    		result = num + 1;
    	}
	})
	// Important set empty 
	// when access [][] 
	// array of array.
	obj[result] = {};
	return result;
}
Settlement.array_push = function(target,values)
{
	// Assume target is an map
	// Assume values is collection of new iteam
    // Add new value into collection
    for (const value of values) { 

    	target[Settlement.default_key(target)] = value   	 
    }      
    return target.size;
}
//---------------------------------
// kalkicode.com 
// These methods have not been changed by our tools.
// session_start
// error_reporting
// mysqli_connect
// mysqli_connect_error
// mysqli_query
// mysqli_fetch_array
// json_encode
// mysqli_close
//----------------------------

session_start();
//to avoid error message from displaying on screen
error_reporting(32767 ^ 8);

if (typeof _SESSION['name'] !== 'undefined') {
    user1 = _SESSION['name'];
}
if (typeof _SESSION['id'] !== 'undefined') {
    user1Id = _SESSION['id'];
}
//$data=array();
servername = "localhost";
username = "root";
password = "";
dbname = "socialnetwork";
//create connection
conn = mysqli_connect(servername, username, password, dbname);
// check connection
if (!conn) {
    die("Connection failed: "+mysqli_connect_error());
} else {
    //took user ids' from database
    sql = "SELECT id,name from users";
    result = mysqli_query(conn, sql);
    rows = {};
    //converted mysql query to array
    while (row = mysqli_fetch_array(result)) {
        Settlement.array_push(rows,[row]);
    }
    //converted PHP array to JS array
    json = json_encode(rows);
    //user2
    if (typeof _POST["submit"] !== 'undefined') {
        user2 = _POST["username2"];
        user2Id = mysqli_query(conn, "SELECT id FROM users WHERE name='{user2}'").fetch_object().id;
        if (user2Id) {
        } else {
            console.log("<script type='text/JavaScript'>alert('User you want to connect is not found')</script>");
        }
    }
    mysqli_close(conn);
}


        console.log(user1);
        console.log(user1Id);
        console.log(user2);
        console.log(user2Id);
        function setup(){
        createCanvas(windowWidth,2000);
        background('white');
        createGraph();
    }
    var mapVertices=new Map();
    function createGraph(){
        //took data from PHP  
        var vertices = console.log(json);

        var length = vertices.length;   
    //classes
        //Graph from DB    
        class Graph { 
            constructor(nodes) { 
                this.nodes = nodes; 
                this.adjacencyList = new Map(); 
            } 
          
            addVertices(vertex,x,y) {
            console.log(vertex);
            this.adjacencyList.set(vertex.id, new Set());
            stroke('#475770');
             fill('#475770');
            ellipse(x, y, 50, 50);
            fill('white');
            textAlign(CENTER);
            text(vertex.name, x,y);

                } 
            addEdges(vertex1, vertex2) { 
            var user1=vertex1.id;
            var user2=vertex2.id; 
            this.adjacencyList.get(user1).add(user2);
            this.adjacencyList.get(user2).add(user1);  
                } 

            printGraph() { 
            var keys = this.adjacencyList.keys();    
            for (var i of keys)  { 
                var adjacentNodes = this.adjacencyList.get(i); 
                var concate = ""; 
                for (var nodes of adjacentNodes) {
                   var userId=nodes;
                    concate += userId + " ";
                 }
                 console.log(i + " -> " + concate);
            }
            }
            getSuccessors(vertex){
                return this.adjacencyList.get(vertex);
            }
          
        }

    //Queue to be used in BFS
    class Queue{
         constructor(){
            this.queue=[]
        }
        enqueue(value) {
             this.queue.push(value);
            }
        dequeue(){
            if(!this.isEmpty()){
                return this.queue.shift();//remove from start of array
            }  
        }
        isEmpty(){
            if(this.queue.length==0){
                return 0;
            }
        }
        print(){
            for (var i=0;i<this.queue.length;i++ )
             console.log(i);
            }
        }
        
        //functions
        function randomNumber(min,max){
            return parseInt(Math.random()*(max-min)+min);
        }

        function createRandomEdge(g,length){
            var g = new Graph(length); 
            var neighbor;
           // var mapVertices=new Map();

            //add vertices
            //debugger;
            for (var i = 0; i < length; i++) { 
                //debugger;
                var x=randomNumber(50,windowWidth-50);
                var y=randomNumber(50,2000-50);
                g.addVertices(vertices[i],x,y); 
                mapVertices.set(vertices[i].id,[x,y]);
                console.log(mapVertices);
            }
            //add edges
            
            for (var i = 0; i <length; i++) { 
                //how many edges for each vertex
                var randomEdges=randomNumber(0,length-1)/8;
                //var randomEdges=randomNumber(0,length-1)
                console.log(randomEdges);
                //which node to connect
                var randomIndex=0;
                for(var j=0; j<=randomEdges;j++){
                    //var randomIndex=randomNumber(0,length-1);
                    var randomIndex=abs(randomNumber(0,length-1)-randomIndex);
                    neighbor=vertices[randomIndex]
                    if(randomIndex!=i){
                        var node1=vertices[i];
                        var node2=neighbor;
                       g.addEdges(node1,node2);
                      var x1=mapVertices.get(node1.id)[0];
                       var y1=mapVertices.get(node1.id)[1];
                       var x2=mapVertices.get(node2.id)[0];
                       var y2=mapVertices.get(node2.id)[1];
                        
                       line(x1,y1,x2,y2);
                    }    
                    }  
                }
                g.printGraph();
            
               return g;
               

            } 

        //BFS
        function BFS(g,s,e){
            var key=true;
            var mapPath=new Map();
            var end = e.toString();
            var start = s.toString();
            console.log("START NODE is "+ s);
            console.log("END NODE is "+ e);
           var queue = new Queue();
           var explored = [];
           //var startNode=s.toString();
           explored.push(start);
           queue.enqueue(start);
           while(!queue.isEmpty()){
               var parentNode = queue.dequeue();
               if(parentNode==end){
                   break;
               }
               var allSuccessors = g.adjacencyList;
               var temp=parentNode.toString();
               var successors=allSuccessors.get(temp);
                for (var successor of successors){
                  if(explored.includes(successor)==false){
                     mapPath.set(successor,parentNode);
                     console.log(mapPath);
                    explored.push(successor);
                    queue.enqueue(successor);
                    }
               }
            }

            var path=[];
            path.push(end);
           while(end!=start){
            var next=mapPath.get(end);
            path.push(next);
            end=next;
           }
            path=path.reverse();
            return path;
        }
        function showPath(g,path){
            console.log(mapVertices);
            var pathLength=path.length;
            console.log(pathLength);
            var pathValue;
            for(var i=0; i<pathLength; i++){
                stroke('red');
                noFill();
                ellipse(mapVertices.get(path[i])[0], mapVertices.get(path[i])[1], 50, 50);
            }
            for(var i=1; i<pathLength; i++){
                var x1=mapVertices.get(path[i-1])[0];
                var y1=mapVertices.get(path[i-1])[1];
                var x2=mapVertices.get(path[i])[0];
                var y2=mapVertices.get(path[i])[1];
                console.log(x1);
                console.log(y1);
                console.log(x2);
                console.log(y2);
                line(x1,y1,x2,y2);
            }
            var path = path.toString();
           console.log("PATH  "+ "("+ path + ")");
        }
            //for console output
            //debugger;
            var g = new Graph(length);
            var e=createRandomEdge(g,length);
            var randomNumber1 = randomNumber(1,length-1);
            var randomNumber2 = randomNumber(1,length-1);
            //debugger;
            var path = BFS(e,user1Id,user2Id);
            setTimeout(function(){
                var str="The path between ";
                var message=str.concat(user1," and ",user2," is ");
                console.log(message);
                alert(message);
                showPath(e,path)}
                ,1000);
            //showPath(e,path);
    }
     //session destroy
