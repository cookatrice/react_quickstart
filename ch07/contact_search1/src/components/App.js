import React, { Component } from 'react';
import axios from 'axios';

import InputName from './InputName';
import ContactList from './ContactList';
import Loading from './Loading';
import { Portal } from 'react-portal';

//const BASEURL = "http://localhost:3001";
const BASEURL = "http://sample.bmaster.kro.kr";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            contacts : [], isLoading: false, name:''
        };
        this.searchContact = this.searchContact.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    changeName(name){
        this.setState({ name: name })
    }

    searchContact() {
        let { name } = this.state;
        if (name.length >= 2) {
            this.setState({ isLoading: true })
            
            axios.get(BASEURL + '/contacts_long/search/' + name)
            .then((response)=> {
                this.setState({ contacts : response.data });
                this.setState({ isLoading: false })
            })
            .catch((error)=> {
                console.log("### error : ", error)
                this.setState({ isLoading: false })
            })
        } else {
            this.setState({ contacts : [] })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="well">
                    <div className="col-xs-1"></div>
                    <div className="title col-xs-10">:: 연락처 앱</div>
                    <div className="col-xs-1"></div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel panel-default panel-borderless">
                    <div className="panel-body">
                        <InputName searchContact={this.searchContact} name={this.state.name}
                            changeName={this.changeName}/>
                    </div>
                </div>
                <ContactList contacts={this.state.contacts} 
                    deleteContact={this.deleteContact} />
                <Portal node={document && document.getElementById('modal-area')}>
                    <Loading isLoading={this.state.isLoading}>
                        <div className="well title">
                            <h4>데이터 조회중</h4>
                        </div>
                    </Loading>    
                </Portal>
            </div>
        );
    }
}

export default App;