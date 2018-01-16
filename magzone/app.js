var express = require('express'),
     app=express(),
	 server=require('http').createServer(app),
	 io=require('socket.io').listen(server),
	 users={},
	  rasiss={},
	 karobjs={},
	 konXod={},
	 userSxod=[],
	 colMas0=[],
	  colMas1=[],
	   colMas2=[],
	    colMas3=[],
		timerId,
		raddit,
		sbroskart=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
		curenomkar={},
		chethc=0, //1стена,2рынок,3оружей,4пекарня,5колдовство,
	stroIkaM=[[1,1,1,1,1,0,0],[1,0,0,0,0,0,0],[0,0,0,1,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,0,0],  
	          [1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
	          [1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
	          [0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
	          [1,1,1,1,1,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,0,0]],
	  Kal0=[],
	  Kal1=[],
	  Kal2=[], 
	  Kal3=[],            //[1 чье поле,2 защита поля,3 золото,4 еда,5 древесина,6 камень,7 железо,\\8 стена,9 рынок,10 оружей,11 пекарня,12колдовство]
	  zonMas=[[1,8,0,2,1,0,0],[0,3,0,1,3,0,0],[0,2,0,1,0,0,0],[0,3,0,1,3,0,0],[0,1,0,-1,0,0,0],[0,2,0,1,0,0,0],[0,3,0,0,0,2,0],[0,4,0,0,0,3,1],[0,4,0,0,0,3,1],[2,8,0,2,0,1,0],  
	          [0,3,0,1,3,0,0],[0,2,0,2,0,0,0],[0,4,0,1,2,0,0],[0,3,0,1,3,0,0],[0,1,0,-1,0,0,0],[0,2,0,1,0,0,0],[0,3,0,0,0,2,0],[0,3,0,1,0,1,0],[0,3,0,0,0,2,0],[0,4,0,0,0,3,1],
	          [0,3,0,1,3,0,0],[0,2,0,2,0,0,0],[0,4,0,1,2,0,0],[0,5,0,-2,0,0,0],[0,6,0,1,0,0,0],[0,8,0,2,2,2,2],[0,6,0,2,0,0,0],[0,4,0,0,0,1,0],[0,2,0,-1,0,0,0],[0,2,0,-1,0,0,0],
	          [0,4,0,0,0,3,1],[0,3,0,1,3,0,0],[0,2,0,1,0,0,0],[0,3,0,1,3,0,0],[0,1,0,-1,0,0,0],[0,2,0,1,0,0,0],[0,3,0,0,0,2,0],[0,1,0,-1,0,0,0],[0,2,0,-1,0,0,0],[0,5,0,-3,0,0,0],
	          [4,8,0,2,0,0,1],[0,4,0,0,0,3,1],[0,2,0,1,0,0,0],[0,3,0,1,3,0,0],[0,2,0,2,0,0,0],[0,2,0,1,0,0,0],[0,3,0,0,0,2,0],[0,5,0,-3,0,0,0],[0,5,0,-3,0,0,0],[3,8,0,2,0,0,0]],
	  rases = ['Эльфы','Люди','Демоны'],
	 raso=0,
	 golds = [5,5,5,5,0,0,0,0],
	 foods = [5,5,5,5,2,2,2,2],
	 woods = [5,5,5,5,1,0,0,0],
	 stones =[5,5,5,5,0,1,0,0],
	 irons = [5,5,5,5,0,0,0,1],
	 hand_card = [],
	 helpish=0;
	 var   zmaskar=[
		 [0,2,0,3,2,1,2,0,0],
		 [1,1,1,1,1,1,0,0,1],
		 [2,0,3,3,3,2,0,0,0],
		 [3,4,0,1,3,2,0,0,1],
		 [4,1,3,1,2,1,0,0,2],
		 [5,2,0,0,1,1,0,0,0],
		 [6,0,2,1,2,1,0,0,0],
		 [7,1,3,1,2,1,0,0,2],
		 [8,0,0,0,0,0,0,0,0], 
		 [9,0,0,0,0,0,0,0,0],   //пусто
		 
	 ],
	  zmaskbr=[
		 [0,2,0,3,2,1,2,0,0],
		 [1,1,1,1,1,1,0,0,1],
		 [2,0,3,3,3,2,0,0,0],
		 [3,4,0,1,3,2,0,0,1],
		 [4,1,3,1,2,1,0,0,2],
		 [5,2,0,0,1,1,0,0,0],
		 [6,0,2,1,2,1,0,0,0],
		 [7,1,3,1,2,1,0,0,2],
		 [8,0,0,0,0,0,0,0,0], 
		 [9,0,0,0,0,0,0,0,0],   //пусто
		 
	 ],
	 zmaskcr=[
		 [0,2,0,3,2,1,2,0,0],
		 [1,1,1,1,1,1,0,0,1],
		 [2,0,3,3,3,2,0,0,0],
		 [3,4,0,1,3,2,0,0,1],
		 [4,1,3,1,2,1,0,0,2],
		 [5,2,0,0,1,1,0,0,0],
		 [6,0,2,1,2,1,0,0,0],
		 [7,1,3,1,2,1,0,0,2],
		 [8,0,0,0,0,0,0,0,0], 
		 [9,0,0,0,0,0,0,0,0],   //пусто
	 ],  zmaskdr=[
		 [0,2,0,3,2,1,2,0,0],
		 [1,1,1,1,1,1,0,0,1],
		 [2,0,3,3,3,2,0,0,0],
		 [3,4,0,1,3,2,0,0,1],
		 [4,1,3,1,2,1,0,0,2],
		 [5,2,0,0,1,1,0,0,0],
		 [6,0,2,1,2,1,0,0,0],
		 [7,1,3,1,2,1,0,0,2],
		 [8,0,0,0,0,0,0,0,0], 
		 [9,0,0,0,0,0,0,0,0],   //пусто
	 ], arenaelf=[1];

server.listen(3000);

app.use(express.static('public'));
//app.use(express.static('new.html'));

app.get('/',function(req,res){
	res.sendFile(__dirname + '/herozone.html');
});

io.sockets.on('connection', function(socket){
	
	socket.on('new user', function(data, callback){
		if(data in users){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
			users[socket.nickname]=socket;
				var name=socket.nickname;
				socket.rassus=raso;
				rasiss[socket.rassus]=socket;
			users[name].emit('rasse', raso);
			
			
			updateNicknames();
			raso++;
		}
		
	});
		socket.on('new kolo', function(data){
	//	persres();
//	rKar;
if(socket.rassus==0)
{
	for(let i=0;i<5;i++){
	Kal0[i]=data[i]
	}
}else if(socket.rassus==1){
	for(let i=0;i<5;i++){
	Kal1[i]=data[i]
	}
}else if(socket.rassus==2){
	for(let i=0;i<5;i++){
	Kal2[i]=data[i]
	}
}else if(socket.rassus==3){
	for(let i=0;i<5;i++){
	Kal3[i]=data[i]
	}
}
			users[socket.nickname].emit('kolis', data);

			
	});
	
	socket.on('new stroi', function(data, callback){
		if(data!=51){
		if((zonMas[data-1][0]-1)==socket.rassus){
			let massyk=[];
			for(let i=0;i<7;i++){
				if(stroIkaM[data-1][i]>0){
           massyk.push(i);
				}
		   
			}
			console.log(massyk);
			socket.emit('worker',massyk)
                callback(true);
				
				
				
		}else{
		callback(false);
		}
		}
	});
	socket.on('strOIT', function(data){
			if(socket.rassus==0){
				
				if(stroIkaM[data-1][0]+4<=woods[0]){
				
				zonMas[data-1][1]+=1;
				let grimm=[];
				grimm[0]=data;
				grimm[1]=zonMas[data-1][1];
				io.sockets.emit('defpol', grimm);
				// console.log(woods[0]);                      
				//console.log(stroIkaM[data-1][0]);  					   //дерево минусуй 
				woods[0]=woods[0]-(stroIkaM[data-1][0]+4)
				
			//	stroIkaM[data-1][0]=stroIkaM[data-1][0]+1; //lvl zdan
				
				rasiss[0].emit('woodish', woods[0]);             
				socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
				
			//ger=zmaskar[karobjs[socket.nickname]][1]
		}else if(socket.rassus==1){
			
				if(stroIkaM[data-1][0]+4<=stones[1]){
				
				zonMas[data-1][1]+=1;
				let grimm=[];
				grimm[0]=data;
				grimm[1]=zonMas[data-1][1];
				io.sockets.emit('defpol', grimm);
				// console.log(woods[0]);                      
				//console.log(stroIkaM[data-1][0]);  					   //дерево минусуй 
				stones[1]=stones[1]-(stroIkaM[data-1][0]+4)
				
			//	stroIkaM[data-1][0]=stroIkaM[data-1][0]+1; //lvl zdan
				
				rasiss[1].emit('stonish', stones[1]);             
				socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==2){
				if(stroIkaM[data-1][0]+4<=stones[2]){
				
				zonMas[data-1][1]+=1;
				let grimm=[];
				grimm[0]=data;
				grimm[1]=zonMas[data-1][1];
				io.sockets.emit('defpol', grimm);
				// console.log(woods[0]);                      
				//console.log(stroIkaM[data-1][0]);  					   //дерево минусуй 
				stones[2]=stones[2]-(stroIkaM[data-1][0]+4)
				
			//	stroIkaM[data-1][0]=stroIkaM[data-1][0]+1; //lvl zdan
				
				rasiss[2].emit('stonish', stones[2]);             
				socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==3){
				if(stroIkaM[data-1][0]+4<=stones[3]){
				
				zonMas[data-1][1]+=1;
				let grimm=[];
				grimm[0]=data;
				grimm[1]=zonMas[data-1][1];
				io.sockets.emit('defpol', grimm);
				// console.log(woods[0]);                      
				//console.log(stroIkaM[data-1][0]);  					   //дерево минусуй 
				stones[3]=stones[3]-(stroIkaM[data-1][0]+4)
				
			//	stroIkaM[data-1][0]=stroIkaM[data-1][0]+1; //lvl zdan
				
				rasiss[3].emit('stonish', stones[3]);             
				socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}
	});
	socket.on('strOIT2', function(data){
			if(socket.rassus==0){
				
				if(5<=woods[0] && 5<=stones[0] && 5<=irons[0]){
				

				woods[0]=woods[0]-5;
				stones[0]=stones[0]-5;
				irons[0]=irons[0]-5;
				golds[0]=golds[0]+5;
				

				
				rasiss[0].emit('woodish', woods[0]);   
                rasiss[0].emit('stonish', stones[0]); 		
                rasiss[0].emit('ironish', irons[0]); 					
				rasiss[0].emit('goldis', golds[0]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
				
			//ger=zmaskar[karobjs[socket.nickname]][1]
		}else if(socket.rassus==1){
			
					if(5<=woods[1] && 5<=stones[1] && 5<=irons[1]){
				

				woods[1]=woods[1]-5;
				stones[1]=stones[1]-5;
				irons[1]=irons[1]-5;
				golds[1]=golds[1]+5;
				

				
				rasiss[1].emit('woodish', woods[1]);   
                rasiss[1].emit('stonish', stones[1]); 		
                rasiss[1].emit('ironish', irons[1]); 					
				rasiss[1].emit('goldis', golds[1]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==2){
					if(5<=woods[2] && 5<=stones[2] && 5<=irons[2]){
				

				woods[2]=woods[2]-5;
				stones[2]=stones[2]-5;
				irons[2]=irons[2]-5;
				golds[2]=golds[2]+5;
				

				
				rasiss[2].emit('woodish', woods[2]);   
                rasiss[2].emit('stonish', stones[2]); 		
                rasiss[2].emit('ironish', irons[2]); 					
				rasiss[2].emit('goldis', golds[2]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==3){
					if(5<=woods[3] && 5<=stones[3] && 5<=irons[3]){
				

				woods[3]=woods[3]-5;
				stones[3]=stones[3]-5;
				irons[3]=irons[3]-5;
				golds[3]=golds[3]+5;
				

				
				rasiss[3].emit('woodish', woods[3]);   
                rasiss[3].emit('stonish', stones[3]); 		
                rasiss[3].emit('ironish', irons[3]); 					
				rasiss[3].emit('goldis', golds[3]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}
	});
	socket.on('strOIT3', function(data){
			if(socket.rassus==0){
				
				if(5<=woods[0] && 5<=irons[0]){
				

				woods[0]=woods[0]-5;
			//	stones[0]=stones[0]-5;
				irons[0]=irons[0]-5;
			//	golds[0]=golds[0]+5;
			for(let i=0;i<9;i++){
				if(zmaskar[i][1]!=0){
				zmaskar[i][1]+=1;
				}
			}
				
				rasiss[0].emit('woodish', woods[0]);   
             //   rasiss[0].emit('stonish', stones[0]); 		
                rasiss[0].emit('ironish', irons[0]); 					
			//	rasiss[0].emit('goldis', golds[0]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
				
			//ger=zmaskar[karobjs[socket.nickname]][1]
		}else if(socket.rassus==1){
			
					if(5<=woods[1] && 5<=irons[1]){
				

				woods[1]=woods[1]-5;
			//	stones[1]=stones[1]-5;
				irons[1]=irons[1]-5;
			//	golds[1]=golds[1]+5;
				for(let i=0;i<9;i++){
					if(zmaskbr[i][1]!=0){
				zmaskbr[i][1]+=1;
					}
			}

				
				rasiss[1].emit('woodish', woods[1]);   
               // rasiss[1].emit('stonish', stones[1]); 		
                rasiss[1].emit('ironish', irons[1]); 					
				//rasiss[1].emit('goldis', golds[1]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==2){
					if(5<=woods[2] && 5<=irons[2]){
				

				woods[2]=woods[2]-5;
				//stones[2]=stones[2]-5;
				irons[2]=irons[2]-5;
				//golds[2]=golds[2]+5;
				for(let i=0;i<9;i++){
					if(zmaskcr[i][1]!=0){
				zmaskcr[i][1]+=1;
					}
			}

				
				rasiss[2].emit('woodish', woods[2]);   
               // rasiss[2].emit('stonish', stones[2]); 		
                rasiss[2].emit('ironish', irons[2]); 					
				//rasiss[2].emit('goldis', golds[2]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==3){
					if(5<=woods[3] && 5<=irons[3]){
				

				woods[3]=woods[3]-5;
				//stones[3]=stones[3]-5;
				irons[3]=irons[3]-5;
				//golds[3]=golds[3]+5;
				for(let i=0;i<9;i++){
				if(zmaskdr[i][1]!=0){
					zmaskdr[i][1]+=1;
				}
				
			}

				
				rasiss[3].emit('woodish', woods[3]);   
               // rasiss[3].emit('stonish', stones[3]); 		
                rasiss[3].emit('ironish', irons[3]); 					
				//rasiss[3].emit('goldis', golds[3]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}
	});
	socket.on('strOIT4', function(data){
			if(socket.rassus==0){
				
				if(4<=woods[0] && 3<=stones[0] ){
				

				woods[0]=woods[0]-4;
				stones[0]=stones[0]-3;
				foods[4]=foods[4]+1;
				//irons[0]=irons[0]-5;
				//golds[0]=golds[0]+5;
				

				
				rasiss[0].emit('woodish', woods[0]);   
                rasiss[0].emit('stonish', stones[0]); 		
               // rasiss[0].emit('ironish', irons[0]); 					
				//rasiss[0].emit('goldis', golds[0]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
				
			//ger=zmaskar[karobjs[socket.nickname]][1]
		}else if(socket.rassus==1){
			
					if(4<=woods[1] && 3<=stones[1]){
				

				woods[1]=woods[1]-4;
				stones[1]=stones[1]-3;
				foods[5]=foods[5]+1;
				

				
				rasiss[1].emit('woodish', woods[1]);   
                rasiss[1].emit('stonish', stones[1]); 		
                //rasiss[1].emit('ironish', irons[1]); 					
				//rasiss[1].emit('goldis', golds[1]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==2){
					if(4<=woods[2] && 3<=stones[2]){
				

				woods[2]=woods[2]-4;
				stones[2]=stones[2]-3;
				foods[6]=foods[6]+1;
				

				
				rasiss[2].emit('woodish', woods[2]);   
                rasiss[2].emit('stonish', stones[2]); 		
               // rasiss[2].emit('ironish', irons[2]); 					
				//rasiss[2].emit('goldis', golds[2]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}else if(socket.rassus==3){
					if(4<=woods[3] && 3<=stones[3]){
				

				woods[3]=woods[3]-4;
				stones[3]=stones[3]-3;
				foods[7]=foods[7]+1;
				

				
				rasiss[3].emit('woodish', woods[3]);   
                rasiss[3].emit('stonish', stones[3]); 		
               // rasiss[3].emit('ironish', irons[3]); 					
				//rasiss[3].emit('goldis', golds[3]); 
				
				//socket.emit('stenka',stroIkaM[data-1][0]);//покаа бесполезно если лвл не поднимать
				}
		}
	});
	socket.on('new gold', function(data){
		//persres();
		//	socket.emit('goldis', data);
			
	});
	socket.on('new food', function(data){
		//persres();
		
		//	socket.emit('foodish', data);
			
	});
	
	socket.on('sxodil', function(data){
		//console.log(data);
		//console.log(userSxod.pop());
		if(userSxod.pop()==data){
		userSxod.push(data)
		
		}else{
			userSxod.push(data)
			chethc++;
		}
	});
	socket.on('new wood', function(data){
		//persres();
		
		if(chethc>1){
		
		let i=5-chethc;
		
		clearInterval(timerId);
		timerId = setInterval(function() {io.sockets.emit('timmer',i--);
		if(i<0){
			chethc=0;
			userSxod=[];
			clearInterval(timerId);
			
			persres();
			
			//users[socket.nickname].emit('woodish', 25);
		}
		}, 1000);
		
		}	
	});

	function updateNicknames(){
		io.sockets.emit('usernames', Object.keys(users));
	}
	function persres(){
		//if(socket.rassus==0){
			
			if(0 in rasiss){
			woods[0]=woods[0]+woods[4];
			rasiss[0].emit('woodish', woods[0]);
			foods[0]=foods[0]+foods[4];
			rasiss[0].emit('foodish', foods[0]);
			stones[0]=stones[0]+stones[4];
			rasiss[0].emit('stonish', stones[0]);
			irons[0]=irons[0]+irons[4];
			rasiss[0].emit('ironish', irons[0]);
				let grii=[],currenti=[],i=0;
			for(let j=0;j<5;j++){
		
				if(sbroskart[0][j]!=0){
			let randid = 1 + Math.random() * (8 - 1)
              randid = Math.round(randid);
			//currenti.push(sbroskart[0][j]);
			grii[i]=sbroskart[0][j];
			
			
			i++;
			grii[i]=randid
			Kal0[sbroskart[0][j]-1]=randid
			//zmaskar[sbroskart[0][j]-1][0]
			sbroskart[0][j]=0;
			i++;
				}
				
			}
		
			//grii.push(konXod[socket.nickname]);
		//	grii.push(randid);
		console.log(grii);
		
			rasiss[0].emit('razmen',grii);
			}
		//}if(socket.rassus==1){
			if(1 in rasiss){
			woods[1]=woods[1]+woods[5];
			rasiss[1].emit('woodish', woods[1]);
				foods[1]=foods[1]+foods[5];
			rasiss[1].emit('foodish', foods[1]);
			stones[1]=stones[1]+stones[5];
			rasiss[1].emit('stonish', stones[1]);
			irons[1]=irons[1]+irons[5];
			rasiss[1].emit('ironish', irons[1]);
			
			let grii=[],currenti=[],i=0;
			for(let j=0;j<5;j++){
		
				if(sbroskart[1][j]!=0){
			let randid = 1 + Math.random() * (8 - 1)
              randid = Math.round(randid);
			//currenti.push(sbroskart[0][j]);
			grii[i]=sbroskart[1][j];
			
			
			i++;
			grii[i]=randid
			Kal1[sbroskart[1][j]-1]=randid
			//zmaskar[sbroskart[0][j]-1][0]
			sbroskart[1][j]=0;
			i++;
				}
				
			}
			
	//		grii.push(konXod[socket.nickname]);
	//		grii.push(randid);
		rasiss[1].emit('razmen',grii);
			}
	//	}if(socket.rassus==2){
		if(2 in rasiss){
			woods[2]=woods[2]+woods[6];
			rasiss[2].emit('woodish', woods[2]);
						foods[2]=foods[2]+foods[6];
			rasiss[2].emit('foodish', foods[2]);
			stones[2]=stones[2]+stones[6];
			rasiss[2].emit('stonish', stones[2]);
				irons[2]=irons[2]+irons[6];
			rasiss[2].emit('ironish', irons[2]);
			
			let grii=[],currenti=[],i=0;
			for(let j=0;j<5;j++){
		
				if(sbroskart[2][j]!=0){
			let randid = 1 + Math.random() * (8 - 1)
              randid = Math.round(randid);
			//currenti.push(sbroskart[0][j]);
			grii[i]=sbroskart[2][j];
			
			
			i++;
			grii[i]=randid
			Kal2[sbroskart[2][j]-1]=randid
			//zmaskar[sbroskart[0][j]-1][0]
			sbroskart[2][j]=0;
			i++;
				}
				
			}
			
	//		grii.push(konXod[socket.nickname]);
	//		grii.push(randid);
		rasiss[2].emit('razmen',grii);
//			rasiss[2].emit('razmen',grii);
		}
	//	}if(socket.rassus==3){
		if(3 in rasiss){
			woods[3]=woods[3]+woods[7];
			rasiss[3].emit('woodish', woods[3]);
						foods[3]=foods[3]+foods[7];
			rasiss[3].emit('foodish', foods[3]);
			stones[3]=stones[3]+stones[7];
			rasiss[3].emit('stonish', stones[3]);
				irons[3]=irons[3]+irons[7];
			rasiss[3].emit('ironish', irons[3]);
			
	let grii=[],currenti=[],i=0;
			for(let j=0;j<5;j++){
		
				if(sbroskart[3][j]!=0){
			let randid = 1 + Math.random() * (8 - 1)
              randid = Math.round(randid);
			//currenti.push(sbroskart[0][j]);
			grii[i]=sbroskart[3][j];
			
			
			i++;
			grii[i]=randid
			Kal3[sbroskart[3][j]-1]=randid
			//zmaskar[sbroskart[0][j]-1][0]
			sbroskart[3][j]=0;
			i++;
				}
				
			}
			
	//		grii.push(konXod[socket.nickname]);
	//		grii.push(randid);
		rasiss[3].emit('razmen',grii);
//			rasiss[3].emit('razmen',grii);
		}
	//	}
	//if(name in users)
		

	//	}if(socket.rassus==2){
	//	}if(socket.rassus==3){
	//	}
		
	}
		socket.on('cure kart', function(data){
			if(socket.rassus==0){
				if(data>5){
					console.log('error0');
				}
				else{
					//console.log(Kal0[data-1]);
					let krot=Kal0[data-1],dalElf=[];
	/*	for(let i=0;i<50;i++){
			if(zonMas[i][0]==1){
				dalElf.push(zonMas[i][0]);
				users[socket.nickname].emit('znchpole', dalElf);
				dalElf.pop();
			}
		}*/
		curenomkar[socket.nickname]=data-1;
		karobjs[socket.nickname]=zmaskar[krot-1][0];
	//	console.log(Kal0[data-1]);
				//  console.log(karobjs[socket.nickname]);
        
				}
}else if(socket.rassus==1){
	if(data>5){
					console.log('error1');
				}
				else{
					
             let krot=Kal1[data-1];
		curenomkar[socket.nickname]=data-1;	 
	karobjs[socket.nickname]=zmaskbr[krot-1][0];
		//	console.log(zmaskbr[krot-1][1]);
				}
}else if(socket.rassus==2){
	if(data>5){
					console.log('error2');
				}
				else{
					
             let krot=Kal2[data-1];
			 curenomkar[socket.nickname]=data-1;
	karobjs[socket.nickname]=zmaskcr[krot-1][0];
		//	console.log(zmaskcr[krot-1][1]);
				}
}else if(socket.rassus==3){
	if(data>5){
					console.log('error3');
				}
				else{
					
             let krot=Kal3[data-1];
			 curenomkar[socket.nickname]=data-1;
	karobjs[socket.nickname]=zmaskdr[krot-1][0];
		//	console.log(zmaskdr[krot-1][1]);
	}
}
			users[socket.nickname].emit('kartic', data);
			
		});
	socket.on('new zone', function(data, callback){
		let ger;
	//	console.log(zmaskar[karobjs[socket.nickname]][1]);
		//console.log(zonMas[data-1][1]);
		if(data==51){
			if(socket.rassus==0){
			Kal0[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
			}else if(socket.rassus==1){
			Kal1[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
			}else if(socket.rassus==2){
			Kal2[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
			}else if(socket.rassus==3){
			Kal3[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
			}
			socket.emit('nitu',10);
		}else{
		if(socket.rassus==0){
			ger=zmaskar[karobjs[socket.nickname]][1]
		}if(socket.rassus==1){
			ger=zmaskbr[karobjs[socket.nickname]][1]
		}if(socket.rassus==2){
			ger=zmaskcr[karobjs[socket.nickname]][1]
		}if(socket.rassus==3){
			ger=zmaskdr[karobjs[socket.nickname]][1]
		}
		if(zonMas[data-1][1]>ger){
			//console.log(zonMas[data-1][1]);
			console.log('ups');
			callback(false);
			if(ger==0){
				if(socket.rassus==0 && zonMas[data-1][0]==1){
				//console.log(zmaskar[karobjs[socket.nickname]][4]);
				//console.log(golds[0]);
				if(zmaskar[karobjs[socket.nickname]][4]<=golds[0] && zmaskar[karobjs[socket.nickname]][5]<=foods[0] && zmaskar[karobjs[socket.nickname]][6]<=woods[0] && zmaskar[karobjs[socket.nickname]][7]<=stones[0] && zmaskar[karobjs[socket.nickname]][8]<=irons[0]){
				
				golds[0]=golds[0]-zmaskar[karobjs[socket.nickname]][4];
				golds[0]=golds[0]+zonMas[data-1][1];
				
		if(zonMas[data-1][0] == 0){
					foods[4]+=zonMas[data-1][3];
				woods[4]+=zonMas[data-1][4];
				stones[4]+=zonMas[data-1][5];
				irons[4]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[4]+=zonMas[data-1][3];
				woods[4]+=zonMas[data-1][4];
				stones[4]+=zonMas[data-1][5];
				irons[4]+=zonMas[data-1][6];
					
				}
				
				foods[0]=foods[0]-zmaskar[karobjs[socket.nickname]][5];
				woods[0]=woods[0]-zmaskar[karobjs[socket.nickname]][6];
				stones[0]=stones[0]-zmaskar[karobjs[socket.nickname]][7];
				irons[0]=irons[0]-zmaskar[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[0]);
				socket.emit('foodish', foods[0]);
				socket.emit('woodish', woods[0]);
				socket.emit('stonish', stones[0]);
				socket.emit('ironish', irons[0]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskar[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
				//	console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);
				
			zonMas[data-1][0]=1;
			colMas0[0]=1;
			colMas0[1]=data;
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			Kal0[curenomkar[socket.nickname]]=10;
				              pusKart(curenomkar[socket.nickname]);/////////////////////
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal0[curenomkar[socket.nickname]]);
		io.sockets.emit('zaxvat',colMas0);
			}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==1){
			if(zmaskbr[karobjs[socket.nickname]][4]<=golds[1] && zmaskbr[karobjs[socket.nickname]][5]<=foods[1] && zmaskbr[karobjs[socket.nickname]][6]<=woods[1] && zmaskbr[karobjs[socket.nickname]][7]<=stones[1] && zmaskbr[karobjs[socket.nickname]][8]<=irons[1]){
				
				golds[1]=golds[1]-zmaskbr[karobjs[socket.nickname]][4];
				golds[1]=golds[1]+zonMas[data-1][1];
				
			if(zonMas[data-1][0] == 0){
					foods[5]+=zonMas[data-1][3];
				woods[5]+=zonMas[data-1][4];
				stones[5]+=zonMas[data-1][5];
				irons[5]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[5]+=zonMas[data-1][3];
				woods[5]+=zonMas[data-1][4];
				stones[5]+=zonMas[data-1][5];
				irons[5]+=zonMas[data-1][6];
					
				}
				
				foods[1]=foods[1]-zmaskbr[karobjs[socket.nickname]][5];
				woods[1]=woods[1]-zmaskbr[karobjs[socket.nickname]][6];
				stones[1]=stones[1]-zmaskbr[karobjs[socket.nickname]][7];
				irons[1]=irons[1]-zmaskbr[karobjs[socket.nickname]][8];
				
				socket.emit('goldis', golds[1]);
				socket.emit('foodish', foods[1]);
				socket.emit('woodish', woods[1]);
				socket.emit('stonish', stones[1]);
				socket.emit('ironish', irons[1]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskbr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);	
				
			zonMas[data-1][0]=2;
			colMas1[0]=2;
			colMas1[1]=data;
			
				Kal1[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal1[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas1);
			}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==2){
				if(zmaskcr[karobjs[socket.nickname]][4]<=golds[2] && zmaskcr[karobjs[socket.nickname]][5]<=foods[2] && zmaskcr[karobjs[socket.nickname]][6]<=woods[2] && zmaskcr[karobjs[socket.nickname]][7]<=stones[2] && zmaskcr[karobjs[socket.nickname]][8]<=irons[2]){
				
				golds[2]=golds[2]-zmaskcr[karobjs[socket.nickname]][4];
				golds[2]=golds[2]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[6]+=zonMas[data-1][3];
				woods[6]+=zonMas[data-1][4];
				stones[6]+=zonMas[data-1][5];
				irons[6]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[6]+=zonMas[data-1][3];
				woods[6]+=zonMas[data-1][4];
				stones[6]+=zonMas[data-1][5];
				irons[6]+=zonMas[data-1][6];
					
				}
				
				foods[2]=foods[2]-zmaskcr[karobjs[socket.nickname]][5];
				woods[2]=woods[2]-zmaskcr[karobjs[socket.nickname]][6];
				stones[2]=stones[2]-zmaskcr[karobjs[socket.nickname]][7];
				irons[2]=irons[2]-zmaskcr[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[2]);
				socket.emit('foodish', foods[2]);
				socket.emit('woodish', woods[2]);
				socket.emit('stonish', stones[2]);
				socket.emit('ironish', irons[2]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskcr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);	
			zonMas[data-1][0]=3;
			colMas2[0]=3;
			colMas2[1]=data;
			
				Kal2[curenomkar[socket.nickname]]=10;
				pusKart(curenomkar[socket.nickname]);
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal2[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas2);
				}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==3){
					if(zmaskdr[karobjs[socket.nickname]][4]<=golds[3] && zmaskdr[karobjs[socket.nickname]][5]<=foods[3] && zmaskdr[karobjs[socket.nickname]][6]<=woods[3] && zmaskdr[karobjs[socket.nickname]][7]<=stones[3] && zmaskdr[karobjs[socket.nickname]][8]<=irons[3]){
				
				golds[3]=golds[3]-zmaskdr[karobjs[socket.nickname]][4];
				golds[3]=golds[3]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[7]+=zonMas[data-1][3];
				woods[7]+=zonMas[data-1][4];
				stones[7]+=zonMas[data-1][5];
				irons[7]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[7]+=zonMas[data-1][3];
				woods[7]+=zonMas[data-1][4];
				stones[7]+=zonMas[data-1][5];
				irons[7]+=zonMas[data-1][6];
					
				}
				
				foods[3]=foods[3]-zmaskdr[karobjs[socket.nickname]][5];
				woods[3]=woods[3]-zmaskdr[karobjs[socket.nickname]][6];
				stones[3]=stones[3]-zmaskdr[karobjs[socket.nickname]][7];
				irons[3]=irons[3]-zmaskdr[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[3]);
				socket.emit('foodish', foods[3]);
				socket.emit('woodish', woods[3]);
				socket.emit('stonish', stones[3]);
				socket.emit('ironish', irons[3]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskdr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);
				
			zonMas[data-1][0]=4;
			colMas3[0]=4;
			colMas3[1]=data;
			
				Kal3[curenomkar[socket.nickname]]=10;
				pusKart(curenomkar[socket.nickname]);
			
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal3[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas3);
					}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			}
		}
			else{
				callback(true);
			if(socket.rassus==0){
				//console.log(zmaskar[karobjs[socket.nickname]][4]);
				//console.log(golds[0]);
				if(zmaskar[karobjs[socket.nickname]][4]<=golds[0] && zmaskar[karobjs[socket.nickname]][5]<=foods[0] && zmaskar[karobjs[socket.nickname]][6]<=woods[0] && zmaskar[karobjs[socket.nickname]][7]<=stones[0] && zmaskar[karobjs[socket.nickname]][8]<=irons[0]){
				
				golds[0]=golds[0]-zmaskar[karobjs[socket.nickname]][4];
				golds[0]=golds[0]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[4]+=zonMas[data-1][3];
				woods[4]+=zonMas[data-1][4];
				stones[4]+=zonMas[data-1][5];
				irons[4]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[4]+=zonMas[data-1][3];
				woods[4]+=zonMas[data-1][4];
				stones[4]+=zonMas[data-1][5];
				irons[4]+=zonMas[data-1][6];
					
				}
				
				
				foods[0]=foods[0]-zmaskar[karobjs[socket.nickname]][5];
				woods[0]=woods[0]-zmaskar[karobjs[socket.nickname]][6];
				stones[0]=stones[0]-zmaskar[karobjs[socket.nickname]][7];
				irons[0]=irons[0]-zmaskar[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[0]);
				socket.emit('foodish', foods[0]);
				socket.emit('woodish', woods[0]);
				socket.emit('stonish', stones[0]);
				socket.emit('ironish', irons[0]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskar[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
				//	console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);
				
			zonMas[data-1][0]=1;
			colMas0[0]=1;
			colMas0[1]=data;
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			Kal0[curenomkar[socket.nickname]]=10;
				              pusKart(curenomkar[socket.nickname]);/////////////////////
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal0[curenomkar[socket.nickname]]);
		io.sockets.emit('zaxvat',colMas0);
			}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==1){
			if(zmaskbr[karobjs[socket.nickname]][4]<=golds[1] && zmaskbr[karobjs[socket.nickname]][5]<=foods[1] && zmaskbr[karobjs[socket.nickname]][6]<=woods[1] && zmaskbr[karobjs[socket.nickname]][7]<=stones[1] && zmaskbr[karobjs[socket.nickname]][8]<=irons[1]){
				
				golds[1]=golds[1]-zmaskbr[karobjs[socket.nickname]][4];
				golds[1]=golds[1]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[5]+=zonMas[data-1][3];
				woods[5]+=zonMas[data-1][4];
				stones[5]+=zonMas[data-1][5];
				irons[5]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[5]+=zonMas[data-1][3];
				woods[5]+=zonMas[data-1][4];
				stones[5]+=zonMas[data-1][5];
				irons[5]+=zonMas[data-1][6];
					
				}
				
				foods[1]=foods[1]-zmaskbr[karobjs[socket.nickname]][5];
				woods[1]=woods[1]-zmaskbr[karobjs[socket.nickname]][6];
				stones[1]=stones[1]-zmaskbr[karobjs[socket.nickname]][7];
				irons[1]=irons[1]-zmaskbr[karobjs[socket.nickname]][8];
				
				socket.emit('goldis', golds[1]);
				socket.emit('foodish', foods[1]);
				socket.emit('woodish', woods[1]);
				socket.emit('stonish', stones[1]);
				socket.emit('ironish', irons[1]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskbr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);	
				
			zonMas[data-1][0]=2;
			colMas1[0]=2;
			colMas1[1]=data;
			
				Kal1[curenomkar[socket.nickname]]=10;
			pusKart(curenomkar[socket.nickname]);
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal1[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas1);
			}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==2){
				if(zmaskcr[karobjs[socket.nickname]][4]<=golds[2] && zmaskcr[karobjs[socket.nickname]][5]<=foods[2] && zmaskcr[karobjs[socket.nickname]][6]<=woods[2] && zmaskcr[karobjs[socket.nickname]][7]<=stones[2] && zmaskcr[karobjs[socket.nickname]][8]<=irons[2]){
				
				golds[2]=golds[2]-zmaskcr[karobjs[socket.nickname]][4];
				golds[2]=golds[2]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[6]+=zonMas[data-1][3];
				woods[6]+=zonMas[data-1][4];
				stones[6]+=zonMas[data-1][5];
				irons[6]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[6]+=zonMas[data-1][3];
				woods[6]+=zonMas[data-1][4];
				stones[6]+=zonMas[data-1][5];
				irons[6]+=zonMas[data-1][6];
					
				}
				
				foods[2]=foods[2]-zmaskcr[karobjs[socket.nickname]][5];
				woods[2]=woods[2]-zmaskcr[karobjs[socket.nickname]][6];
				stones[2]=stones[2]-zmaskcr[karobjs[socket.nickname]][7];
				irons[2]=irons[2]-zmaskcr[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[2]);
				socket.emit('foodish', foods[2]);
				socket.emit('woodish', woods[2]);
				socket.emit('stonish', stones[2]);
				socket.emit('ironish', irons[2]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskcr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);	
			zonMas[data-1][0]=3;
			colMas2[0]=3;
			colMas2[1]=data;
			
				Kal2[curenomkar[socket.nickname]]=10;
				pusKart(curenomkar[socket.nickname]);
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal2[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas2);
				}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
			if(socket.rassus==3){
					if(zmaskdr[karobjs[socket.nickname]][4]<=golds[3] && zmaskdr[karobjs[socket.nickname]][5]<=foods[3] && zmaskdr[karobjs[socket.nickname]][6]<=woods[3] && zmaskdr[karobjs[socket.nickname]][7]<=stones[3] && zmaskdr[karobjs[socket.nickname]][8]<=irons[3]){
				
				golds[3]=golds[3]-zmaskdr[karobjs[socket.nickname]][4];
				golds[3]=golds[3]+zonMas[data-1][1];
				
				if(zonMas[data-1][0] == 0){
					foods[7]+=zonMas[data-1][3];
				woods[7]+=zonMas[data-1][4];
				stones[7]+=zonMas[data-1][5];
				irons[7]+=zonMas[data-1][6];
				}else if(zonMas[data-1][0] != 0){
					
					foods[zonMas[data-1][0]+3]-=zonMas[data-1][3];
				woods[zonMas[data-1][0]+3]-=zonMas[data-1][4];
				stones[zonMas[data-1][0]+3]-=zonMas[data-1][5];
				irons[zonMas[data-1][0]+3]-=zonMas[data-1][6];
					
					
					foods[7]+=zonMas[data-1][3];
				woods[7]+=zonMas[data-1][4];
				stones[7]+=zonMas[data-1][5];
				irons[7]+=zonMas[data-1][6];
					
				}
				
				foods[3]=foods[3]-zmaskdr[karobjs[socket.nickname]][5];
				woods[3]=woods[3]-zmaskdr[karobjs[socket.nickname]][6];
				stones[3]=stones[3]-zmaskdr[karobjs[socket.nickname]][7];
				irons[3]=irons[3]-zmaskdr[karobjs[socket.nickname]][8];
				socket.emit('goldis', golds[3]);
				socket.emit('foodish', foods[3]);
				socket.emit('woodish', woods[3]);
				socket.emit('stonish', stones[3]);
				socket.emit('ironish', irons[3]);
				let grommi=[];
				zonMas[data-1][1]+=zmaskdr[karobjs[socket.nickname]][2];
				grommi[0]=data;
				grommi[1]=zonMas[data-1][1];
					//console.log(data);
					//console.log(zonMas[data-1][1]);
				io.sockets.emit('defpol', grommi);
				
			zonMas[data-1][0]=4;
			colMas3[0]=4;
			colMas3[1]=data;
			
				Kal3[curenomkar[socket.nickname]]=10;
				pusKart(curenomkar[socket.nickname]);
			
		//	console.log(Kal0[curenomkar[socket.nickname]]);
			socket.emit('nitu',Kal3[curenomkar[socket.nickname]]);
			
		io.sockets.emit('zaxvat',colMas3);
					}
		//        users[socket.nickname].emit('zaxvat',zonMas[data-1][0])                                            //
			}
	}
		}
	});
	function pusKart(raddit){
		
		sbroskart[socket.rassus][raddit]=raddit+1
		//konXod[socket.nickname]=raddit+1;
		console.log(sbroskart[socket.rassus][raddit]);
		console.log(raddit+1);
		
	}
/*	socket.on('nikka', function(data){
		io.sockets.emit('nikka', socket.nickname);
	});*/
	/*socket.on('send message',function(data){
		io.sockets.emit(('new message'),{msg: data, nick: socket.nickname});
	});
	*/
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames();
	});
});