function loadModule(module) {

  var s = document.createElement("script");

  s.src = module + ".js";

  document.body.appendChild(s);

  if(arguments[1] === 'new'){

	s.onload = function () {
		var temp = eval(module);
		temp.init();
		temp.newNetGame();
	}

  } else if(arguments[1] === 'join'){

  	s.onload = function () {
		var temp = eval(module);
		temp.init();
		temp.joinNetGame();
	}

  } else {
  	s.onload = function () {
    	eval(module).init();
  	}
  }
}

loadModule("localGame");


$('.newNetGame').bind('click', function(){
	loadModule('networkGame', 'new');
});

$('.joinNetGame').bind('click', function(){
	loadModule('networkGame', 'join');
});

//$('.newNetGame, .joinNetGame').unbind('click', loadNetGame);
