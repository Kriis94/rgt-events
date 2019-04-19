import React, {Component} from 'react';
import {storage} from '../firebase';
import firebase from 'firebase';
const uuid = require('uuid');

class EventsCreation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: uuid.v1(),
      EventName: '',
      EventTime: '',
      Price: '',
      Genre: '',
      Venue: '',
      TicketUrl: '',
      image: null,
      url: '',
      progress: 0
    };
    this.submitData = this.submitData.bind(this);
    this.inputData = this.inputData.bind(this);
  //  this.handleChange = this.handleChange.bind(this);
  //  this.handleUpload = this.ImageUpload.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js";
    script.async = true;

document.body.appendChild(script);
    firebase.database().ref(`Events/${this.state.uid}`).on('value', snap => console.log('from db', snap.val()));
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  ImageUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
           // error function ....
        console.log(error);
      },
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
  }

  submitData(event) {
    event.preventDefault();
    firebase
      .database()
      .ref(`Events/${this.state.uid}`)
      .set({
        EventName: this.state.EventName,
        EventTime: this.state.EventTime,
        Price: this.state.Price,
        Venue: this.state.Venue,
        TicketUrl: this.state.TicketUrl,
        Genre: this.state.Genre,
      }).catch(error => console.log(error));

  }

  inputData(event) {
    const EventName = this.refs.eventname.value;
    const EventTime = this.refs.eventtime.value;
    const Price = this.refs.price.value;
    const Venue = this.refs.venue.value;
    const Genre = this.refs.genre.value;
    const TicketUrl = this.refs.ticketurl.value;
    this.setState({ EventName, EventTime, Price, Venue, Genre, TicketUrl });
  }



  render() {


    return (

  <div w-type="event-discovery" w-tmapikey="AFJVWgT007j0mIcrYqG7BczmtUroEAuq" w-googleapikey="AIzaSyABMQTnoYvhnKI8EtY3M06sULZoP9AEW2Q" w-keyword="the georgian theatre stockton on tees" w-theme="simple" w-colorscheme="light"
  w-width="100%" w-height="550" w-size="5" w-border="0" w-borderradius="0" w-postalcode="" w-radius="25" w-city="" w-period="month" w-layout="fullwidth" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="custom" w-titlelink="off" w-sorting="groupByName" w-id="id_ygmn8o"
  w-countrycode="GB" w-source="ticketweb" w-latlong="">

  <form onSubmit={this.submitData}>
  <center>
    <p>Event Name: </p> <input type="text" onChange={this.inputData} ref="eventname" /><br/>
    <p>Event Time: </p><input type="datetime-local" onChange={this.inputData} ref="eventtime" /><br/>
    <p>Event Price: </p> <input type="text" onChange={this.inputData} ref="price" /><br/>
    <p>Event Venue: </p> <input type="text" onChange={this.inputData} ref="venue" /><br/>
    <p>Event Genre: </p> <input type="text" onChange={this.inputData} ref="genre" /><br/>
    <p>Ticket url: </p> <input type="text" onChange={this.inputData} ref="ticketurl"/><br/>
    <input type="submit" /> </center>
  </form>
  </div>
    )
  }

}

export default EventsCreation;
