import React, { Component } from 'react';
import { from } from 'rxjs';
import { map, switchMap, last } from 'rxjs/operators';
import { readFile} from '../services'
import { objectsArraysFromTextLinesArray, setUbigeo } from "../utils";

export default class Home extends Component {
    
    constructor(){
        super();
        this.state = {
            departaments:null,
            provinces:null,
            districts:null,
            currentUbigeoSelected: {
                departament:'',
                province:'',
                district:''
            }
        }
    }
    componentDidMount() {
        // Promise returns array of text file lines.
        let readFilePromise = readFile('files/ubigeo.txt')
            .then(data=>data.split('\n'))
            .catch(err=>console.error("[ERROR - ReadFile Service]:",err));

        // Create Observable from Promise
        from(readFilePromise)
        .pipe(
            switchMap(originalLinesArray=>objectsArraysFromTextLinesArray(originalLinesArray)),
            map(objectsArray=>setUbigeo(objectsArray)), // Map objectsArray. Ex: [{code: '01', name: 'Lima'},null, null] and push data in structures
            last(),
        )
        .subscribe((ubigeoInfoArray)=>{
            this.setState( {
                ...this.state,
                departaments: ubigeoInfoArray[0],
                provinces: ubigeoInfoArray[1],
                districts: ubigeoInfoArray[2],
            })
            console.table(this.state.departaments);
            console.table(this.state.provinces);
            console.table(this.state.districts);
        })
    }
    
    generateSelectOptionsFromObject = (object,parentKey='')=> {
        if(object)
            return Object.keys(object)
                .map(key=>{
                    if(object[key].parentCode === parentKey) 
                        return <option value={key} key={key}>{object[key].name}</option>
                    else 
                        return null;
                });
        else 
            return null;
    }

    handleChange = (value,childName='',event) => {
        let selectedValue = event.target.value;
        let {currentUbigeoSelected} = this.state;

        let newUbigeoUpdated = {};

        newUbigeoUpdated[value] = selectedValue;

        if(childName) newUbigeoUpdated[childName] = '';

        this.setState({
            ...this.state,
            currentUbigeoSelected:{
                ...currentUbigeoSelected,
                ...newUbigeoUpdated,
            }
        })
    }

    render() {
        const {departaments,provinces,districts, currentUbigeoSelected} = this.state;
        return (
            <div className="ubigeo-container">
                <h2>ReactTest</h2>
                <h3>Ubigeo</h3>
                <select value={currentUbigeoSelected.departament} onChange={this.handleChange.bind(this,'departament','province')}>
                    <option value="" >- Departamento -</option>
                    { departaments?
                        this.generateSelectOptionsFromObject(departaments):
                        null
                    }
                </select>
                <select value={currentUbigeoSelected.province} onChange={this.handleChange.bind(this,'province','district')}>
                    <option value="" >- Provincia -</option>
                    { provinces?
                        this.generateSelectOptionsFromObject(provinces,currentUbigeoSelected.departament):
                        null
                    }
                </select>
                <select value={currentUbigeoSelected.district} onChange={this.handleChange.bind(this,'district','')}>
                    <option value="" >- Distrito -</option>
                    { districts?
                        this.generateSelectOptionsFromObject(districts,currentUbigeoSelected.province):
                        null
                    }
                </select>
                <br/>
                <small>*Inspect page and refresh to see data in console</small>
            </div>
        )
    }
}
