// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.8.0;
pragma abicoder v2;

contract distibution {
    mapping(uint => _Vaccine) public Vaccine;
struct _Vaccine{
    string name;
    uint count;
    uint VaccineID; 
    uint min;
    uint max;
    bool life;
    uint[] TempData ;
}
  _Vaccine v1;

function intialise() public{
uint[] memory arr=new uint[](0);
v1=_Vaccine("AstraZeneca/Oxford COVID-19 vaccine",0,1,2,8,true,arr);
Vaccine[1]=v1;
}  

function takevalue(uint ID, uint temp ) public{
  //   if(Vaccine[ID].life==false)
  //   revert();
     (Vaccine[ID].TempData).push(temp);
     Vaccine[ID].count+=1;
     bool state;
     if(temp>Vaccine[ID].max || temp<Vaccine[ID].min){
       state=false;
     }
     else state=true;   
     Vaccine[ID].life=Vaccine[ID].life&&state;  
  }
  
function getTemp(uint ID) public view returns (uint[] memory){
    return Vaccine[ID].TempData;
}  

}
