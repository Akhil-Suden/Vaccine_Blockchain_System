pragma solidity >=0.4.22 <0.8.0;

contract Vaccine {
   event initialised (bytes32 Name);
   event recorded (uint BatchNo , uint temp);
   event registered (bytes32 name_ , uint min_ , uint max_);

   mapping(uint => _VaccineType) public VaccineType;
   struct _VaccineType{
      bytes32 name;
      uint VaccineID;   // each VaccineID corresponds to a different Vaccine's name
      uint min;
      uint max;
      uint QtyOrd;
    }

    mapping(uint => _Vaccine) public Vaccine;
    struct _Vaccine{
       uint VaccineID;
       uint BatchNo;
       uint count;      // no of times temp was recorded
       bool life;
       uint[] TempData;
    }
    uint public i=0;   //Total registered vaccines
    uint j=0;   //Total Qty Ordered, helps in giving different BatchID

/*function initialise() public{
_VaccineType memory v1;
v1=_VaccineType("AstraZeneca/Oxford COVID-19 vaccine",1,2,8,0);
VaccineType[++i]=v1;
emit initialised(v1.name);
}*/

function RegisterVaccine(bytes32 name_ , uint min_ , uint max_ ) public{
      _VaccineType memory v;
      v=_VaccineType(name_,i,min_,max_,0);
      VaccineType[++i]=v;
      emit registered(name_ , min_ , max_);
   }

function order(uint ID ,uint qty) public{
for(uint i=0;i<qty;i++){
 uint[] memory arr=new uint[](0);
 Vaccine[i+j+1]=_Vaccine(ID,j+i+1 ,0,true,arr);
}
VaccineType[ID].QtyOrd+=qty;
j+=qty;
}

function takevalue(uint BatchNo , uint temp ) public{
//   if(Vaccine[ID].life==false)
//   revert();
     (Vaccine[BatchNo].TempData).push(temp);
     Vaccine[BatchNo].count+=1;
     bool state;
     if(temp>VaccineType[Vaccine[BatchNo].VaccineID].max || temp<VaccineType[Vaccine[BatchNo].VaccineID].min){
       state=false;
     }
     else state=true;
     Vaccine[BatchNo].life=Vaccine[BatchNo].life&&state;

     emit recorded(BatchNo, temp);
  }

function getTemp(uint ID) public view returns (uint[] memory ){
    return Vaccine[ID].TempData;
  }


}
