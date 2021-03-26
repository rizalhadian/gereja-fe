import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import './index.css';
import ImportSheet from './components/ImportSheet'
import Groups from './components/Groups'

const mockgroups = [
  {
      "id": 1,
      "name": "Keuskupan Bali NTB",
      "address": "Jl. Tukad Musi No.1, Panjer, Kec. Denpasar Sel., Kota Denpasar, Bali 80234",
      "email": null,
      "group_category": {
          "id": 1,
          "name": "Katedral",
          "description": null,
          "published_at": "2021-02-23T08:10:06.476Z",
          "created_at": "2021-02-23T08:09:55.681Z",
          "updated_at": "2021-02-23T08:10:06.494Z"
      },
      "parent": null,
      "on_sheet_name": null,
      "on_sheet_id": null,
      "import_log": null,
      "published_at": "2021-02-23T08:22:49.176Z",
      "created_at": "2021-02-23T08:14:27.551Z",
      "updated_at": "2021-02-23T08:43:01.460Z"
  },
];

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="App">
      <div class="container mx-auto">
      
      <Groups />
      
      <ImportSheet />
      </div>
    </div>
  );
}

export default App;
