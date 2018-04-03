var Discord = require('discord.js');
var https = require('https');
var TOKEN = process.env.BOT_TOKEN;
var url = "https://radityop.000webhostapp.com/index.php?nama=";
// var logger = require('winston');
// var auth = require('./auth.json');

//Mengkonfigurasi setting logger

// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console, {
// 	colorize : true
// });
// logger.level = 'debug';

//Inisialiasi Bot Discord
var bot = new Discord.Client();

// var req = http.request(options,function(res){
// 	var msg = '';

// 	res.setEncoding('utf8');
// 	res.on('data',)
// });
bot.on('ready',function(){
	console.log("Ready");
// 	logger.info('Connected');
// 	logger.info('Logged in as: ');
// 	logger.info(bot.username + ' - (' + bot.id + ')');	
});
bot.on('message',function(message){
	//Bot harus tau kapan mengeksekusi command
	//Akan mendengarkan message yang dimulai dengan tanda '!'
	if(message.author.equals(bot.user)) return;

	var baru = new Date();
	var tanggal = baru.getDate();
	var bulan = baru.getMonth();
	if(message.content == "Bodo!"){
		message.channel.send("Dewe!");
		message.channel.send("Tanggal : " + tanggal);
		message.channel.send("Bulan : " + bulan);
		message.channel.send("<?php echo $title;?>");
	}
	if(message.content.substring(0,1) == "!"){
		if(message.content.substring(1,6)=="siswa"){
			if(message.content.substring(7)=="muksin"){
				message.channel.send("goblok");
			}
		}
		if(message.content.substring(1,6)=="dosen"){
			var jam = baru.getHours()+7;
			if(jam>=22 && jam<=24){
				message.channel.send("Untuk fitur pengecekan dosen tidak dapat digunakan pada jam 22:00-24:00");
				return;
			}
			var namaDosen = message.content.substring(7);
			message.channel.send(message.content.substring(7));
			var urlDosen = url + namaDosen;
				https.get(urlDosen,res => {
				console.log(res.headers['content-type']);
				if(res.headers['content-type']=='application/json; charset=UTF-8'){
					res.setEncoding("utf8");
					let body = "";
					res.on("data", data=>{
						body += data;
					});	
					res.on("end", ()=>{
						body = JSON.parse(body);
						if(body['hasil']=="sukses"){
							message.channel.send("Nama Dosen: " + body['nama'] + "  Status: " + body['status']);}
						else{
							message.channel.send(body['status']);
							}
						}
					);
				} else{
					message.channel.send("Mohon mengulang kembali")
;				}
			});
		}
	}
	// if(message.substring(0,1) == '!'){
	// 	var args = message.substring(1).split(' ');
	// 	var cmd = args[0];

	// 	args = args.splice(1);
	// 	switch(cmd){
	// 		case 'Bodo' :
	// 		bot.sendMessage({
	// 			to : channelID,
	// 			message: 'Dewe!'
	// 		});
	// 		break;
	// 	}
	// }
});
bot.login(TOKEN);