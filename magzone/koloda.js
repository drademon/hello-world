class Coloda{
	
		constructor(n)
		{
	

	let image;
           const arri = [];
		for(let i=1; i<n; i++){
			image = new Image;

			image.src = 'image/' + i + '.jpg' ;

			arri.push( image ) ;
};
            this.arri=arri;
			this.matr=null;
			this.ruk=null;
			this.karts_rand();

		
	}
	vivod()
{

	

	for(let i=0,b;b=this.arri[i];i++) 
		document.body.appendChild(b);
}
createPiece(type)
    {
        if (type === 'Q') {
            return  1;
        } else if (type === 'W') {
            return 2
		}else if (type === 'E') {
            return 3;
		}else if (type === 'R') {
            return 4;
		}else if (type === 'T') {
            return 5;
		}else if (type === 'Y') {
            return 6;
		}else if (type === 'U') {
            return 7;
		}
		
	}
karts_rand()
{    for(let i = 1;i<6;++i){
	const pieces = 'QWERTYU';
        this.matr = this.createPiece(pieces[pieces.length * Math.random() | 0]);
		let imag = document.getElementById('kar_'+i);
	    imag.src='images/' + this.matr +'.jpg';
		
		
}

		
	
}

}


//for(var i=0,b;b=array[i];i++) 
//			document.body.appendChild(b);

