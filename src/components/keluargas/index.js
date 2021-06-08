import React, { useState, useEffect, useCallback, useMemo, Fragment } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import DataTable from 'react-data-table-component';
import PageTitle from "../common/PageTitle";
import Select from "../partials/select";
import {
    Col,
    Row,
    Container,
    Card,
    CardHeader,
    CardBody,
    Button,
    FormInput
} from "shards-react";


class Index extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            keluargas: [],
            keluarga: null,
            katedrals: [],
            katedral: null,
            parokis: [],
            paroki: null,
            lingkungans: [],
            lingkungan: null,
            kbgs: [],
            kbg: null,
            filter_search: null,
            filter_kbgs: null,
            search_query: null,
            columns: [
                {
                    name: 'Nama',
                    selector: 'nama',
                    sortable: true,
                },
                {
                    name: 'Panggilan',
                    selector: 'panggilan',
                    sortable: true,
                    right: true,
                },
                {
                    name: 'Alamat',
                    selector: 'alamat',
                    sortable: true,
                    right: true,
                },
                {
                    name: 'Telepon',
                    selector: 'telepon',
                    sortable: true,
                    right: true,
                },
                {
                    key: "action",
                    text: "Action",
                    className: "action",
                    width: 100,
                    align: "left",
                    sortable: false,
                    cell: record => { 
                        return (
                            <Fragment>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.showRecord(record)}
                                >
                                    {/* <i className="fa fa-edit"></i>  */}
                                    Detail
                                </button>
                                {/* <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => this.deleteRecord(record)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button> */}
                            </Fragment>
                        );
                    }
                }
            ]
        }
    }


    showRecord(record) {
        console.log("Edit Record", record);
        window.location.href = "/admin/keluarga/show/"+record.id;
    }


    componentDidMount(){
        console.log('Component /keluargas/index.js | Function componentDidMount');

        this.getKatedrals();
        this.getKeluargas();
        
    }

    getGroupsDescendants(id){
        console.log('Component /keluargas/index.js | Function getGroupsDescendants');
    
        return new Promise((resolve, reject) => {
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('http://localhost:1337/groups?ancestors.id='+id, config)
            .then(res => {
                // console.log(res.data);
                // let queries = '';
                // res.data.forEach(data => {
                //     queries += "group.id="+data.id+"&";
                // });
                // this.setState({
                //     filter_kbgs: queries,
                // });
                resolve (res.data);
            })
            .catch(err => {
                reject(err);
            });
        })
        
    }

    getKeluargas(search_query){
        // let query="?";

        // if(this.state.filter_search != null){
        //     query += 'nama_contains='+this.state.filter_search+'&';
        // }

        // if(this.state.kbg != 0 && this.state.kbg != null){
        //     console.log('Filter Berdasarkan KBG '+this.state.kbg);
        //     query += 'group.id='+this.state.kbg+'&';

        // }else{
        //     if(this.state.lingkungan != 0 && this.state.lingkungan != null){
        //         console.log('Filter Berdasarkan Lingkungan '+this.state.lingkungan);
        //         this.setState({
        //             id : this.state.id
        //         });
        //         this.getGroupsDescendants(this.state.lingkungan);
        //         query += this.state.filter_kbgs;
        //         this.setState({
        //             id : this.state.id
        //         });
        //     }else{
        //         if(this.state.paroki != 0 && this.state.paroki != null){
        //             console.log('Filter Berdasarkan Paroki '+this.state.paroki);
        //             this.getGroupsDescendants(this.state.paroki);
        //             query += this.state.filter_kbgs;
        //         }else{
        //             if(this.state.katedral != 0 && this.state.katedral != null){
        //                 console.log('Filter Berdasarkan Katedral '+this.state.katedral);
        //                 this.getGroupsDescendants(this.state.katedral);
        //                 query += this.state.filter_kbgs;
        //             }else{
        //                 console.log('Tampilkan Semua Lingkungan');
                        
        //             }
        //         }   
        //     }
        // }
        // console.log(query);

        let query = '';
        if(this.state.search_query != null){
            query = this.state.search_query;
        }

        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };
        axios.get('keluargas', config)
        .then(res => {
            this.setState({
                keluargas: res.data,
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    getKatedrals(){
        console.log('Component /keluargas/index.js | Function getKatedral');
        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };

        axios.get('groups?group_category=1', config)
        .then(res => {
            let kats = [
                {
                    value: 0,
                    text: 'Silahkan Pilih'
                }
            ]
            for(let i=0; i<res.data.length;i++){
                let kat = {
                    value: res.data[i].id,
                    text: res.data[i].name,
                }
                kats.push(kat);
            }
            this.setState({
                katedrals: kats
            });

            
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    handleInputKatedralChanged(event) {
        console.log('Component /keluargas/index.js | Function handleInputKatedralChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);

        if(event.target.value != 0){
            this.setState({
                katedral: event.target.value
            });
            this.getParokis(event.target.value);
        }

        if(event.target.value == 0){
            this.setState({
                katedral : 0,
                parokis : [],
                paroki : 0,
                lingkungans : [],
                lingkungan : 0,
                kbgs : [],
                kbg : 0,
            });
        }
    }

    getParokis(id){
        console.log('Component /keluargas/index.js | Function getParokis');

        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };

        axios.get('groups?parent.id='+id, config)
        .then(res => {
            console.log(res.data);

            let parokis = [
                {
                    value: 0,
                    text: 'Silahkan Pilih'
                }
            ]
            for(let i=0; i<res.data.length;i++){
                let paroki = {
                    value: res.data[i].id,
                    text: res.data[i].name,
                }
                parokis.push(paroki);
            }
            this.setState({
                parokis: parokis
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    handleInputParokiChanged(event) {
        console.log('Component /keluargas/index.js | Function handleInputParokiChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);


        if(event.target.value != 0){
            this.setState({
                paroki: event.target.value
            });
            this.getLingkungan(event.target.value);
        }

        if(event.target.value == 0){
            this.setState({
                paroki : 0,
                lingkungans : [],
                lingkungan : 0,
                kbgs : [],
                kbg : 0,
            });
        }
    }

    getLingkungan(id){
        console.log('Component /keluargas/index.js | Function getLingkungan');

        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };

        axios.get('groups?parent.id='+id, config)
        .then(res => {
            console.log(res.data);

            let lingkungans = [
                {
                    value: 0,
                    text: 'Silahkan Pilih'
                }
            ]
            for(let i=0; i<res.data.length;i++){
                let lingkungan = {
                    value: res.data[i].id,
                    text: res.data[i].name,
                }
                lingkungans.push(lingkungan);
            }
            this.setState({
                lingkungans: lingkungans
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    handleInputLingkunganChanged(event) {
        console.log('Component /keluargas/index.js | Function handleInputLingkunganChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);


        if(event.target.value != 0){
            this.setState({
                lingkungan: event.target.value
            });
            this.getKbg(event.target.value);
        }

        if(event.target.value == 0){
            this.setState({
                lingkungan : 0,
                kbgs : [],
                kbg : 0,
            });
        }
    }

    getKbg(id){
        console.log('Component /keluargas/index.js | Function getKbg');

        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };

        axios.get('groups?parent.id='+id, config)
        .then(res => {
            console.log(res.data);

            let kbgs = [
                {
                    value: 0,
                    text: 'Silahkan Pilih'
                }
            ]
            for(let i=0; i<res.data.length;i++){
                let kbg = {
                    value: res.data[i].id,
                    text: res.data[i].name,
                }
                kbgs.push(kbg);
            }
            this.setState({
                kbgs: kbgs
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }
    
    handleInputKbgChanged(event) {
        console.log('Component /keluargas/index.js | Function handleInputKbgChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);
        this.setState({
            kbg: event.target.value
        });
    }

    tambahKeluarga() {
        window.location.href = "/admin/keluarga/tambah-keluarga";
    }

    handleFilter(){
        console.log('Component /keluargas/index.js | Function handleFilter');
        console.log(this.state);
        let query="";
        let filter_group_id = null;

        if(this.state.filter_search != null){
            query += 'nama_contains='+this.state.filter_search+'&';
        }

        if(this.state.kbg != 0 && this.state.kbg != null){
            console.log('Filter Berdasarkan KBG '+this.state.kbg);
            filter_group_id = this.state.kbg;
            query += 'group.id='+this.state.kbg+'&';
        }else{
            if(this.state.lingkungan != 0 && this.state.lingkungan != null){
                console.log('Filter Berdasarkan Lingkungan '+this.state.lingkungan);
                filter_group_id = this.state.lingkungan;
                this.setState({
                    id : this.state.id
                });
            }else{
                if(this.state.paroki != 0 && this.state.paroki != null){
                    console.log('Filter Berdasarkan Paroki '+this.state.paroki);
                    filter_group_id = this.state.paroki;
                }else{
                    if(this.state.katedral != 0 && this.state.katedral != null){
                        console.log('Filter Berdasarkan Katedral '+this.state.katedral);
                        filter_group_id = this.state.katedral;
                    }else{
                        console.log('Tanpa Filter Group');
                        filter_group_id = '';
                    }
                }   
            }
        }
        this.getGroupsDescendants(filter_group_id).then((res)=>{
            console.log('ini hasil groupdesc');
            console.log(res);
            res.forEach(data => {
                if(data.id){
                    query += 'group.id='+data.id+'&';
                }
            });
            
            if(query != ""){
                query = '?'+query;
            }
            console.log('Ini Query Nyaa');
            console.log(query);
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('keluargas'+query, config)
            .then(res => {
                this.setState({
                    keluargas: res.data,
                });
            })
            .catch(err => {
                console.error('There was an error!', err);
            });


        }).catch((err)=>{
            console.log(err);
        });
        
    }

    handleInputChanged(event) {
        console.log('Component /keluargas/index.js | Function handleInputChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        console.log('Component /keluargas/index.js | Function render');
        
        
        return(
            
            <Container fluid className="main-content-container px-4 pb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="1" title="Keluarga" subtitle="Data Keluarga" className="text-sm-left" />
                    
                </Row>
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader>
                                
                                <Row form>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feFilterKatedral"><b>Katedral</b></label>
                                        <Select id="feFilterKatedral" 
                                            data={this.state.katedrals}   
                                            name="filter_katedral"
                                            
                                            onChange={this.handleInputKatedralChanged.bind(this)}
                                        />
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feFilterKatedral"><b>Paroki</b></label>
                                        <Select id="filter_paroki" 
                                            data={this.state.parokis}   
                                            name="filter_paroki"
                                            onChange={this.handleInputParokiChanged.bind(this)}  
                                        />
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feFilterKatedral"><b>Lingkungan</b></label>
                                        <Select id="filter_lingkungan" 
                                            data={this.state.lingkungans}   
                                            name="filter_lingkungan"
                                            onChange={this.handleInputLingkunganChanged.bind(this)}
                                        />
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="feFilterKatedral"><b>KBG</b></label>
                                        <Select id="filter_kbg" 
                                            data={this.state.kbgs}   
                                            name="filter_kbg"
                                            onChange={this.handleInputKbgChanged.bind(this)}
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md="12" className="form-group">
                                        <label htmlFor="feFilterSearch"><b>Search</b></label>
                                        <FormInput
                                            id="feFilterSearch"
                                            placeholder="Search"
                                            name="filter_search"
                                            onChange={this.handleInputChanged.bind(this)}
                                        />
                                    </Col>
                                    
                                </Row>
                                <Button onClick={this.tambahKeluarga} className=""><i className="fa fa-plus"></i> Add</Button>&nbsp;
                                <Button outline onClick={this.handleFilter.bind(this)} className="">Filter</Button>
                            </CardHeader>
                            <CardBody className="p-0 pb-3 px-3 py-3">
                                
                                <DataTable
                                    columns={this.state.columns}
                                    data={this.state.keluargas}
                                    pagination
                                    sortIcon
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                
            </Container>
        );
    }

    
}

export default Index;
