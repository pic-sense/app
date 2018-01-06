import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: '',
      imageTags: [],
      imageText: [],
      voice: {}
    }
  };


  // moving the canvas position when clicked
  toggleCanvasPosition = () => {
    let canvasCont = document.getElementById('canvas_container'),
    snapButton = document.getElementById('button');

    canvasCont.classList.toggle('snapped');
    snapButton.classList.toggle('snapped');
  };

  snapPhoto = (width, height) => {
    let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('video'),
        imageWidth,
        imageHeight;

    if (width <= 850) {
      imageWidth = width;
      imageHeight = height;
    } else {
      imageWidth = width / 2;
      imageHeight = height / 1.45;
    };

    context.drawImage(video, 0, 0, imageWidth, imageHeight);
    this.toggleCanvasPosition();
    // this.convertCanvasToImage(canvas);
  };

  removePhoto = () => {
    this.toggleCanvasPosition();
    this.setState({
      imageTags: [],
      imageText: []
    })
  };

  componentDidMount() {
    let video = document.getElementById('video'),
        canvas = document.getElementById('canvas');

    // getting device camera access
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        });
    };

    // for mobile use
    if(window.innerWidth <= 850) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      video.width = window.innerWidth;
      video.height = window.innerHeight;
    } else {
      video.width = window.innerWidth / 2;
      video.height = 480;
      canvas.width = video.width;
      canvas.height = video.height;
    };

    // triggering the getVoice function upon the component loading
    // this.getVoices();
  };


  render() {
    return (
      <div className="App">

        <video id="video" width='' height='' autoPlay></video>

        <div id="canvas_container">
          <canvas id="canvas" width='' height=''></canvas>
          <div id="canvasButtons">
            <button id="delete" onClick={() => this.removePhoto()}>
            <i className="material-icons">delete</i>
            </button>
            <button id="submit" onClick={() => this.submitPhoto()}>
              <i className="material-icons">send</i>
            </button>
          </div>


        </div>

        <div id="button">
          <button id="snap" onClick={() => this.snapPhoto(window.innerWidth, window.innerHeight)}>
            <i className="material-icons">photo_camera</i>
          </button>
        </div>

      </div>
    );
  }
}

export default App;
