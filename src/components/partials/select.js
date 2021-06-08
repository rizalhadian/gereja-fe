import React, { useState, useEffect, useCallback, useMemo, Fragment } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import DataTable from 'react-data-table-component';
import PageTitle from "../common/PageTitle";
import {
    FormSelect
} from "shards-react";


class Select extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            value: this.props.value,
            id: this.props.id,
            name: this.props.name,
            onChange: this.props.onChange,
            disabled: true
        }
    }

    componentDidMount(){
        // console.log('Component /partials/select.js | Function componentDidMount');
    }

    componentWillReceiveProps(newProps){
        this.setState({
            comments: newProps.comments,
            data: newProps.data,
            value: newProps.value,
            id: newProps.id,
            name: newProps.name,
            onChange: newProps.onChange,
        })
    }

    render(){
        // console.log('Component /partials/select.js | Function render');

        // Add Selected
        for(let i=0; i<this.state.data.length; i++){
            (this.state.data[i].value == this.props.value) ? this.state.data[i].selected = true : this.state.data[i].selected = false;
        }

        // Add Disabled
        let disabled = (this.state.data[0] != null) ? false:true;
        return(
            <FormSelect id={this.state.id} name={this.state.name} onChange={this.state.onChange} disabled={disabled}>
                {
                    this.props.data.map((obj)=>{
                        return (<option value={obj.value} selected={obj.selected}>{obj.text}</option>);
                    })
                }
            </FormSelect>
        );
    }
}

export default Select;
