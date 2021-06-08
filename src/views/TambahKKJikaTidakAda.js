import React from "react";
import axios from "axios";
import { Container, Col } from "shards-react";
import { withRouter } from "react-router";
import Index from "../components/keluargas/index";
import Show from "../components/keluargas/show";
import Form from "../components/anggota-keluarga/form";

class TambahKKJikaTidakAda extends React.Component {

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
                this.cekFamilyHasKK(family.family_members).then((hasKK)=>{
                    if(hasKK == 1){
                        console.log('Punya KK');
                        this.ubahStatusIsSudahCekKK(family);
                    }else{
                        console.log('Tidak Punya KK');
                        console.log();
                        
                        this.tambahDataKK(family)
                        .then((response)=>{
                            this.ubahStatusIsSudahCekKK(family);
                        });
                    }
                });
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
            axios.get('keluargas?is_sudah_cek_kk_null=1', config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });
        }) 
    }

    cekFamilyHasKK(family_members){
        return new Promise((resolve, reject)=>{
            let has_kk = 0;
            family_members.map((family_member, i) => {     
                
                if(family_member.relasi_family == "KK"){
                    has_kk = 1;
                }
            })
            resolve(has_kk);
        }) 
    }
    
    tambahDataKK(family){
        return new Promise((resolve, reject)=>{
            const headers = { 
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            };
    
            let data_obj = {
                nama: family.nama,
                uid: null,
                nama_panggilan: family.nama_panggilan,
                gender: null,
                marital_status: null,
                relasi_family: "KK",
                golongan_darah: null,
                agama: null,
                dob: null,
                phone: family.telepon,
                email: null,
                family: family.id,
            };
            console.log(data_obj);
            axios.post('/family-members/', data_obj, {headers})
            .then(response => {
                console.log("Tambah Anggota Berhasil");
            })
            .catch(error => {
                alert("Tambah Anggota Gagal !, "+error);
            });
        })
    }

    ubahStatusIsSudahCekKK(keluarga){
        const headers = { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
        };

        let data = keluarga;
        data.is_sudah_cek_kk = 1;
        axios.put('/keluargas/'+keluarga.id, data, {headers})
        .then(response => {
            console.log("Update Berhasil");
        })
        .catch(error => {
            alert("Update Gagal !, "+error);
        });
    }


    

    render(){
        return(
            <h1>TambahKKJikaTidakAda</h1>
        );
    }
    
}

export default withRouter(TambahKKJikaTidakAda);
