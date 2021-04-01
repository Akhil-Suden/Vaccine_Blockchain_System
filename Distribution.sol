// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
/*contract actorregisteration(){
  address _vaccineissuer;
  mapping (address => bool) _doctor;
//  mapping (address => bool) _medicalUnitAdmins
  mapping (address => bool) _beneficiary
//  MAP (bytes beneficiaryHash, address beneficiary) _registeredRequests
}*/

contract distibution {
    uint temperature;
    mapping(uint => _Vaccine) public Vaccine;

struct _Vaccine{
    uint VaccineID; 
    uint min;
    uint max;
    bool life;
}

_Vaccine v1=_Vaccine(1,2,8,true);

function takevalue(uint ID, uint temp ) public{
     Vaccine[1]=v1;
     if(temp>Vaccine[ID].max || temp<Vaccine[ID].min){
       Vaccine[ID].life=false;
     }
     else  Vaccine[ID].life=true;
  }


}
