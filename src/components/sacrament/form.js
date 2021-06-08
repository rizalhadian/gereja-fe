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
    DatePicker,
    Date
} from "shards-react";




class Show extends React.Component {
    constructor(props) {
        super(props);
        // Bind Functions
        this.updateRecord = this.updateRecord.bind(this);
        
        this.state = {
            data: [],
            id: null,
            family_id: null,
            family: {},
            anggota_keluarga: [],
            record: {},
            group: {},
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

        // let last_uid = this.state.last_uid;
        // let last_uid_split = last_uid.split('-');
        // console.log(last_uid_split);
        // let last_number_uid = parseInt(last_uid_split[last_uid_split.length - 1]);
        // last_uid_split[last_uid_split.length - 1] = last_number_uid+1;



        let data = this.state.anggota_keluarga;
        data.family = this.state.family_id;
        // data.uid = last_uid_split.join('-');

        const headers = { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem('jwt')
        };

        let data_obj = Object.assign({}, data);

        axios.post('/family-members/', data_obj, {headers})
        .then(response => {
            alert("Tambah Anggota Berhasil");
        })
        .catch(error => {
            alert("Tambah Anggota Gagal !, "+error);
        });
    }

    getLastUID(uid){
        // const headers = { 
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer '+localStorage.getItem('jwt')
        // };

        // axios.get('/family-members?uid_contains='+uid+'&_sort=uid:DESC', {headers})
        // .then(response => {
        //     this.setState({
        //         last_uid : response.data[0].uid
        //     });
        // })
        // .catch(error => {
        //     alert("Tambah Anggota Gagal !, "+error);
        // });
    }



    componentDidMount() {        
        this.setState({
            id : this.props.id
        })
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

    getKeluarga(id){
        console.log('Component /Keluargas/form.js | Function getKeluarga');
        const config = {
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('jwt')
            }
        };
        axios.get('keluargas?id='+id, config)
        .then(res => {
            // Setiap SetState Akan Menjalankan Ulang Fungsi Render
            console.log(res);
            this.setState({
                id: id,
                keluarga: res.data[0],
                group: res.data[0].group
            });

            this.getLastUID(res.data[0].uid);
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
        console.log(event);

        let data = this.state.data;

        data.[event.target.name] = event.target.value;
        this.setState({
            data : data,
        });
    }

    handleDateChange(event) {
        let data = this.state.data;

        data['date'] = event;
        this.setState({
            data : data,
        });
        // console.log(event);
    }


    render() {
        console.log('Component /anggota-keluargas/form.js | Function render');
        console.log(this.state);
        let anggota_keluarga = [];
        
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

        let sakramen_list = [
            {
                value: "",
                text: "-"
            },
            {
                value: "Baptis",
                text: "Baptis"
            },
            {
                value: "Ekaristi",
                text: "Ekaristi"
            },
            {
                value: "Krisma",
                text: "Krisma"
            },
            {
                value: "Perkawinan",
                text: "Perkawinan"
            },
            {
                value: "Imamat",
                text: "Imamat"
            },
            {
                value: "Pengakuan_Dosa",
                text: "Pengakuan Dosa"
            },
            {
                value: "Pengurapan_Sakit",
                text: "Pengurapan Sakit"
            },
        ];

        
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Keluarga" subtitle="Anggota Keluarga" className="text-sm-left" />
                </Row>
                <Row>
                {/* Editor */}
                    <Col lg="12" md="12">
                        <Card small className="mb-4 "> 
                            <Form id="formAnggotaKeluarga" >
                            <CardHeader className="border-bottom">
                                <h6 className="">Sakramen&nbsp;
                                
                                </h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3" >
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                    <Col>
                                        <Row   Row form>
                                            {/* Last Name */}
                                            <Col md="12" className="form-group">
                                            <label htmlFor="feNama">Jenis Sakramen</label>
                                            <Select id="feStatus_keluarga" 
                                                data={sakramen_list} 
                                    
                                                name="sacrament"
                                                onChange={this.handleInputChanged.bind(this)}
                                            />
                                            
                                            </Col>
                                        </Row>
                                        <Row   Row form>
                                            {/* Last Name */}
                                            <Col md="12" className="form-group">
                                                <label htmlFor="feNama">Date</label>
                                            </Col>
                                            <Col md="12" className="form-group">
                                            <DatePicker
                                            name="datestart"
                                            onChange={this.handleDateChange.bind(this)}
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
