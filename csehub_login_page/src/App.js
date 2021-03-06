import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import workspace from './component/addWorkspace.js';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import '../node_modules/firebaseui/dist/firebaseui.css';
//import Form from './components/Form.js'


export const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : null
        };
        var config = {
            apiKey: "AIzaSyAw8bha316J7zLwz-JN2GaUp3w8RioRxP0",
            authDomain: "csehub-420.firebaseapp.com",
            databaseURL: "https://csehub-420.firebaseio.com",
            projectId: "csehub-420",
            storageBucket: "csehub-420.appspot.com",
            messagingSenderId: "719021972711"
        };
        firebase.initializeApp(config);

        var uiConfig = {
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                //firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
      componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
                var exists=true;
                //console.log(firebase.database().ref("users/"+user.uid));

                const usersRef = firebase.database().ref("users");
                usersRef.child(user.uid).on('value',(snapshot)=>{
                    //console.log(snapshot.val());
                    //console.log(user);
                    //this.writeUserData(user);
                   if(snapshot.val()==null){
                       this.writeUserData(user);
                   }
                   //console.log(exists)
                });
                var dummy = {
                    name : "CSE110",
                    position: 1,
                    widgets: ""
                };
                //workspace.addworkspace(dummy);
            }

        });
    }

    writeUserData(user){
        const itemsRef= firebase.database().ref("users/"+user.uid);
        const item = {
            username: user.displayName,
            email: user.email
        }
        itemsRef.set(item);
    }

    loginSucessful(){
        //var loginOrNot="";
        // var laji="nimabi";
        //var user = firebase.auth().currentUser;
        //console.log(user.displayName);
        /*await firebase.auth().onAuthStateChanged(function(user) {
            //console.log(user.displayName);
            if(user!=null){
                console.log(user.displayName);
                //laji="caonima";
                //console.log(laji);
                var loginOrNot="firebaseui-auth-container";
                return loginOrNot;
            }else{
                return "";
            }
        });*/
        //console.log(laji);
/*
        if (user) {
            //console.log(user.displayName);
            //loginOrNot="";
        } else {
            loginOrNot="firebaseui-auth-container";
        }
     */
        //console.log(loginOrNot);
        //return loginOrNot;
    }

    loginCallback(loginOrNot){
        return loginOrNot;
    }
    logout = () =>{
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    login = () =>{
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }


    render(){
        return (
            <dev>
            <dev>{this.state.user ?
                <dev id="">{this.state.user.displayName}</dev>
                :
                <dev id="firebaseui-auth-container"></dev>
            }</dev>
                <dev>
            {this.state.user ?
                <button onClick={this.logout}>Logout</button>
                :
                <button onClick={this.login}>Log In</button>
            }
                </dev>
            </dev>
        );
  }
}

export default App;
