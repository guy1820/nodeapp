const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const DownloadYTFile = require('yt-dl-playlist')
const port = 3000

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname))

app.post('/sendmp3', function(req, res) {
  //res.send('You sent the name "' + req.body.mp3 + '".');
  
	 
//	const DownloadYTFile = require('yt-dl-playlist')
 
	const downloader = new DownloadYTFile({ 
	  outputPath: ".",
	  ffmpegPath: __dirname + '/ffmpeg.exe',
	  maxParallelDownload: 10,
	  fileNameGenerator: (videoTitle) => {
		return 'a-new-file-name.mp3'
	  }
	})
	 
	downloader.on('video-info', (fileInfo, video) => {
	  console.log({ fileInfo, video })
	})
	downloader.on('video-setting', (fileInfo, settings) => {
	  console.log({ fileInfo, settings })
	})
	downloader.on('start', (fileInfo) => console.log(fileInfo))
	downloader.on('progress', (fileInfo) => console.log(fileInfo))
	downloader.on('complete', (fileInfo) => {
		res.redirect('/downloading')
	})
	downloader.on('error', (fileInfo) => console.log(fileInfo.error))
	 
	downloader.download(req.body.mp3, inputFileName = null)
});

app.get('/downloading', (req, res) => {
	res.sendFile(__dirname + '/downloadpage.html')
})

app.get('/downloadfile', (req, res) => {
	res.download(__dirname + '/a-new-file-name.mp3')
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/main.html')
})

app.listen(port)