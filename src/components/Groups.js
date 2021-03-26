import React, {useState, userEffect} from 'react';

const groups = [];

const Groups =  () => {

    return(
        <div className="Groups">
            <select class="w-full border bg-white rounded px-3 py-2 outline-none" id="select_lingkungan">
                <option class="py-1" value="3">Lingkungan - Santa Agatha</option>
                <option class="py-1" value="4">Lingkungan - Santo Bartholomeus</option>
                <option class="py-1" value="5">Lingkungan - Santo Yohanes Pembabtis</option>
                <option class="py-1" value="6">Lingkungan - Santo Dominikus</option>
                <option class="py-1" value="8">Lingkungan - Santo Petrus</option>
                <option class="py-1" value="21">Lingkungan - Santo Antonius</option>
                <option class="py-1" value="22">Lingkungan - Santa Fraustina</option>
                <option class="py-1" value="23">Lingkungan - Santa Yohanes XXIII</option>
            </select>
        
        </div>
    )
    
}
    
export default Groups
    
