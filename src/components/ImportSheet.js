import React from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ImportSheet =  () => {

    const readExcel = (file, lingkungan_id) => {
        const promise = new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e)=>{
                const bufferArray = e.target.result;

                const workBook = XLSX.read(bufferArray, {type:'buffer'});
                const workBook2 = XLSX.read(bufferArray, {type:'buffer'});
                const workSheetName = workBook.SheetNames[1];
                const workSheetName2 = workBook2.SheetNames[2];
                const workSheet = workBook.Sheets[workSheetName];
                const workSheet2 = workBook.Sheets[workSheetName2];

                const kk_datas = XLSX.utils.sheet_to_json(workSheet);
                const anggota_datas = XLSX.utils.sheet_to_json(workSheet2);
                const datas = Array;
                datas['kk'] = kk_datas;
                datas['anggota'] = anggota_datas;
                resolve(datas);
            }
                
        });

        const url = 'http://localhost:1337/';
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"+(currentdate.getMonth()+1) 
        + "/" + currentdate.getFullYear() + " @ " 
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        const log_data = {
            file_name: datetime
        }
        
        promise.then((datas)=>{

            axios.post(url+"import-logs", log_data).then(import_log_response => {
                var import_log_id = import_log_response.data.id 
                // datas['kk'].forEach(data => {
                //     console.log(data['Nama KK']+" | "+data['KBG']);
                //     axios.get(url+'groups?on_sheet_id='+data['KBG']+'&parent.id='+lingkungan_id).then(kbg_resp => {
                //         // Post KK
                        
                //         var kbg_id = kbg_resp.data[0].id;
                //         var currentdate = new Date();

                //         var kbg_code = data['KBG'].split("-")[1].toString();
                //         var new_kbg_code;
                //         if(kbg_code.length == 1){
                //             new_kbg_code = "00"+kbg_code;
                //         }else if(kbg_code.length == 2){
                //             new_kbg_code = "0"+kbg_code;
                //         }else if(kbg_code.length == 3){
                //             new_kbg_code = kbg_code;
                //         }

                //         const restructure_data = {
                //             on_sheet_no_kk: String(data['No KK']),
                //             nama: data['Nama KK'],
                //             nama_panggilan: data['Nama Panggilan'],
                //             alamat_1: data['Alamat1'],
                //             alamat_2: data['Alamat2'],
                //             kode_pos: data['Kode Pos'],
                //             telepon: data['Telp Rumah'],
                //             group: kbg_id,
                //             import_log: import_log_id,
                //             published_at: currentdate,
                //             uid: kbg_resp.data[0].parent.uid+"-"+new_kbg_code+"-"+data['No KK']
                //         }
                //         // console.log(restructure_data);

                //         axios.post(url+"keluargas", restructure_data)
                //         .then(keluargas_resp => {
                //             console.log(keluargas_resp);
                //         })
                //         .catch(function (error) {
                //             if (error.response) {
                //                 // Request made and server responded
                //                 console.log(error.response.data);
                //                 console.log(error.response.status);
                //                 console.log(error.response.headers);
                //             } else if (error.request) {
                //               // The request was made but no response was received
                //                 console.log(error.request);
                //             } else {
                //               // Something happened in setting up the request that triggered an Error
                //                 console.log('Error', error.message);
                //             }
                //         });
                //         // End Post KK

                //     });
                // });

                // Post Anggota
                // datas['anggota'].forEach(dataanggota => {
                //     // console.log(dataanggota['No KK']);
                //     // Get KK
                //     axios.get(url+"keluargas?on_sheet_no_kk="+dataanggota['No KK']+'&group.parent='+lingkungan_id).then(kk_response => {
                        
                //         if(kk_response.data[0].id !== undefined){
                //             console.log(kk_response.data[0].id)

                //             var currentdate = new Date();
                //             const restructure_data_anggota = {
                //                 family:kk_response.data[0].id,
                //                 nama:dataanggota['Nama Warga'],
                //                 nama_panggilan:dataanggota['Panggilan'],
                //                 relasi_family:dataanggota['Relasi KK'],
                //                 relasi_family:dataanggota['Relasi KK'],
                //                 gender:((dataanggota['Jenis Kelamin'] == "Laki-laki") ? "M" : "F"),
                //                 import_log: import_log_id,
                //                 // published_at: null,
                //                 uid: kk_response.data[0].uid+"-"+dataanggota['No Warga'],
                //             }
                //             // Post Anggota KK 
                //             axios.post(url+"family-members", restructure_data_anggota)
                //             .then(keluargas_resp => {
                //                 console.log(keluargas_resp);
                //             })
                //             .catch(function (error) {
                //                 if (error.response) {
                //                     // Request made and server responded
                //                     console.log(error.response.data);
                //                     console.log(error.response.status);
                //                     console.log(error.response.headers);
                //                 } else if (error.request) {
                //                   // The request was made but no response was received
                //                     console.log(error.request);
                //                 } else {
                //                   // Something happened in setting up the request that triggered an Error
                //                     console.log('Error', error.message);
                //                 }
                //             });
                //         }
                        
                //     });
                    
                // });
                // End Post Anggota
                
                
            })

            
            
        })
        
    }

    return(
        <div class="flex w-full h-screen items-center justify-center bg-grey-lighter">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type='file' class="hidden" onChange={(e)=>{
                    const file = e.target.files[0];
                    const lingkungan_id = document.getElementById('select_lingkungan').value;
                    readExcel(file, lingkungan_id);
                }} />
            </label>
        </div>
    )
    
}
    
export default ImportSheet
    
