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
            family_id: null,
            family: {},
            anggota_keluarga: [],
            record: {},
            group: {},
            katedrals: [],
            katedral: null,
            parokis: [],
            paroki: null,
            lingkungans: [],
            lingkungan: null,
            kbgs: [],
            kbg: null,
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
                    text: 'Silahkan Pilih',
                }
            ]
            for(let i=0; i<res.data.length;i++){
                let kbg = {
                    value: res.data[i].id,
                    text: res.data[i].name,
                    uid: res.data[i].uid
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
        console.log(this.state.kbgs);
        this.setState({
            kbg: event.target.value
        });
    }


    updateRecord(){
        // console.log('Component /anggota-keluargas/show.js | Function updateRecord');
        // console.log(this.state.anggota_keluarga);

        // let data = this.state.anggota_keluarga;

        // const headers = { 
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer '+localStorage.getItem('jwt')
        // };

        // axios.put('/family-members/'+this.state.id, data, {headers})
        // .then(response => {
        //     alert("Update Berhasil");
        // })
        // .catch(error => {
        //     alert("Update Gagal !, "+error);
        // });
    }



    saveRecord(){
        console.log('Save Record');
        
        if (
            this.state.anggota_keluarga.nama != null &&
            this.state.anggota_keluarga.gender != null &&
            this.state.anggota_keluarga.status_keluarga != null &&
            this.state.anggota_keluarga.nama_panggilan != null &&
            this.state.kbg != null
        ) {
            
            let data = this.state.anggota_keluarga;
            data.group = this.state.kbg;
            console.log(data);
            const headers = { 
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            };

            let data_obj = Object.assign({}, data);

            this.saveKeluarga(data_obj).then(res => {
                console.log(res)
                
                let keluarga_id = res.id;
                data_obj.family = keluarga_id;
                this.saveAnggotaKeluarga(data_obj).then(res => {
                    if (res.id != null) {
                        window.location.href = "/admin/keluarga/show/"+keluarga_id;
                    }
                })
            })

        } else {
            alert("Lengkapi Data Terlebih Dahulu");
        }

        
    }

    saveKeluarga(data){
        return new Promise((resolve, reject)=>{

            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.post('keluargas?',data, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });

        })
    }

    saveAnggotaKeluarga(data){
        return new Promise((resolve, reject)=>{

            const config = {
                headers:{
                    Authorization: 'Bearer '+localStorage.getItem('jwt')
                }
            };
            axios.post('family-members?',data, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                console.error('There was an error!', err);
            });

        })
    }

    getLastUID(uid){
        const headers = { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
        };

        axios.get('/family-members?uid_contains='+uid+'&_sort=uid:DESC', {headers})
        .then(response => {
            this.setState({
                last_uid : response.data[0].uid
            });
        })
        .catch(error => {
            alert("Tambah Anggota Gagal !, "+error);
        });
    }



    componentDidMount() {
        // console.log('Component /anggota-keluargas/show.js | Function componentDidMount');
        this.getKatedrals();
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

    

    handleClick(id){
        // console.log("edit "+id);
    }
    
    toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            if (arr[i] !== undefined) rv[i] = arr[i];
        return rv;
    }   

    handleInputChanged(event) {
        console.log('Component /anggota-keluargas/form.js | Function handleInputChanged');
        console.log('event.target.name = '+event.target.name);
        console.log('event.target.value = '+event.target.value);

        let anggota_keluarga = this.state.anggota_keluarga;

        anggota_keluarga.[event.target.name] = event.target.value;
        this.setState({
            anggota_keluarga : anggota_keluarga,
        });
    }


    render() {
        console.log('Component /anggota-keluargas/form.js | Function render');
        console.log(this.state);
        let anggota_keluarga = [];
        if(this.state.anggota_keluarga != null && Array.isArray(this.state.anggota_keluarga)){
            anggota_keluarga = this.state.anggota_keluarga;
        }

        let data_gender = [
            {
                value: null,
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
                value: null,
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

        let data_pendidikan_terakhir = [
            {
                value: null,
                text: "-"
            },
        ];
        let data_status_keluarga = [{
                value: null,
                text: "-"
            }];
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
        
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Keluarga" subtitle="Anggota Keluarga" className="text-sm-left" />
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
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>

                <Row>
                {/* Editor */}


                    <Col lg="12" md="12">
                        <Card small className="mb-4 overflow-hidden">
                            <Form id="formAnggotaKeluarga" >
                            <CardHeader className="border-bottom">
                                <h6 className="">Data Kepala Keluarga&nbsp;
                                
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
                                            <Select id="feStatus_keluarga" 
                                                data={data_status_keluarga} 
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
                                            <label htmlFor="fePendidikan">Pendidikan</label>
                                            <Select id="fePendidikan" 
                                                data={data_pendidikan_terakhir} 
                                                
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
                                <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.saveRecord.bind(this)}>
                                    <i className="fa fa-save"></i> Simpan
                                </Button>
                            </CardFooter>
                            </Form>
                        </Card>
                    </Col>

                    {/* Sidebar Widgets */}
                    {/* <Col lg="12" md="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Sakramen&nbsp;&nbsp;
                                    <Button outline theme="accent" size="sm" className="ml-auto" onClick={this.addRecord}>
                                        <i className="fa fa-plus"></i> Tambah Sakramen
                                    </Button>
                                </h6>
                                
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                
                            </CardBody>
                            <CardFooter>
                                
                            </CardFooter>
                        </Card>
                    </Col> */}
                </Row>
                
            </Container>

            
        )
    }
}

export default Show;
