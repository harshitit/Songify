	/*this function takes voice as input like play to start the music and pause/stop to stop the music*/
		function voice(){
			artyom.addCommands([
	{
		description:"say play",
		indexes:["play"],
		action:function(i){
			var song = document.querySelector('audio');
			if (i==0) {
					song.play();
					$('.play').removeClass('fa-play').addClass('fa-pause');
			}
		}
	},
	{
		indexes:["pause","stop"],
		action:function(){
			var song = document.querySelector('audio');
			song.pause();
			$('.play').removeClass('fa-pause').addClass('fa-play');
		}
	}
	])};

	/*this function used to set the language and other feature of voice*/
	function startArtyom(){
         artyom.initialize({
            lang:"en-GB",// A lot of languages are supported.
            continuous:true,
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
            });
     }
		$(".music-player").hide();
		$(".duration").hide();
		/*when we click on Roll In button then our music app display on the screen */
		$('button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
            $('.user-name').text(message);
            $('.welcome-screen').hide();
            $('.music-player').toggle();
            startArtyom();

        } else {
            alert("Enter your name more than 3 words");
        }
    });

		/*object of songs with there details*/
		var songs = [
		{
	        'name': 'Meri Bheegi Bheegi Si',
	        'artist': 'Kishore Kumar',
	        'album': 'Kishore Kumar In Mood',
	        'duration': '4:04',
	        'fileName': 'songs/song.mp3',
	        'image': 'Images/image.jpg'
	    },
	    {
	        'name': 'Ikk Kudi',
	        'artist': 'Shahid Mallya',
	        'album': 'Udta Punjab',
	        'duration': '4:03',
	        'fileName': 'songs/song1.mp3',
	        'image': 'Images/image1.jpg'
	    },
	    {
	        'name': 'Te Amo (Reprise)',
	        'artist': 'Mohit Chauhan',
	        'album': 'Dum Maaro Dum',
	        'duration': '4:56',
	        'fileName': 'songs/song2.mp3',
	        'image': 'Images/image2.jpg'
	    },
	    {
	        'name': 'Photograph',
	        'artist': 'Ed Sheeran',
	        'album': 'x',
	        'duration': '4:18',
	        'fileName': 'songs/song3.mp3',
	        'image': 'Images/image3.jpg'
	    }
	    ]

	    /*when file is load then this function automatically take key from the object called songs and display a list of songs*/
	    window.onload = function (){
		changeCurrentSongDetails(songs[0]);
	 	for(var i = 0; i < songs.length; i++) {
	        var obj = songs[i];
	        var name = '#song' + (i+1);
	        var song = $(name);
	        song.find('.song-name').text(obj.name);
	        song.find('.song-artist').text(obj.artist);
	        song.find('.song-album').text(obj.album);
	        song.find('.song-duration').text(obj.duration);
	        addSongNameClickEvent(obj, i + 1);
    	}
		}

		/*function search the song from the list*/
		$(document).ready(function(){
			$("#search-box").keyup(function(){
				searchSong($(this).val());
			});
			function searchSong(value){
				$("#songs tbody tr").each(function(){
					var found="false";
					$(this).each(function(){
						if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) 
						{
							found="true";
						}
					});
					if (found == "true") 
					{
						$(this).show();
					}
					else
					{
						$(this).hide();
					}
				});
			}
		});

		/*function to convert time from seconds to minutes*/
		function fancyTimeFormat(time)
		{   
    		var hrs = ~~(time / 3600);
    		var mins = ~~((time % 3600) / 60);
    		var secs = time % 60;
			var ret = "";
    		if (hrs > 0) {
        	ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    		}
    		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    		ret += "" + secs;
    		return ret;
		}

		/*function used to toggle the current playing song.*/
		function toggleSong() {
		var song = document.querySelector('audio'); 
		if(song.paused) {
			song.play();
			$('.play').removeClass('fa-play').addClass('fa-pause');	
		} else {
			song.pause();
			$('.play').removeClass('fa-pause').addClass('fa-play');
		}
		}

		/*toggle the song on the press space bar*/
		$('body').on('keypress',function(event){
			if (event.keyCode==32) {
				toggleSong();
		}
		});

		/*toggle the play/pause icon*/
		$('.play').on('click',function(){
				toggleSong();
		});

		/*gives current time of the song*/
		setInterval(function(){
			var song=$('audio');
			$('.current-time').text(fancyTimeFormat(Math.floor(song[0].currentTime)));
		},100);

		/*gives total duration of the song*/
		setInterval(function(){
			var song=$('audio');
			$('.duration').text(fancyTimeFormat(Math.floor(song[0].duration)));
		},100);

		/*select and play/pause the song*/
		function addSongNameClickEvent(songObj, id) {
			var songName = songObj.name;
			var fileName = songObj.fileName;
			var id = '#song' + id;
			$(id).on('click', function(event){
				var song = document.querySelector('audio');
				var currentSong = song.src;
				$(".duration").show();
				if (currentSong.search(fileName) != -1) {
					toggleSong();
				} else {
					changeCurrentSongDetails(songObj);
					song.src = fileName;
					song.play();
					voice();
					$('.play').removeClass('fa-play').addClass('fa-pause');	
				}
			});
		}

		/*give current playing song details*/
	function changeCurrentSongDetails(songObj) {
		var songPath = songObj.image;
	    $('.current-song-image').attr('src', songPath)
	    $('.current-song-name').text(songObj.name)
	    $('.current-song-album').text(songObj.album)
	}