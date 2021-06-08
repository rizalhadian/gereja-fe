import React from "react";
import axios from "axios";
import { Container, Col } from "shards-react";
import { withRouter } from "react-router";
import Index from "../components/anggota-keluarga/index";
import Show from "../components/anggota-keluarga/show";
import FormSacrament from "../components/sacrament/form";

class AnggotaKeluarga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            page: null,
            data_keluargas: null
        }
    }

    componentDidMount() {
        let url = window.location.href;
        let url_splitted =  url.split('/admin/anggota-keluarga/');

        if(url_splitted[1] != null){
            let params = url_splitted[1].split('/');
            
            if(params[0] == 'show'){
                this.setState({
                    id: params[1],
                    page: <Show id={params[1]}/>
                });
            }else if(params[0] == 'edit-group'){

            }else if(params[0] == 'add-anggota'){

            }else if(params[0] == 'add-sacrament'){
                this.setState({
                    id: params[1],
                    page: <FormSacrament id={params[1]}/>
                });
            }
            
            
        }else{
            this.setState({
                id: this.props.match.params.param_2,
                page: <Index/>
            });
        }

    }

    

    render(){
        return(
            <Container fluid className="main-content-container px-4 pb-4">
                <Col lg="12">
                    {this.state.page}
                </Col>
            </Container>
        );
    }
    
}

export default withRouter(AnggotaKeluarga);
