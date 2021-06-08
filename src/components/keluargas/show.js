import React, {Fragment} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import PageTitle from "../common/PageTitle";
import {
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Container,
    Row,
    ListGroup,
    ListGroupItem,
    Button,
} from "shards-react";




class Show extends React.Component {
    constructor(props) {
        super(props);
        // Bind Functions
        this.addRecord = this.addRecord.bind(this);
        this.changeGroup = this.changeGroup.bind(this);
        
        this.state = {
            id: null,
            anggota_keluarga: [],
            group: {},
            columns: [
                
                {
                    name: 'Status',
                    selector: 'status_keluarga.name',
                    sortable: true,
                },
                {
                    name: 'Nama',
                    selector: 'nama',
                    sortable: true,
                },
                {
                    name: 'Nama Panggilan',
                    selector: 'nama_panggilan',
                    sortable: true,
                },
                {
                    name: 'Gender',
                    selector: 'gender',
                    sortable: true,
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
                                    className="ml-auto btn btn-outline-accent btn-sm"
                                    onClick={() => this.showRecord(record)}
                                >
                                    Detail
                                </button>
                            </Fragment>
                        );
                    }
                }
            ]
        }

        
        
    }

    showRecord(record){
        window.location.href = "/admin/anggota-keluarga/show/"+record.id;
    }

    addRecord(){
        window.location.href = "/admin/keluarga/tambah-anggota/"+this.state.id;
    }

    changeGroup(){
        window.location.href = "/admin/keluarga/edit-group/"+this.state.id;
    }



    componentDidMount() {
        console.log('Component /Keluargas/show.js | Function componentDidMount');
        this.getKeluarga(this.props.id)
        .then(keluarga => {
            this.getGroup(keluarga[0].group.id)
            .then(group => {
                

                this.getAnggotaKeluarga(this.props.id).then(anggota_keluarga=>{
                    console.log(anggota_keluarga);
                    console.log(keluarga[0].family_members);
                    this.setState({
                        id: this.props.id,
                        anggota_keluarga: anggota_keluarga,
                        group: group[0]
                    });
                    console.log(group[0].ancestors);
                })
            })
        });
    }

    getKeluarga(id){
        console.log('Component /Keluargas/show.js | Function getKeluarga');
        return new Promise((resolve, reject)=>{
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('keluargas?id='+id, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });
        })
    }

    getAnggotaKeluarga(id){
        console.log('Component /Keluargas/show.js | Function getAnggotaKeluarga');
        return new Promise((resolve, reject)=>{
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('family-members?family.id='+id, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });
        })
    }

    getGroup(id){
        console.log('Component /Keluargas/show.js | Function getGroups.');
        return new Promise((resolve, reject)=>{
            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.get('groups?id='+id, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });
        })
    }

    handleClick(id){
        console.log("edit "+id);
    }   


    render() {
        console.log('Component /Keluargas/show.js | Function render');
        let anggota_keluarga = [];
        if(this.state.anggota_keluarga != null && Array.isArray(this.state.anggota_keluarga)){
            anggota_keluarga = this.state.anggota_keluarga;
        }

        let group_ancestors = [];
        if(this.state.group.ancestors != null){
            this.state.group.ancestors.map((group, i) => {     
                if(group.group_category == 1){
                    group.type_name = "Katedral"
                }else if(group.group_category == 2){
                    group.type_name = "Paroki"
                }else if(group.group_category == 3){
                    group.type_name = "Lingkungan"
                }else if(group.group_category == 4){
                    group.type_name = "KBG"
                }else {
                    group.type_name = "Other"
                }
                
            })
            group_ancestors = this.state.group.ancestors;

        }
        
        
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Keluarga" subtitle="Data Keluarga" className="text-sm-left" />
                </Row>
                <Row>
                {/* Editor */}
                    <Col lg="9" md="12">
                        <Card small className="mb-4 overflow-hidden">
                            <CardHeader className="border-bottom">
                                <h6 className="">Data Keluarga&nbsp;
                                <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.addRecord}>
                                    <i className="fa fa-plus"></i> Tambah Anggota
                                </Button>
                                </h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                            <DataTable
                                    columns={this.state.columns}
                                    data={anggota_keluarga}
                                    // pagination
                                    // sortIcon
                                />
                                {/* <table className="table">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col" className="border-0">
                                                Status
                                            </th>
                                            <th scope="col" className="border-0">
                                                Nama Panggilan
                                            </th>
                                            <th scope="col" className="border-0">
                                                Nama Lengkap
                                            </th>
                                            <th scope="col" className="border-0">
                                                Agama
                                            </th>
                                            <th scope="col" className="border-0">
                                                Pendidikan
                                            </th>
                                            <th scope="col" className="border-0">
                                                Pekerjaan
                                            </th>
                                            <th scope="col" className="border-0">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {anggota_keluarga.map(function(keluarga, i){
                                            return (
                                                <tr className="">
                                                    <td>{keluarga.relasi_family}</td>
                                                    <td>{keluarga.nama_panggilan}</td>
                                                    <td>{keluarga.nama}</td>
                                                    <td>{keluarga.agama}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Button theme="accent" size="sm" className="ml-auto" >
                                                            <i className="fa fa-edit"></i> Ubah
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                                
                                        })}
                                        
                                    </tbody>
                                </table> */}
                            </CardBody>
                            <CardFooter>
                                
                            </CardFooter>
                        </Card>
                    </Col>

                    {/* Sidebar Widgets */}
                    <Col lg="3" md="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Group</h6>
                                
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <ListGroup flush>
                                    <ListGroupItem className="p-3">
                                    {
                                    group_ancestors.map((group, i) => {     
                                        console.log("Entered");                 
                                        // Return the element. Also pass key     
                                        return (
                                            <span className="d-flex mb-2">
                                            <i className="material-icons mr-1">flag</i>
                                            <strong className="mr-1">{ group.type_name } : </strong>
                                            <strong >{ group.name }</strong>
                                            </span>
                                        ) 
                                    })
                                    }
                                    <span className="d-flex">
                                    <i className="material-icons mr-1">flag</i>
                                        <strong className="mr-1">KBG : {(this.state.group.hasOwnProperty('name')) ? this.state.group.name : ''}</strong>
                                        
                                    </span>
                                    </ListGroupItem>
                                    
                                </ListGroup>
                            </CardBody>
                            <CardFooter>
                                {/* <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.changeGroup}>
                                    <i className="fa fa-edit"></i> Ubah
                                </Button> */}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                
            </Container>

            
        )
    }
}

export default Show;
