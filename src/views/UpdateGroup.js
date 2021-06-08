import React from "react";
import axios from "axios";
import { Container, Col } from "shards-react";
import { withRouter } from "react-router";
import Index from "../components/keluargas/index";
import Show from "../components/keluargas/show";
import Form from "../components/anggota-keluarga/form";
import { ThemeConsumer } from "styled-components";

class UpdateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
        }
    }

    componentDidMount() {
        this.getFamilies().then( (families) =>{
            console.log(families);
            
            
            
            families.map((family, i)=>{
                
                // console.log(family);
                this.updateGroup(family);
            })
        });
    }

    getFamilies(){
        return new Promise((resolve, reject)=>{
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('family-members?is_status_keluarga_update_null=1', config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });
        }) 
    }

    updateGroup(keluarga){
        const headers = { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
        };

        let status_keluarga;
        if(keluarga.relasi_family == "KK"){
            status_keluarga = 1;
        }else if(keluarga.relasi_family == "Istri"){
            status_keluarga = 2;
        }else if(keluarga.relasi_family == "Anak"){
            status_keluarga = 3;
        }else{
            status_keluarga = 4
        }
        let data = keluarga;
        data.is_status_keluarga_update = 1;
        data.status_keluarga = status_keluarga;
        console.log(data);

        axios.put('/family-members/'+keluarga.id, data, {headers})
        .then(response => {
            console.log("Update Berhasil");
        })
        .catch(error => {
            alert("Update Gagal !, "+error);
        });
    }

    countDigit(number){
        let string_number = number.toString();
        let number_arr = string_number.split();
        return number_arr.length;
    }
    
    


    

    render(){
        return(
            <h1>UpdateGroup</h1>
        );
    }
    
}

export default withRouter(UpdateGroup);
