import React, {Fragment} from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import PageTitle from "../common/PageTitle";
import Select from "../partials/select";
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
    Form,
    FormInput,
    FormSelect,
    FormGroup,
    FormTextarea,
} from "shards-react";




class Show extends React.Component {
    constructor(props) {
        super(props);
        // Bind Functions
        this.updateRecord = this.updateRecord.bind(this);
        
        this.state = {
            id: null,
            anggota_keluarga: {
                'status_keluarga': {
                    id: null
                },
                'status_pendidikan': {
                    id: null
                },
            },
            group: {},
            status_keluarga: [],
            columns: [
                
                {
                    name: 'Status',
                    selector: 'relasi_family',
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


    updateRecord(){
        console.log('Component /anggota-keluargas/show.js | Function updateRecord');
        console.log(this.state.anggota_keluarga);

        let data = this.state.anggota_keluarga;

        const headers = { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
        };

        axios.put('/family-members/'+this.state.id, data, {headers})
        .then(response => {
            alert("Update Berhasil");
        })
        .catch(error => {
            alert("Update Gagal !, "+error);
        });
    }



    componentDidMount() {
        console.log('Component /anggota-keluargas/show.js | Function componentDidMount');
        this.getAnggotaKeluarga(this.props.id);
        this.getStatusDalamKeluarga();
        this.getPendidikanTerakhir();
    }

    getStatusDalamKeluarga(){
        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };
        axios.get('status-keluargas?', config)
        .then(res => {
            this.setState({
                status_keluarga: res.data,
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    getPendidikanTerakhir(){
        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };
        axios.get('status-pendidikans?', config)
        .then(res => {
            this.setState({
                status_pendidikan: res.data,
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    getAnggotaKeluarga(id){
        console.log('Component /anggota-keluargas/show.js | Function getAnggotaKeluarga');
        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };
        axios.get('family-members?id='+id, config)
        .then(res => {
            // Setiap SetState Akan Menjalankan Ulang Fungsi Render
            console.log(res);
            this.setState({
                id: id,
                anggota_keluarga: res.data[0],
            });
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
    }

    handleClick(id){
        console.log("edit "+id);
    }   

    handleInputChanged(event) {
        console.log('Component /anggota-keluargas/show.js | Function handleInputChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);

        let anggota_keluarga = this.state.anggota_keluarga;

        anggota_keluarga[event.target.name] = event.target.value;
        this.setState({
            anggota_keluarga : anggota_keluarga,
        });

        
    }

    goToSakramenPage() {
        // console.log(this.state);
        window.location.href = "/admin/anggota-keluarga/add-sacrament/"+this.state.anggota_keluarga.id;
    }

    render() {
        console.log('Component /anggota-keluargas/show.js | Function render');
        console.log(this.state.anggota_keluarga.status_keluarga);
        let anggota_keluarga = [];
        
        if(this.state.anggota_keluarga != null){
            anggota_keluarga = this.state.anggota_keluarga;
            
            if (anggota_keluarga.status_pendidikan == null) {
                anggota_keluarga.status_pendidikan = {id:''}
            }
            console.log(anggota_keluarga.status_keluarga);
        }

        


        let data_pendidikan_terakhir = [
            {
                value: "0",
                text: "-"
            },
        ];
        let data_status_keluarga = [];
        if(this.state.status_pendidikan != null && Array.isArray(this.state.status_pendidikan)){
            this.state.status_pendidikan.map((status)=>{
                
                let new_status = {
                    value: status.id,
                    text: status.name
                };
                data_pendidikan_terakhir.push(new_status);
            })
        }
        if(this.state.status_keluarga != null && Array.isArray(this.state.status_keluarga)){
            this.state.status_keluarga.map((status)=>{
                console.log(status);
                let new_status = {
                    value: status.id,
                    text: status.name
                };
                data_status_keluarga.push(new_status);
            })
        }

        let data_gender = [
            {
                value: "",
                text: "-"
            },
            {
                value: "M",
                text: "Pria"
            },
            {
                value: "F",
                text: "Wanita"
            },
        ]

        let data_marital_status = [
            {
                value: "",
                text: "-"
            },
            {
                value: "lajang",
                text: "Lajang"
            },
            {
                value: "menikah",
                text: "Menikah"
            },
            {
                value: "cerai",
                text: "Cerai"
            },
        ]
        
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Keluarga" subtitle="Anggota Keluarga" className="text-sm-left" />
                </Row>
                <Row>
                {/* Editor */}
                    <Col lg="12" md="12">
                        <Card small className="mb-4 overflow-hidden">
                            <Form id="formAnggotaKeluarga" >
                            <CardHeader className="border-bottom">
                                <h6 className="">Data Anggota Keluarga&nbsp;
                                
                                </h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                    <Col>
                                        <Row   Row form>
                                            {/* Last Name */}
                                            <Col md="12" className="form-group">
                                            <label htmlFor="feNama">UID</label>
                                            <FormInput
                                                id="feNama"
                                                placeholder="Nama"
                                                value={this.state.anggota_keluarga.uid}
                                                name="uid"
                                                disabled="true"
                                            />
                                            </Col>
                                        </Row>
                                        <Row   Row form>
                                            {/* Last Name */}
                                            <Col md="12" className="form-group">
                                            <label htmlFor="feNama">Nama</label>
                                            <FormInput
                                                id="feNama"
                                                placeholder="Nama"
                                                value={this.state.anggota_keluarga.nama}
                                                name="nama"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                        </Row>
                                        <Row form>
                                            {/* First Name */}
                                            <Col md="12" className="form-group">
                                            <label htmlFor="fePanggilan">Panggilan</label>
                                            <FormInput
                                                id="fePanggilan"
                                                placeholder="Panggilan"
                                                name="nama_panggilan"
                                                value={this.state.anggota_keluarga.nama_panggilan}
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                        </Row>
                                        
                                        <Row form>
                                            <Col md="4" className="form-group">
                                            <label htmlFor="feMaritalStatus">Status Pernikahan</label>
                                            <Select id="feMaritalStatus" 
                                                data={data_marital_status} 
                                                value={this.state.anggota_keluarga.marital_status}
                                                name="marital_status"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            
                                            </Col>
                                            {/* Email */}
                                            <Col md="4" className="form-group">
                                            <label htmlFor="feRelasiFamily">Status Dalam Keluarga</label>
                                            {/* <FormInput
                                                id="feRelasiFamily"
                                                placeholder="Status Dalam Keluarga "
                                                value={this.state.anggota_keluarga.relasi_family}
                                                name="relasi_family"
                                                onChange={this.handleInputChanged.bind(this)}    
                                            /> */}

                                            <Select id="feStatus_keluarga" 
                                                data={data_status_keluarga} 
                                                value={this.state.anggota_keluarga.status_keluarga['id']}
                                                name="status_keluarga"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                            {/* Password */}
                                            <Col md="4" className="form-group">
                                            <label htmlFor="feGender">Gender</label>
                                            <Select id="feGender" 
                                                data={data_gender} 
                                                value={this.state.anggota_keluarga.gender}
                                                name="gender"
                                                onChange={this.handleInputChanged.bind(this)}
                                                />
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md="4" className="form-group">
                                            <label htmlFor="feGolonganDarah">Golongan Darah</label>
                                            <FormInput
                                                id="feGolonganDarah"
                                                placeholder="Golongan Darah "
                                                value={this.state.anggota_keluarga.golongan_darah}
                                                name="golongan_darah"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                            {/* Email */}
                                            <Col md="4" className="form-group">
                                            <label htmlFor="feAgama">Agama</label>
                                            <FormInput
                                                id="ferAgama"
                                                placeholder="Agama"
                                                value={this.state.anggota_keluarga.agama}
                                                name="agama"
                                                onChange={this.handleInputChanged.bind(this)}                                             
                                            />
                                            </Col>
                                            {/* Password */}
                                            <Col md="4" className="form-group">
                                            <label htmlFor="fePendidikan">Pendidikan Terakhir</label>
                                            {/* <FormInput
                                                id="fePendidikan"
                                                placeholder="Pendidikan Terakhir"
                                                name="pendidikan"
                                                value={this.state.anggota_keluarga.pendidikan}
                                                onChange={this.handleInputChanged.bind(this)}
                                            /> */}
                                            <Select id="fePendidikan" 
                                                data={data_pendidikan_terakhir} 
                                                value={anggota_keluarga.status_pendidikan.id}
                                                name="status_pendidikan"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                        </Row>

                                        <Row form>
                                            {/* Email */}
                                            <Col md="6" className="form-group">
                                            <label htmlFor="fePhone">Phone</label>
                                            <FormInput
                                                id="fePhone"
                                                placeholder="Phone"
                                                value={this.state.anggota_keluarga.phone}
                                                name="phone"

                                                onChange={this.handleInputChanged.bind(this)}
                                                
                                            />
                                            </Col>
                                            {/* Password */}
                                            <Col md="6" className="form-group">
                                            <label htmlFor="feEmail">Email</label>
                                            <FormInput
                                                id="feEmail"
                                                placeholder="Email"
                                                value={this.state.anggota_keluarga.email}
                                                name="email"

                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            </Col>
                                        </Row>
                                        
                                        
                                        
                                    </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                            </CardBody>
                            <CardFooter>
                                <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.updateRecord}>
                                    <i className="fa fa-edit"></i> Ubah
                                </Button>
                            </CardFooter>
                            </Form>
                        </Card>
                    </Col>

                    {/* Sidebar Widgets */}
                    <Col lg="12" md="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Sakramen&nbsp;&nbsp;
                                    <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.goToSakramenPage.bind(this)}>
                                        <i className="fa fa-plus"></i> Tambah Sakramen
                                    </Button>
                                </h6>
                                
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                
                            </CardBody>
                            <CardFooter>
                                
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                
            </Container>

            
        )
    }
}

export default Show;
