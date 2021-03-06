import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Rank from './components/Rank/Rank';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOptions = {
  particles : {
    number: {
      value: 100,
      density : {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
 apiKey: '1b73b024714f4f2c8c154be318c9a58a'
});

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      input : '',
      imageUrl : '',
      box: {},
      route:'signin',
      isSignedIn: false,
      user: {
        name:'',
        email:'',
        entires:0,
        id:''
      }
    }
  }

  calculateFaceLocation = (response) => {
    const allFace = (response.outputs[0].data.regions).map(region=>region.region_info.bounding_box);
    const image = document.getElementById('faceimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return allFace.map(face=> {
      return {
        leftCol : face.left_col * width,
        topRow : face.top_row * height,
        rightCol : width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }})
  }

  drawBox = (face) => { this.setState({box: face}); }

  onInputChange = event => { this.setState( {input : event.target.value} ); }

  onImageSubmit = () => {
    this.setState({imageUrl : this.state.input});

    app.models.predict("a403429f2ddf4b49b307e318f00e528b", 
      this.state.input)
    .then(response => 
      {
        this.drawBox(this.calculateFaceLocation(response));

        fetch('/image',{
          method:'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
                    id: this.state.user.id
                  })
        })  
        .then(resp => resp.json())
        .then(entryCount => {
          this.setState(Object.assign(this.state.user, { 
                            entries:entryCount 
                          }))
        })
        .catch(error => console.log("Error while updating entry count",error));

      })
    .catch(error => console.log("Errored out", error));

  }

  onRouteChange = (name) => {
    if(name === 'home'){
      this.setState( {isSignedIn : true });
    } else{
      this.setState( {isSignedIn : false});  
    }
    this.setState({route : name});
  }

  loadUser = (user) => {
    console.log("Loading user",user);
    this.setState(user);
    console.log(this.state);
  }

  render() {    
    const  {box, imageUrl, user} = this.state;


    return (
    <div className="App">
        <Particles className="particles" params={particleOptions}/>
        <Navigation isSignedIn={ this.state.isSignedIn } onRouteChange={this.onRouteChange}/>
        {
          this.state.route === 'home'
          ?  <React.Fragment>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
              <FaceRecognition box={imageUrl?box:""} imageUrl={imageUrl}/>
            </React.Fragment>  
          :(this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>)
                 
      }
    </div>
  ); 
  }
}

export default App;
