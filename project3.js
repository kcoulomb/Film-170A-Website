var words = ['two boxes', 'met upon', 'the road', 'said one', 'unto the other', 'if you are', 'a box', 'then you must', 'be my brother', 'our sides are thin', 'we are caving in', 'and we must', 'get no thinner', 'and so two boxes', 'hand in hand', 'went home to', 'have their dinner'];

var line_array_vert = [];

var colors = [[204, 229, 255], [153, 204, 255], [102, 178, 255], [51, 153, 255],[0, 128, 255],[0, 102, 204],[0, 76, 153],[0, 51, 102],[0, 25, 51]];

//line class
var Line = function(x, y){
	//x and y coordinate of line - updated in draw function
	this.x = x;
	this.y = y;
	//sets the height of the words on the line
	this.word_height = Math.floor(Math.random() * height);
	//picks the index in the words array
	this.words = words[Math.floor(Math.random() *words.length)];
	//chooses a color
	this.p_color = Math.floor(Math.random()*colors.length);
	//list of this line's horizontal lines
	this.hor_lines = [];
}

//horizontal line class
var hor_Line = function(x, y){
	this.x = x;
	this.y = y;
}

function setup(){
	createCanvas(1200, 781).parent('canvas_p3');
}

function draw(){
	background(255);

	//display all the lines moving across the screen
	//with the words beside them
	for (index = 0; index < line_array_vert.length; index++){
		a = line_array_vert[index];
		if(a.x == width){
			a.x = 0;
			sort_array_x(line_array_vert);
		}
		line(a.x, 0, a.x, height);
		write_words(a, index + 1);
		a.x++;
	}
}

function mousePressed(e){
	if(mouseButton == RIGHT){
		//make horizontal lines
		match_lines(new hor_Line(e.x, e.y));
	} else if(e.y > 135 && e.y < 585){
		//make vertical lines
		line_array_vert.push(new Line(e.x, height));
		sort_array_x(line_array_vert);
	}
}

//write words and color the space between lines
function write_words(a, index_next){
	//if there is no line proceeding the line being checked
	var box_width = width - a.x;

	//if there is a line proceeding the line being checked
	//the words and colored box are contained in the space between the two lines
	if(index_next < line_array_vert.length){
		box_width = line_array_vert[index_next].x - a.x - 2;
	}

	//draw the boxes
	stroke(5);
	fill(colors[a.p_color][0], colors[a.p_color][1], colors[a.p_color][2]);
	rect(a.x, 0, box_width, height);

	if(a.hor_lines.length > 0){
		line(a.x, a.hor_lines[0].y, a.x + box_width, a.hor_lines[0].y);
	}

	//write the words
	textSize(14);
	stroke(0);
	fill(255);
	text(a.words, a.x + 5, a.word_height, box_width);
}

//sort the lines based on increasing x coordinates
function sort_array_x(array){
	end = array.length - 1;
	for(start = 0; start < array.length - 1; start++){
		start_x = array[start].x;
		end_x = array[end].x;
		if(end_x < start_x){
			swap_start = array[start];
			array[start] = array[end];
			array[end] = swap_start;
		}
	}
}


function match_lines(hor){
	//match the horixontal line to it's vertical line
	//go through line_array_vert backwards until you find
	for(index = line_array_vert.length - 1; index >= 0; index--){
		if(line_array_vert[index].x < hor.x){
			line_array_vert[index].hor_lines.pop();
			line_array_vert[index].hor_lines.push(hor);
		}
	}
}